import { recordHistoryEvents } from 'coreModules/form/components/units'
import unitSpecs from '../../unitSpecs'

const { place } = unitSpecs

const units = [place, recordHistoryEvents]

export default {
  name: 'place',
  units,
}
