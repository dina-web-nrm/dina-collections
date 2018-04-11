import * as app from './app'
import * as docs from './docs'
import * as editMammal from './editMammal'
import * as home from './home'
import * as login from './login'
import * as lookupMammals from './lookupMammals'
import * as manageLocalities from './manageLocalities'
import * as manageStorageLocations from './manageStorageLocations'
import * as pageNotFound from './pageNotFound'
import * as publicModule from './public'
import * as registerMammal from './registerMammal'
import * as settings from './settings'
import * as start from './start'

const modules = [
  publicModule,
  start,
  app,
  editMammal,
  home,
  lookupMammals,
  registerMammal,
  manageLocalities,
  manageStorageLocations,
  login,
  settings,
  docs,
  pageNotFound,
]

export default modules
