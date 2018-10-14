import { SKIN } from 'domainModules/curatedList/constants'

import { createPhysicalObjectsByCategory } from '../../formParts/factories'

const parts = [...createPhysicalObjectsByCategory(SKIN)]

export default {
  name: 'physicalObjectsSkin',
  parts,
}
