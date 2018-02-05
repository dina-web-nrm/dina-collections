import { isKnownError } from 'utilities/error'
import logout from 'coreModules/user/actionCreators/logout'

export default function errorMiddleware({ debug = true } = {}) {
  return ({ dispatch }) => next => action => {
    const result = next(action)
    if (!debug) {
      return result
    }
    if (action.error) {
      if (isKnownError(action.payload)) {
        console.log(`Error in action ${action.type}:`, action.payload) // eslint-disable-line no-console
      } else if (process.env.NODE_ENV === 'development') {
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
