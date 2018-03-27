import {
  createActionType,
  getCleanKey,
  getParametersFromKey,
} from './utilities'

export const createSpecification = ({ actionPrefix, actionVerb, key }) => {
  const parameters = getParametersFromKey(key)
  const cleanKey = getCleanKey(key)
  return {
    actionType: createActionType({
      actionPrefix,
      actionVerb,
      key,
    }),

    cleanKey,
    key,
    parameters,
  }
}

export const createVerbKeySpecifications = ({
  actionPrefix,
  actionVerb,
  keys,
}) => {
  return keys.reduce((setActionTypes, key) => {
    const verb = createSpecification({
      actionPrefix,
      actionVerb,
      key,
    })
    return {
      ...setActionTypes,
      [key]: verb,
    }
  }, {})
}

export default function createKeySpecifications({ actionPrefix, keys }) {
  return {
    del: createVerbKeySpecifications({
      actionPrefix,
      actionVerb: 'DEL',
      keys,
    }),
    set: createVerbKeySpecifications({
      actionPrefix,
      actionVerb: 'SET',
      keys,
    }),
  }
}
