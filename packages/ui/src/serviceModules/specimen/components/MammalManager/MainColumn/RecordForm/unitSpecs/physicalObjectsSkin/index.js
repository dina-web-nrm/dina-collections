import { SKIN } from 'serviceModules/curatedList/constants'

import { createPhysicalObjectsByCategory } from '../../formParts/factories'

const parts = [...createPhysicalObjectsByCategory(SKIN)]

export default {
  name: 'physicalObjectsSkin',
  parts,
}
