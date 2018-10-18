export const ACCEPTED = 'accepted'
export const ALL = 'all'
export const FAMILY = 'family'
export const GENUS = 'genus'
export const MISSING_RANK = 'missing rank'
export const MODULE_NAME = 'taxon'
export const ORDER = 'order'
export const ROOT_TAXON_NAME = 'Mammalia'
export const SCIENTIFIC = 'scientific'
export const SET_TAXON_INSPECT = 'SET_TAXON_INSPECT'
export const SET_TAXON_NAME_INSPECT = 'SET_TAXON_NAME_INSPECT'
export const SPECIES = 'species'
export const SUBSPECIES = 'subspecies'
export const SYNONYM = 'synonym'
export const VERNACULAR = 'vernacular'

export const DISCONNECT_TAXON_NAME = 'DISCONNECT_TAXON_NAME'
export const SET_TAXON_NAME_AS_ACCEPTED = 'SET_TAXON_NAME_AS_ACCEPTED'
export const SET_TAXON_NAME_AS_SYNONYM = 'SET_TAXON_NAME_AS_SYNONYM'
export const ADD_SYNONYM = 'ADD_SYNONYM'
export const ADD_VERNACULAR_NAME = 'ADD_VERNACULAR_NAME'

const groups = [ORDER, FAMILY, GENUS, SPECIES, SUBSPECIES]

export const DROPDOWN_FILTER_OPTIONS = [
  {
    key: ALL,
    text: ALL,
    value: '',
  },
  ...groups.map(group => {
    return {
      key: group,
      text: group,
      value: group,
    }
  }),
]
