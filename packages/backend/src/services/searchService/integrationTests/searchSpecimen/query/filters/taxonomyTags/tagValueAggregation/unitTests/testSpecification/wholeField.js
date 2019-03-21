module.exports = [
  {
    input: '==pusa hispida',
    matching: ['pusa hispida'],
    notMatching: ['pusa', 'hispida pusa'],
  },
  {
    input: '==pusa hisp',
    notMatching: ['pusa hispida', 'pusa', 'hispida pusa'],
  },
  {
    input: '==pusa',
    matching: ['pusa'],
    notMatching: ['hispida'],
  },
  {
    input: '==hispida pusa',
    notMatching: ['pusa hispida', 'pusa'],
  },
]
