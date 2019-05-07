import { compose } from 'redux'
import {
  createQueryState,
  createNavigationState,
} from 'coreModules/resourceManager/higherOrderComponents'

import SpecimenManager from './Base'

export default compose(
  createQueryState(),
  createNavigationState()
)(SpecimenManager)
