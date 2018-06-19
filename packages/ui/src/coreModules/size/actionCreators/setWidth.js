import { SIZE_SET_WIDTH } from '../actionTypes'

export default function setWidth(width) {
  return {
    payload: width,
    type: SIZE_SET_WIDTH,
  }
}
