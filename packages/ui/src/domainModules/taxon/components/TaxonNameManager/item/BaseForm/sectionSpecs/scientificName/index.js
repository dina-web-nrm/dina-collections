import { recordHistoryEvents } from 'coreModules/form/components/units'
import unitSpecs from '../../unitSpecs'

const { scientificNameRoot, taxonStatus } = unitSpecs

const units = [scientificNameRoot, taxonStatus, recordHistoryEvents]

export default {
  name: 'scientificName',
  units,
}
