import { compose } from 'redux'

import RecordActionBar from './Base'
import {
  createHandleCreateSubmit,
  createHandleUndoChanges,
} from './higherOrderComponents'

export default compose(createHandleCreateSubmit(), createHandleUndoChanges())(
  RecordActionBar
)
