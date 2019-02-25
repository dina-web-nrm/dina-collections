import { compose } from 'redux'
import {
  createLocalState,
  createNavigationState,
} from 'coreModules/resourceManager/higherOrderComponents'

import StorageLocationManager from './Base'

export default compose(
  createLocalState(),
  createNavigationState()
)(StorageLocationManager)
