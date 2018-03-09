import * as collectionMammals from './collectionMammals'
import * as curatedListService from './curatedListService'
import * as localityService from './localityService'
import * as storageService from './storageService'
import * as taxonomy from './taxonomy'

const modules = [
  curatedListService,
  localityService,
  storageService,
  taxonomy,
  collectionMammals,
]

export default modules
