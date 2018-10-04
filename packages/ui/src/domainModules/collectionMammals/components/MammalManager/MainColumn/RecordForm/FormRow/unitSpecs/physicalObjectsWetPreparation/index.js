import { WET_PREPARATION } from 'domainModules/curatedList/constants'

import { createPhysicalObjectsByCategory } from '../../formParts/factories'

const parts = [...createPhysicalObjectsByCategory(WET_PREPARATION)]

export default {
  name: 'physicalObjectsWetPreparation',
  parts,
}
