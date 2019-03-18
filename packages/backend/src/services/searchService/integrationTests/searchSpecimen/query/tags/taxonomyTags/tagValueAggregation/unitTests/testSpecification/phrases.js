module.exports = [
  {
    input: '"pusa hispida"',
    matching: ['pusa hispida'],
    notMatching: ['pusa', 'hispida pusa'],
  },
  {
    input: '"pusa hisp"',
    notMatching: ['pusa hispida', 'pusa', 'hispida pusa'],
  },
  {
    input: '"pusa"',
    matching: ['pusa'],
    notMatching: ['pusa hispida', 'hispida pusa'],
  },
  {
    input: '"hispida pusa"',
    notMatching: ['pusa hispida', 'pusa'],
  },
  {
    errorMessage: 'expected 2 " but got 1',
    input: '"hispida pusa',
  },
]
