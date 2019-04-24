module.exports = [
  {
    input: '=pusa',
    matching: ['pusa', 'pusa hispida'],
    notMatching: ['pusan'],
  },
  {
    input: '=pusa hispida',
    matching: ['pusa hispida'],
    notMatching: ['pusa hispidan'],
  },
  {
    input: '=pu',
    notMatching: ['pusa'],
  },
  {
    input: '=',
    matching: [],
    notMatching: ['pusan', 'c'],
  },
  {
    input: '=pusa =hispida',
    matchingNotInSampleData: ['pusa =hispida'],
    notMatching: ['pusa hispida', 'pusa =hispidan'],
  },
]
