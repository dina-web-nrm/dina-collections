import {
  routerMiddleware as middleware,
  routerReducer as reducer,
} from 'react-router-redux'
import * as constants from './constants'
import * as higherOrderComponents from './higherOrderComponents'

const name = 'routing'

export { constants, higherOrderComponents, name, middleware, reducer }
