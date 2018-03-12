const selectableUnits = [
  {
    key: 'kg',
    name: {
      en: 'kg',
      sv: 'kg',
    },
  },
  {
    key: 'g',
    name: {
      en: 'g',
      sv: 'g',
    },
  },
]

module.exports = [
  { group: 'weight', key: 'complete-body-weight', selectableUnits },
  { group: 'weight', key: 'skinned-weight', selectableUnits },
  { group: 'weight', key: 'gutted-weight', selectableUnits },
  { group: 'weight', key: 'slaughtered-weight', selectableUnits },
  { group: 'weight', key: 'unknown-weight-type', selectableUnits },
]
