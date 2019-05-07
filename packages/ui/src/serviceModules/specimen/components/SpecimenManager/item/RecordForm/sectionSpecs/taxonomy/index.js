import unitSpecs from '../../unitSpecs'

const {
  taxonomyRoot,
  taxonPreferredName,
  taxonOtherName,
  typeStatus,
  determinations,
} = unitSpecs

const units = [
  taxonomyRoot,
  taxonPreferredName,
  taxonOtherName,
  typeStatus,
  determinations,
]

export default {
  name: 'taxonomy',
  units,
}
