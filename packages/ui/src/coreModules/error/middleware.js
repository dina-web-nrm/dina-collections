import config from 'config'
import createNotification from 'coreModules/notifications/actionCreators/createNotification'
import logout from 'coreModules/user/actionCreators/logout'

export default function errorMiddleware({ debug = true } = {}) {
  return ({ dispatch }) => next => action => {
    const result = next(action)
    if (!debug) {
      return result
    }
    if (action.error && action.payload) {
      const error =
        (action.payload && action.payload.requestError) || action.payload || {} // _requestError is request error after handled by redux form

      if (error && error.code) {
        console.log(`Error in action ${action.type}:`, action.payload) // eslint-disable-line no-console

        dispatch(
          createNotification({
            componentProps: {
              description: `${error.description}: ${error.detail}`,
              header: error.code,
            },
            type: 'ERROR',
          })
        )
      } else if (config.isDevelopment) {
        dispatch(
          createNotification({
            componentProps: {
              description: action.payload && action.payload.message,
              header: 'Unknown error',
            },
            type: 'ERROR',
          })
        )
        console.log(action.payload) // eslint-disable-line no-console
      }

      // logout user from frontend i API responds with Unauthorized. this will
      // redirect to /login if user was on page that requires being logged in
      if (action.payload && action.payload.status === 401) {
        dispatch(logout())
      }
    }
    return result
  }
}
