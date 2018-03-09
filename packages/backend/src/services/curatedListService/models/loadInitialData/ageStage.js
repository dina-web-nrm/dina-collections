const selectableValues = [
  { key: 'adult', name: { en: 'adult', sv: 'adult' } },
  { key: 'adult?', name: { en: 'adult? ', sv: 'adult?' } },
  { key: 'subadult', name: { en: 'subadult ', sv: 'subadult' } },
  { key: 'subadult?', name: { en: 'subadult?', sv: 'subadult?' } },
  { key: 'juvenile', name: { en: 'juvenile ', sv: 'juvenil' } },
  { key: 'juvenile?', name: { en: 'juvenile?', sv: 'juvenil?' } },
  { key: 'immature', name: { en: 'immature ', sv: 'immatur' } },
  { key: 'embryo', name: { en: 'embryo ', sv: 'embryo' } },
  { key: 'fetus', name: { en: 'fetus', sv: 'featus' } },
  { key: 'unknown', name: { en: 'unknown', sv: 'okänd' } },
]

const selectableMethods = [
  { key: 'known-age', name: { en: 'known age' } },
  { key: 'sectioned-teeth', name: { en: 'sectioned teeth' } },
  { key: 'other', name: { en: 'other' } },
]

module.exports = [
  {
    group: 'age-stage',
    key: 'age-stage',
    selectableMethods,
    selectableValues,
  },
  {
    group: 'age-and-stage',
    key: 'age',
  },
]
