import * as publicModule from './public'
import * as start from './start'
import * as app from './app'
import * as editMammal from './editMammal'
import * as home from './home'
import * as lookupMammals from './lookupMammals'
import * as registerMammal from './registerMammal'
import * as login from './login'
import * as settings from './settings'
import * as docs from './docs'
import * as pageNotFound from './pageNotFound'

const modules = [
  publicModule,
  start,
  app,
  editMammal,
  home,
  lookupMammals,
  registerMammal,
  login,
  settings,
  docs,
  pageNotFound,
]

export default modules
