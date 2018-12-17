import { compose } from 'redux'

import RecordActionBar from './Base'
import {
  createHandleDelete,
  createHandleEditSubmit,
  createHandleUndoChanges,
} from './higherOrderComponents'

export default compose(
  createHandleDelete(),
  createHandleEditSubmit(),
  createHandleUndoChanges()
)(RecordActionBar)
