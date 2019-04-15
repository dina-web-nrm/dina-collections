import { compose } from 'redux'
import {
  createLocalState,
  createNavigationState,
} from 'coreModules/resourceManager/higherOrderComponents'

import TaxonManager from './Base'

export default compose(
  createLocalState(),
  createNavigationState()
)(TaxonManager)
