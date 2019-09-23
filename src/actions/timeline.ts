import {
  RECORD, CLEAR_RECORD,
} from '../constants/timeline'

export const dispatchRecord = payload => {
  return {
    type: RECORD,
    payload,
  }
}

export const dispatchClearRecord = payload => {
  return {
    type: CLEAR_RECORD,
    payload,
  }
}

// 异步的action
// export function asyncAdd () {
//   return dispatch => {
//     setTimeout(() => {
//       dispatch(add())
//     }, 2000)
//   }
// }
