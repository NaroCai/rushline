import { ComponentClass } from 'react'
import classnames from 'classnames'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as actions from '../../actions/timeline'

import './index.scss'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  recorded: string[],
  contentMap: any,
}

type PageDispatchProps = {
  dispatchRecord: (payload: any) => void;
}

type PageOwnProps = {}

type PageState = {
  timeline: {[key: string]: any}
  showEditor: undefined | string;
  input: string;
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
  state: PageState;
}

@connect(state => state.timeline, actions)

class Index extends Component {

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
    config: Config = {
    navigationBarTitleText: 'Timeline'
  }

  constructor (props) {
    super(props);
    const { recorded, contentMap } = this.props;
    let timeline = {};
    for (let i = 5; i < 24; i++) {
      timeline[i] = recorded.includes(String(i)) ? contentMap[i] : 0;
    }
    this.state = {
      timeline: timeline,
      showEditor: undefined,
      input: '',
    };
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleInputChange = (e: any) => {
    this.setState({
      input: e.target.value,
    });
  }
  
  handleInputBlur = () => {
    const { showEditor, input } = this.state;
    this.props.dispatchRecord({time: showEditor, content: input});
    this.setState({
      input: '',
      showEditor: undefined,
    });
  }

  handleColumeClick = (index: string) => {
    this.setState({
      showEditor: index,
      input: this.props.contentMap[index] || '',
    })
  }

  render () {
    const { timeline, showEditor, input } = this.state;
    const { recorded, contentMap } = this.props;
    return (
      <View className='index'>
        <View className='titleBar'>
          <View className='at-icon at-icon-menu'></View>
          <View className='title'>
            <Text>2019-09-23</Text>
            <View className='at-icon at-icon-chevron-down title__filter'></View>
          </View>
        </View>
        <View className='content'>
            {
              Object.keys(timeline).map(i => {
                return(
                  <View key={i}
                    className={classnames('listItem', {
                      ['listItem--show']: showEditor === i,
                    })}
                    onClick={() => this.handleColumeClick(i)}
                  >
                    <Text className='listItem__time'>{Number(i) < 10 ? `0${i}:00` : `${i}:00`}</Text>
                    {
                      recorded.includes(i) && showEditor !== i && 
                        <View className='listItem__content'>
                          <Text>{contentMap[i]}</Text>
                        </View>
                        
                    }
                    <Input
                      className='listItem__input'
                      value={input}
                      placeholder='markdown supported'
                      onInput={this.handleInputChange}
                      onBlur={this.handleInputBlur}
                    />
                  </View>
                )
              })
            }
          </View>
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>
