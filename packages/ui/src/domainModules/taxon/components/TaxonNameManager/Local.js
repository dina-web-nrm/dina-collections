import { compose } from 'redux'
import {
  createLocalState,
  createNavigationState,
} from 'coreModules/resourceManager/higherOrderComponents'

import TaxonNameManager from './Base'

export default compose(
  createLocalState(),
  createNavigationState()
)(TaxonNameManager)
