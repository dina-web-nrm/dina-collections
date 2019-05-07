import { compose } from 'redux'
import {
  createLocalState,
  createNavigationState,
} from 'coreModules/resourceManager/higherOrderComponents'

import SpecimenManager from './Base'

export default compose(
  createLocalState(),
  createNavigationState()
)(SpecimenManager)
