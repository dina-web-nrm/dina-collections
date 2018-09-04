import { compose } from 'redux'
import {
  createQueryState,
  createNavigationState,
} from 'coreModules/resourceManager/higherOrderComponents'

import LocalityManager from './Base'

export default compose(createQueryState(), createNavigationState())(
  LocalityManager
)
