export const createDelActionCreator = delKeySpecification => {
  const { actionType, parameters = [] } = delKeySpecification
  const hasParameters = !!parameters.length
  const expectedNumberOfArgs = hasParameters ? 1 : 0

  return function delActionCreator(...rawArgs) {
    const args = Array.from(rawArgs)
    const numberOfArgs = args.length
    if (numberOfArgs !== expectedNumberOfArgs) {
      throw new Error(
        `Unexpected number of arguments: ${numberOfArgs} for del ${
          delKeySpecification.key
        }. Expected to be called with: ${hasParameters ? '(params)' : '()'}`
      )
    }

    const [inputParams] = args

    if (hasParameters && typeof inputParams !== 'object') {
      throw new Error(
        `Unexpected type of params: ${typeof inputParams} for del ${
          delKeySpecification.key
        } Expected object with keys: ${parameters.join(', ')}`
      )
    }

    const populatedParameters = parameters.reduce((obj, parameterKey) => {
      return {
        ...obj,
        [parameterKey]: inputParams[parameterKey],
      }
    }, {})

    return {
      payload: {
        parameters: populatedParameters,
      },
      type: actionType,
    }
  }
}

const createDelActionCreators = delKeySpecifications => {
  return Object.keys(delKeySpecifications).reduce((delActionCreators, key) => {
    const actionCreator = createDelActionCreator(delKeySpecifications[key])
    return {
      ...delActionCreators,
      [key]: actionCreator,
    }
  }, {})
}

export const createSetActionCreator = setKeySpecification => {
  const { actionType, parameters = [] } = setKeySpecification
  const hasParameters = !!parameters.length
  const expectedNumberOfArgs = hasParameters ? 2 : 1

  return function setActionCreator(...rawArgs) {
    const args = Array.from(rawArgs)
    const numberOfArgs = args.length
    if (numberOfArgs !== expectedNumberOfArgs) {
      throw new Error(
        `Unexpected number of arguments: ${numberOfArgs} for set ${
          setKeySpecification.key
        }. Expected to be called with: ${
          hasParameters ? '(value, params)' : '(value)'
        }`
      )
    }

    const [value, inputParams] = args

    if (hasParameters && typeof inputParams !== 'object') {
      throw new Error(
        `Unexpected type of params: ${typeof inputParams} for set ${
          setKeySpecification.key
        } Expected object with keys: ${parameters.join(', ')}`
      )
    }

    const populatedParameters = hasParameters
      ? parameters.reduce((obj, parameterKey) => {
          return {
            ...obj,
            [parameterKey]: inputParams[parameterKey],
          }
        }, {})
      : {}

    return {
      payload: {
        parameters: populatedParameters,
        value,
      },
      type: actionType,
    }
  }
}

const createSetActionCreators = setKeySpecifications => {
  return Object.keys(setKeySpecifications).reduce((setActionCreators, key) => {
    const actionCreator = createSetActionCreator(setKeySpecifications[key])
    return {
      ...setActionCreators,
      [key]: actionCreator,
    }
  }, {})
}

export default function createActionCreators({ keySpecifications }) {
  return {
    del: createDelActionCreators(keySpecifications.del),
    set: createSetActionCreators(keySpecifications.set),
  }
}
