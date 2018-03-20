const selectableValues = [
  { key: 'female', name: { en: 'female', sv: 'hona' } },
  { key: 'female?', name: { en: 'female?', sv: 'hona?' } },
  { key: 'male', name: { en: 'male', sv: 'hane' } },
  { key: 'male?', name: { en: 'male?', sv: 'hane?' } },
  { key: 'hermaphrodite', name: { en: 'hermaphrodite', sv: 'hermafrodit' } },
  { key: 'indeterminate', name: { en: 'indeterminate', sv: 'obestämd' } },
  { key: 'castrated', name: { en: 'castrated', sv: 'kastrerad' } },
  { key: 'transitional', name: { en: 'transitional', sv: 'transitional' } },
  { key: 'unknown', name: { en: 'unknown', sv: 'okänd' } },
]

module.exports = [
  {
    group: 'sex',
    key: 'sex',
    selectableValues,
  },
]
