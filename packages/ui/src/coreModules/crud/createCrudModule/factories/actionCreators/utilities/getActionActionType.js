export default function getActionActionType({
  actionType,
  operationType,
  resource,
  resourceActionTypes,
}) {
  if (!(resourceActionTypes && resourceActionTypes[operationType])) {
    throw new Error(
      `Resource: ${resource} dont have actionTypes for operationType: ${
        operationType
      }`
    )
  }
  if (!resourceActionTypes[operationType][actionType]) {
    throw new Error(
      `Resource: ${resource} dont have actionType ${
        actionType
      } for operationType: ${operationType}`
    )
  }

  return resourceActionTypes[operationType][actionType]
}
