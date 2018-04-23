import {
  API_ACTION_TYPE_REQUEST,
  API_ACTION_TYPE_FAIL,
  API_ACTION_TYPE_SUCCESS,
} from '../../../constants'

const getActionActionType = ({
  actionType,
  resource,
  resourceActionTypes,
  type,
}) => {
  if (!resourceActionTypes[type]) {
    throw new Error(
      `Resource: ${resource} dont have actionTypes for operationType: ${type}`
    )
  }
  if (!resourceActionTypes[type][actionType]) {
    throw new Error(
      `Resource: ${resource} dont have actionType ${
        actionType
      } for operationType: ${type}`
    )
  }

  return resourceActionTypes[type][actionType]
}

export default function getActionActionTypes({
  resource,
  resourceActionTypes,
  type,
}) {
  const failActionType = getActionActionType({
    actionType: API_ACTION_TYPE_FAIL,
    resource,
    resourceActionTypes,
    type,
  })

  const requestActionType = getActionActionType({
    actionType: API_ACTION_TYPE_REQUEST,
    resource,
    resourceActionTypes,
    type,
  })

  const successActionType = getActionActionType({
    actionType: API_ACTION_TYPE_SUCCESS,
    resource,
    resourceActionTypes,
    type,
  })

  return {
    failActionType,
    requestActionType,
    successActionType,
  }
}
