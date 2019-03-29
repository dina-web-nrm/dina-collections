module.exports = [
  {
    input: '"pusa hispida"',
    matching: ['pusa hispida'],
    matchingNotInSampleData: ['pusa hispida test'],
    notMatching: ['pusa', 'hispida pusa'],
  },
  {
    input: '"pusa hisp"',
    matching: ['pusa hispida'],
    notMatching: ['pusa', 'hispida pusa'],
  },
  {
    input: '"sa his"',
    matching: ['pusa hispida'],
    notMatching: ['pusa', 'hispida pusa'],
  },
  {
    input: '"pusa"',
    matching: ['pusa', 'pusa hispida'],
    notMatching: ['hispida'],
  },
  {
    input: '"hispida pusa"',
    notMatching: ['pusa hispida', 'pusa'],
  },
]
