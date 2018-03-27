import { createDeleter, createSetter } from 'utilities/stateHelper'

const createDelActionHandlers = delActionTypes => {
  return Object.keys(delActionTypes).reduce((delHandlersCreators, key) => {
    const { actionType } = delActionTypes[key]
    const path = key.split('.')
    const deleter = createDeleter(path)

    return {
      ...delHandlersCreators,
      [actionType]: state => {
        return deleter(state)
      },
    }
  }, {})
}

const createIndexDelActionHandlers = delActionTypes => {
  return Object.keys(delActionTypes).reduce((delHandlersCreators, key) => {
    const { actionType } = delActionTypes[key]
    const deleter = createDeleter([':index', key])

    return {
      ...delHandlersCreators,
      [actionType]: (state, payload) => {
        if (payload && payload.index !== undefined) {
          return deleter(state, { index: payload.index })
        }
        return state
      },
    }
  }, {})
}

const createIndexSetActionHandlers = setActionTypes => {
  return Object.keys(setActionTypes).reduce((setHandlersCreators, key) => {
    const { actionType } = setActionTypes[key]
    const setter = createSetter([':index', key])

    return {
      ...setHandlersCreators,
      [actionType]: (state, action) => {
        const { index, value } = action.payload || {}
        if (index !== undefined) {
          return setter(state, { index }, value)
        }
        return state
      },
    }
  }, {})
}

const createSetActionHandlers = setActionTypes => {
  return Object.keys(setActionTypes).reduce((setHandlersCreators, key) => {
    const { actionType } = setActionTypes[key]
    const path = key.split('.')
    const setter = createSetter(path)

    return {
      ...setHandlersCreators,
      [actionType]: (state, action) => {
        const { value } = action.payload
        return setter(state, value)
      },
    }
  }, {})
}

export default function createReducer({ keyMap, initialValues = {} }) {
  const delActionHandlers = createDelActionHandlers(keyMap.del)
  const indexDelActionHandlers = createIndexDelActionHandlers(keyMap.indexDel)
  const indexSetActionHandlers = createIndexSetActionHandlers(keyMap.indexSet)
  const setActionHandlers = createSetActionHandlers(keyMap.set)

  const actionHandlers = {
    ...delActionHandlers,
    ...indexDelActionHandlers,
    ...indexSetActionHandlers,
    ...setActionHandlers,
  }

  const getInitialValues = () => {
    return JSON.parse(JSON.stringify(initialValues))
  }

  return function reducer(state = getInitialValues(), action) {
    const { type } = action
    if (actionHandlers[type]) {
      return actionHandlers[type](state, action)
    }

    return state
  }
}
