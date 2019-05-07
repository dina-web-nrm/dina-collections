import { SKELETON } from 'serviceModules/curatedList/constants'

import { createPhysicalObjectsByCategory } from '../../formParts/factories'

const parts = [...createPhysicalObjectsByCategory(SKELETON)]

export default {
  name: 'physicalObjectsSkeleton',
  parts,
}
