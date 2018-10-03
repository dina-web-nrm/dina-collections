import * as api from './api'
import * as bootstrap from './bootstrap'
import * as commonUi from './commonUi'
import * as crud from './crud'
import * as devToolsExtension from './devToolsExtension'
import * as documentation from './documentation'
import * as error from './error'
import * as form from './form'
import * as formSupport from './formSupport'
import * as i18n from './i18n'
import * as keyboardShortcuts from './keyboardShortcuts'
import * as layout from './layout'
import * as localStorage from './localStorage'
import * as logger from './logger'
import * as notifications from './notifications'
import * as resourceManager from './resourceManager'
import * as routing from './routing'
import * as search from './search'
import * as size from './size'
import * as user from './user'

const modules = [
  api,
  bootstrap,
  crud,
  search,
  commonUi,
  layout,
  devToolsExtension,
  error,
  form,
  formSupport,
  i18n,
  localStorage,
  logger,
  notifications,
  routing,
  size,
  user,
  keyboardShortcuts,
  resourceManager,
  documentation,
]

export default modules
