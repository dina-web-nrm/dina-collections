import createLog from 'utilities/log'
import Dependor from 'utilities/Dependor'

import {
  API_ACTION_TYPE_SUCCESS,
  OPERATION_TYPE_CREATE,
  OPERATION_TYPE_GET_MANY,
  OPERATION_TYPE_GET_ONE,
  OPERATION_TYPE_QUERY,
  OPERATION_TYPE_UPDATE,
} from '../../../constants'

import updateStateWithOneFactory from './updateStateWithOneFactory'
import updateStateWithManyFactory from './updateStateWithManyFactory'

export const dep = new Dependor({
  updateStateWithManyFactory,
  updateStateWithOneFactory,
})

const log = createLog('coreModules:crud:actionHandlers')

export default function createActionHandlers({
  resourceActionTypes,
  resourceSpecification = {},
}) {
  const { resource, operations } = resourceSpecification

  if (!resource) {
    throw new Error('resource is required')
  }

  let includedActionHandles = {}
  if (resourceActionTypes && resourceActionTypes.setIncluded) {
    includedActionHandles = {
      [resourceActionTypes.setIncluded]: dep.updateStateWithManyFactory({
        resource,
        resourceActionTypes,
      }),
    }
  }

  if (!(operations && operations.length)) {
    return includedActionHandles
  }

  const operationsActionHandlers = operations.reduce(
    (actionHandlers, operation) => {
      const { type: operationType } = operation
      if (!operationType) {
        return actionHandlers
      }
      const actionType =
        resourceActionTypes &&
        resourceActionTypes[operationType] &&
        resourceActionTypes[operationType][API_ACTION_TYPE_SUCCESS]
      if (!actionType) {
        throw new Error(
          `actionType not found in resourceActionTypes for resource: ${
            resource
          } and operationType: ${operationType}`
        )
      }
      let actionHandler
      switch (operationType) {
        case OPERATION_TYPE_CREATE:
        case OPERATION_TYPE_GET_ONE:
        case OPERATION_TYPE_UPDATE: {
          actionHandler = dep.updateStateWithOneFactory({
            operationType,
            resource,
            resourceActionTypes,
          })
          break
        }
        case OPERATION_TYPE_GET_MANY: {
          actionHandler = dep.updateStateWithManyFactory({
            operationType,
            resource,
            resourceActionTypes,
          })
          break
        }
        case OPERATION_TYPE_QUERY: {
          break
        }
        default: {
          throw new Error(`Unknown operationType: ${operationType}`)
        }
      }
      log.info(
        `Adding actionHandler: ${resource}.${operationType} for actionType: ${
          actionType
        }`
      )
      return {
        ...actionHandlers,
        [actionType]: actionHandler,
      }
    },
    {}
  )

  return {
    ...includedActionHandles,
    ...operationsActionHandlers,
  }
}
