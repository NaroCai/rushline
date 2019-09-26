import Taro, { Component } from "@tarojs/taro";
import { View, RichText, Checkbox } from '@tarojs/components'
import marked from 'marked';
import './index.scss'

type OwnProps = {
  content: string;
}

type OwnState = {
}

interface MarkdownContainer {
  props: OwnProps;
  state: OwnState;
}

class MarkdownContainer extends Component {

  handleCheckBoxClick = (e) => {
    e.stopPropagation();
  }

  generateView(content: string) {
    console.log('content', content);
    if (content.substr(0, 2) === '[]') {
      return <Checkbox value={content} onClick={this.handleCheckBoxClick}>{content.substr(2, content.length)}</Checkbox>
    }
    return <RichText nodes={marked(content)}></RichText>
  }
  render() {
    const { content } = this.props;
    const strArr = content.split('\n');
    return (
      <View className='container'>
        {strArr.map(str => this.generateView(str))}
      </View>
    )
  }
}

export default MarkdownContainer;