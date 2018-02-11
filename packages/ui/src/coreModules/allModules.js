import * as api from './api'
import * as bootstrap from './bootstrap'
import * as commonUi from './commonUi'
import * as devToolsExtension from './devToolsExtension'
import * as documentation from './documentation'
import * as error from './error'
import * as form from './form'
import * as i18n from './i18n'
import * as keyboardShortcuts from './keyboardShortcuts'
import * as localStorage from './localStorage'
import * as logger from './logger'
import * as notifications from './notifications'
import * as routing from './routing'
import * as size from './size'
import * as user from './user'

const modules = [
  api,
  bootstrap,
  commonUi,
  devToolsExtension,
  error,
  form,
  i18n,
  localStorage,
  logger,
  notifications,
  routing,
  size,
  user,
  keyboardShortcuts,
  documentation,
]

export default modules
