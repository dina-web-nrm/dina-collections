import * as app from './app'
import * as dataViewer from './dataViewer'
import * as docs from './docs'
import * as specimensMammals from './specimensMammals'
import * as home from './home'
import * as login from './login'
import * as manageAgents from './manageAgents'
import * as manageLocalities from './manageLocalities'
import * as manageStorageLocations from './manageStorageLocations'
import * as manageTaxonomy from './manageTaxonomy'
import * as manageTaxonNames from './manageTaxonNames'
import * as sourceData from './sourceData'

import * as pageNotFound from './pageNotFound'
import * as publicModule from './public'
import * as settings from './settings'
import * as start from './start'

const modules = [
  publicModule,
  start,
  app,
  dataViewer,
  specimensMammals,
  home,
  manageAgents,
  manageLocalities,
  manageStorageLocations,
  manageTaxonomy,
  manageTaxonNames,
  sourceData,
  login,
  settings,
  docs,
  pageNotFound,
]

export default modules
