import { compose } from 'redux'

import RecordActionBar from './Base'
import {
  createHandleCreateSubmit,
  createHandleCancelCreate,
} from './higherOrderComponents'

export default compose(createHandleCreateSubmit(), createHandleCancelCreate())(
  RecordActionBar
)
