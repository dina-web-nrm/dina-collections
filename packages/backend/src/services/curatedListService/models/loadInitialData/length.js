const selectableUnits = [
  {
    key: 'mm',
    name: {
      en: 'mm',
      sv: 'mm',
    },
  },
  {
    key: 'cm',
    name: {
      en: 'cm',
      sv: 'cm',
    },
  },
  {
    key: 'm',
    name: {
      en: 'm',
      sv: 'm',
    },
  },
]

module.exports = [
  { group: 'length', key: 'total-length', selectableUnits },
  { group: 'length', key: 'body-length', selectableUnits },
  { group: 'length', key: 'tail-anus-length', selectableUnits },
  { group: 'length', key: 'tail-pelvis-length', selectableUnits },
  { group: 'length', key: 'ear-length', selectableUnits },
  { group: 'length', key: 'hind-foot-length', selectableUnits },
]
