import * as api from 'coreModules/api'
import * as bootstrap from 'coreModules/bootstrap'
import * as commonUi from 'coreModules/commonUi'
import * as error from 'coreModules/error'
import * as i18n from 'coreModules/i18n'
import * as keyboardShortcuts from 'coreModules/keyboardShortcuts'
import * as layout from 'coreModules/layout'
import * as notifications from 'coreModules/notifications'
import * as size from 'coreModules/size'
import * as user from 'coreModules/user'
import * as devToolsExtension from 'coreModules/devToolsExtension'
import * as localStorage from 'coreModules/localStorage'
import * as logger from 'coreModules/logger'
import * as routing from 'coreModules/routing'

import * as curatedListService from 'dataModules/curatedListService'
import * as placeService from 'dataModules/placeService'
import * as specimenService from 'dataModules/specimenService'
import * as storageService from 'dataModules/storageService'
import * as taxonService from 'dataModules/taxonService'

const modules = [
  api,
  bootstrap,
  commonUi,
  error,
  i18n,
  keyboardShortcuts,
  layout,
  notifications,
  size,
  user,
  devToolsExtension,
  localStorage,
  logger,
  routing,

  curatedListService,
  placeService,
  specimenService,
  storageService,
  taxonService,
]

export default modules
