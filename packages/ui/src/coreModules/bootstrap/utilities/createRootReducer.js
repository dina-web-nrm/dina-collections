import { combineReducers } from 'redux'

export const extractReducers = moduleMap => {
  return Object.keys(moduleMap).reduce((reducers, key) => {
    const { reducer, name } = moduleMap[key]

    if (!reducer) {
      return reducers
    }

    return {
      ...reducers,
      [name]: reducer,
    }
  }, {})
}

export default function createRootReducer({ moduleMap }) {
  return combineReducers(extractReducers(moduleMap))
}
