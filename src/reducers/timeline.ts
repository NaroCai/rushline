import { RECORD } from '../constants/timeline'

interface TimelineState {
  showNight: boolean;
  recorded: string[];
  contentMap: any;
}

const INITIAL_STATE: TimelineState = {
  showNight: false,
  recorded: [],
  contentMap: {},
}

export default function timeline (state = INITIAL_STATE, action) {
  switch (action.type) {
    case RECORD:
      const { time, content } = action.payload;
      const contentMap = Object.assign(state.contentMap, {[time]: content});
      state.recorded.push(time);
      return {
        ...state,
        contentMap,
      }
     default:
       return state
  }
}
