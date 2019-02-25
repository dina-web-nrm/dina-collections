import { compose } from 'redux'
import {
  createQueryState,
  createNavigationState,
} from 'coreModules/resourceManager/higherOrderComponents'

import TaxonManager from './Base'

export default compose(
  createQueryState(),
  createNavigationState()
)(TaxonManager)
