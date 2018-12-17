import {
  API_CALL_OPERATION_REQUEST,
  API_CALL_OPERATION_SUCCESS,
  API_CALL_OPERATION_FAIL,
} from '../actionTypes'

export default function callOperation({
  operationId,
  request,
  throwError = true,
}) {
  return (dispatch, getState, { apiClient }) => {
    const meta = {
      operationId,
      request,
    }
    dispatch({
      meta,
      type: API_CALL_OPERATION_REQUEST,
    })

    return apiClient.call(operationId, request).then(
      response => {
        dispatch({
          meta,
          payload: response.data,
          type: API_CALL_OPERATION_SUCCESS,
        })
        return response.data
      },
      error => {
        dispatch({
          error: true,
          meta,
          payload: error,
          type: API_CALL_OPERATION_FAIL,
        })

        if (throwError) {
          throw error
        }
        return error
      }
    )
  }
}
