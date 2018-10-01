export const MODULE_NAME = 'crud'
export const RESOURCES_NAMESPACE = 'resources'
export const KEY_OBJECT_NAMSPACE = 'keyObject'

export const OPERATION_TYPE_CREATE = 'create'
export const OPERATION_TYPE_DEL = 'del'
export const OPERATION_TYPE_GET_MANY = 'getMany'
export const OPERATION_TYPE_GET_ONE = 'getOne'
export const OPERATION_TYPE_QUERY = 'query'
export const OPERATION_TYPE_UPDATE = 'update'

export const ALL_OPERATION_TYPES = [
  OPERATION_TYPE_CREATE,
  OPERATION_TYPE_DEL,
  OPERATION_TYPE_GET_MANY,
  OPERATION_TYPE_GET_ONE,
  OPERATION_TYPE_QUERY,
  OPERATION_TYPE_UPDATE,
]

export const ACTION_KEY_SET_INCLUDED = 'setIncluded'

export const API_ACTION_TYPE_FAIL = 'fail'
export const API_ACTION_TYPE_REQUEST = 'request'
export const API_ACTION_TYPE_SUCCESS = 'success'

export const SELECTOR_TYPE_GET_ALL_AS_OPTIONS = 'getAllAsOptions'

export const ALL_CUSTOM_SELECTOR_TYPES = [SELECTOR_TYPE_GET_ALL_AS_OPTIONS]

export const apiActionTypes = {
  API_ACTION_TYPE_FAIL,
  API_ACTION_TYPE_REQUEST,
  API_ACTION_TYPE_SUCCESS,
}
