import { compose } from 'redux'
import {
  createQueryState,
  createNavigationState,
} from 'coreModules/resourceManager/higherOrderComponents'

import TaxonNameManager from './Base'

export default compose(
  createQueryState(),
  createNavigationState()
)(TaxonNameManager)
