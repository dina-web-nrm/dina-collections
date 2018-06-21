import {
  OPERATION_TYPE_CREATE,
  OPERATION_TYPE_GET_MANY,
  OPERATION_TYPE_GET_ONE,
  OPERATION_TYPE_QUERY,
  OPERATION_TYPE_UPDATE,
} from '../../../constants'

export default function createOperationSpecification({
  operationConfig,
  resourceName,
}) {
  const { type, operationId, options } = operationConfig
  if (!operationId) {
    throw new Error(
      `Operation for resource: ${resourceName} with type: ${
        type
      } is missing operationId`
    )
  }

  switch (type) {
    case OPERATION_TYPE_CREATE:
    case OPERATION_TYPE_GET_MANY:
    case OPERATION_TYPE_GET_ONE:
    case OPERATION_TYPE_QUERY:
    case OPERATION_TYPE_UPDATE: {
      return {
        operationId, // create operation id
        options,
        type,
      }
    }

    default: {
      throw new Error(`Unknown type: ${type}`)
    }
  }
}
