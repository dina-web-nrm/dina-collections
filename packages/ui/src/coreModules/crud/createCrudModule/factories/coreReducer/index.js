import Dependor from 'utilities/Dependor'
import { combineReducers } from 'redux'

export const dep = new Dependor({
  combineReducers,
})

export default function createCoreReducer({ resourceReducers }) {
  return dep.combineReducers(resourceReducers)
}
