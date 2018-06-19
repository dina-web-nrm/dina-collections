import { SIZE_SET_HEIGHT } from '../actionTypes'

export default function setHeight(height) {
  return {
    payload: height,
    type: SIZE_SET_HEIGHT,
  }
}
