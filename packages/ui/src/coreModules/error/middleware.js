import config from 'config'
import isDinaError from 'common/es5/error/utilities/isDinaError'
import createNotification from 'coreModules/notifications/actionCreators/createNotification'
import logout from 'coreModules/user/actionCreators/logout'

export default function errorMiddleware({ debug = true } = {}) {
  return ({ dispatch }) => next => action => {
    const result = next(action)
    if (!debug) {
      return result
    }
    if (action.error) {
      if (isDinaError(action.payload)) {
        console.log(`Error in action ${action.type}:`, action.payload) // eslint-disable-line no-console
        dispatch(
          createNotification({
            componentProps: {
              description: action.payload.description,
              header: action.payload.code,
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
