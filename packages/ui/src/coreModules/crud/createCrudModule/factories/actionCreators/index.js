import createLog from 'utilities/log'
import Dependor from 'utilities/Dependor'

import {
  OPERATION_TYPE_CREATE,
  OPERATION_TYPE_GET_MANY,
  OPERATION_TYPE_GET_ONE,
  OPERATION_TYPE_UPDATE,
} from '../../../constants'

import createFactory from './createFactory'
import getManyFactory from './getManyFactory'
import getOneFactory from './getOneFactory'
import updateFactory from './updateFactory'

const factoryMap = {
  [OPERATION_TYPE_CREATE]: createFactory,
  [OPERATION_TYPE_GET_MANY]: getManyFactory,
  [OPERATION_TYPE_GET_ONE]: getOneFactory,
  [OPERATION_TYPE_UPDATE]: updateFactory,
}

export const dep = new Dependor({
  factoryMap,
})

const log = createLog('coreModules:crud:actionCreators')

export default function createActionCreators(
  { resourceActionTypes, resourceSpecification = {} } = {}
) {
  const { resource, operations } = resourceSpecification

  if (!resource) {
    throw new Error('resource is required')
  }

  if (!(operations && operations.length)) {
    return {}
  }

  return operations.reduce((actionCreators, operation) => {
    const { type: operationType, operationId } = operation
    if (!operationType) {
      return actionCreators
    }

    const actionCreatorFactory = dep.factoryMap[operationType]
    if (!actionCreatorFactory) {
      throw new Error(`Unknown operation type: ${operationType}`)
    }

    const actionCreator = actionCreatorFactory({
      operationId,
      operationType,
      resource,
      resourceActionTypes,
    })
    log.info(`Adding actionCreator: ${resource}.${operationType}`)
    return {
      ...actionCreators,
      [operationType]: actionCreator,
    }
  }, {})
}
