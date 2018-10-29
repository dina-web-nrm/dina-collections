import unitSpecs from '../../unitSpecs'

const { scientificNames, taxonRoot, vernacularNames } = unitSpecs

const units = [taxonRoot, scientificNames, vernacularNames]

export default {
  name: 'taxon',
  units,
}
