import Dependor from 'utilities/Dependor'
import getActionActionType from './getActionActionType'
import {
  API_ACTION_TYPE_FAIL,
  API_ACTION_TYPE_REQUEST,
  API_ACTION_TYPE_SUCCESS,
} from '../../../../constants'

export const dep = new Dependor({
  getActionActionType,
})

export default function getActionActionTypes(
  { operationType, resource, resourceActionTypes } = {}
) {
  const fail = dep.getActionActionType({
    actionType: API_ACTION_TYPE_FAIL,
    operationType,
    resource,
    resourceActionTypes,
  })

  const request = dep.getActionActionType({
    actionType: API_ACTION_TYPE_REQUEST,
    operationType,
    resource,
    resourceActionTypes,
  })

  const success = dep.getActionActionType({
    actionType: API_ACTION_TYPE_SUCCESS,
    operationType,
    resource,
    resourceActionTypes,
  })

  return {
    fail,
    request,
    success,
  }
}
