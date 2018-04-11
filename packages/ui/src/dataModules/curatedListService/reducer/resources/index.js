import { combineReducers } from 'redux'

import preparationTypes from './preparationTypes'
import featureTypes from './featureTypes'

export default combineReducers({
  featureTypes,
  preparationTypes,
})
