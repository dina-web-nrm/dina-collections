import { compose } from 'redux'
import {
  createQueryState,
  createNavigationState,
} from 'coreModules/resourceManager/higherOrderComponents'

import StorageLocationManager from './Base'

export default compose(createQueryState(), createNavigationState())(
  StorageLocationManager
)
