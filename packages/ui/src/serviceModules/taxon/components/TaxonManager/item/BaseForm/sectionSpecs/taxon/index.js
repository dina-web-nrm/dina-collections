import { recordHistoryEvents } from 'coreModules/form/components/units'
import unitSpecs from '../../unitSpecs'

const { scientificNames, taxonRoot, vernacularNames } = unitSpecs

const units = [taxonRoot, scientificNames, vernacularNames, recordHistoryEvents]

export default {
  name: 'taxon',
  units,
}
