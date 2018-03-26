export const createDelActionCreator = delKeySpecification => {
  const { actionType, parameters = [] } = delKeySpecification
  const expectedNumberOfArgs = parameters.length
  return function setActionCreator(...rawArgs) {
    const args = Array.from(rawArgs)
    const numberOfArgs = args.length
    if (numberOfArgs !== expectedNumberOfArgs) {
      throw new Error(
        `Unexpected number of arguments: ${numberOfArgs} for del ${
          delKeySpecification.key
        }. Expected (${parameters.join(', ')})`
      )
    }

    const populatedParameters = parameters.reduce(
      (obj, parameterKey, index) => {
        return {
          ...obj,
          [parameterKey]: args[index],
        }
      },
      {}
    )

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
  const expectedNumberOfArgs = parameters.length + 1
  return function setActionCreator(...rawArgs) {
    const args = Array.from(rawArgs)
    const numberOfArgs = args.length
    if (numberOfArgs !== expectedNumberOfArgs) {
      throw new Error(
        `Unexpected number of arguments: ${numberOfArgs} for set ${
          setKeySpecification.key
        } Expected (${parameters.join(', ')}, value)`
      )
    }

    const populatedParameters = parameters.reduce(
      (obj, parameterKey, index) => {
        return {
          ...obj,
          [parameterKey]: args[index],
        }
      },
      {}
    )

    const value = args[args.length - 1]

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
