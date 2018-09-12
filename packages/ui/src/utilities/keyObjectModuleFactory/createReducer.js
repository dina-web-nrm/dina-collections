import { createDeleter, createSetter } from 'utilities/stateHelper'

export const createDelActionHandler = delKeySpecification => {
  const { key } = delKeySpecification
  const path = key.split('.')
  const deleter = createDeleter(path)

  return function delActionHandler(state, action) {
    const { parameters = undefined } = action.payload || {}
    const newState = deleter(state, parameters)
    return newState === undefined ? {} : newState
  }
}

export const createDelActionHandlers = delKeySpecifications => {
  return Object.keys(delKeySpecifications).reduce(
    (delHandlersCreators, key) => {
      const delKeySpecification = delKeySpecifications[key]
      const delActionHandler = createDelActionHandler(delKeySpecification)
      const { actionType } = delKeySpecification
      return {
        ...delHandlersCreators,
        [actionType]: delActionHandler,
      }
    },
    {}
  )
}

export const createSetActionHandler = setKeySpecification => {
  const { key } = setKeySpecification
  const path = key.split('.')
  const setter = createSetter(path)

  return function setActionHandler(state, action) {
    const { value, parameters = undefined } = action.payload || {}
    return setter(state, parameters, value)
  }
}

export const createSetActionHandlers = setKeySpecifications => {
  return Object.keys(setKeySpecifications).reduce(
    (setHandlersCreators, key) => {
      const setKeySpecification = setKeySpecifications[key]
      const setActionHandler = createSetActionHandler(setKeySpecification)
      const { actionType } = setKeySpecification

      return {
        ...setHandlersCreators,
        [actionType]: setActionHandler,
      }
    },
    {}
  )
}

export default function createReducer({
  keySpecifications,
  initialValues = {},
}) {
  const delActionHandlers = createDelActionHandlers(keySpecifications.del)
  const setActionHandlers = createSetActionHandlers(keySpecifications.set)

  const actionHandlers = {
    ...delActionHandlers,
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
