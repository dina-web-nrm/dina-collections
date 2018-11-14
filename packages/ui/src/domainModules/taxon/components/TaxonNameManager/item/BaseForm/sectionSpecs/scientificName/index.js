import { recordHistoryEvents } from 'coreModules/form/components/units'
import unitSpecs from '../../unitSpecs'

const { scientificName, taxonStatus } = unitSpecs

const units = [scientificName, taxonStatus, recordHistoryEvents]

export default {
  name: 'scientificName',
  units,
}
