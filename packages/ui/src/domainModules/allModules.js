import * as collectionMammals from './collectionMammals'
import * as curatedListService from './curatedListService'
import * as identifierService from './identifierService'
import * as localityService from './localityService'
import * as storageService from './storageService'
import * as taxonomy from './taxonomy'

const modules = [
  curatedListService,
  identifierService,
  localityService,
  storageService,
  taxonomy,
  collectionMammals,
]

export default modules
