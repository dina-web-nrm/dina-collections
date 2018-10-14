import { OTHER_PREPARATION } from 'domainModules/curatedList/constants'

import { createPhysicalObjectsByCategory } from '../../formParts/factories'

const parts = [...createPhysicalObjectsByCategory(OTHER_PREPARATION)]

export default {
  name: 'physicalObjectsOtherPreparation',
  parts,
}
