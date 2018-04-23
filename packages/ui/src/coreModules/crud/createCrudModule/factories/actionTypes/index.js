import createLog from 'utilities/log'
import Dependor from 'utilities/Dependor'
import { apiActionTypes } from '../../../constants'
import createActionType from './createActionType'

export const dep = new Dependor({
  createActionType,
})

const log = createLog('coreModules:crud:actionTypes')

export default function createActionTypes({ resourceSpecification = {} } = {}) {
  const { resource, operations } = resourceSpecification

  if (!(operations && operations.length)) {
    return {}
  }

  return operations.reduce((actionTypes, operation) => {
    const { type: operationType } = operation
    if (!operationType) {
      return actionTypes
    }

    const operationActionTypes = Object.keys(apiActionTypes)
      .sort()
      .reduce((obj, apiActionTypeKey) => {
        const apiActionType = apiActionTypes[apiActionTypeKey]
        return {
          ...obj,
          [apiActionType]: dep.createActionType({
            apiActionType,
            operationType,
            resource,
          }),
        }
      }, {})
    log.info(
      `Adding actionTypes for ${resource}.${operationType}: ${JSON.stringify(
        operationActionTypes
      )}`
    )

    return {
      ...actionTypes,
      [operationType]: operationActionTypes,
    }
  }, {})
}
