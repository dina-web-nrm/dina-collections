import { compose } from 'redux'
import {
  createLocalState,
  createNavigationState,
} from 'coreModules/resourceManager/higherOrderComponents'

import LocalityManager from './Base'

export default compose(createLocalState(), createNavigationState())(
  LocalityManager
)
