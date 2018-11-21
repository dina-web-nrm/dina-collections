import config from 'config'
import createNotification from 'coreModules/notifications/actionCreators/createNotification'
import logout from 'coreModules/user/actionCreators/logout'
import globalUserSelectors from 'coreModules/user/globalSelectors'

export default function errorMiddleware({ debug = true } = {}) {
  return ({ dispatch, getState }) => next => action => {
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

      // logout user from frontend if API responds with Unauthorized or
      // Forbidden. this will redirect to /login if user was on page that
      // requires being logged in
      // TODO: Implement more fine-grained behavior for 403
      if (
        action.payload &&
        (action.payload.status === 401 || action.payload.status === 403)
      ) {
        const isLoggedIn = globalUserSelectors.getUserLoggedIn(getState())
        if (isLoggedIn) {
          dispatch(logout())
        }
      }
    }
    return result
  }
}
