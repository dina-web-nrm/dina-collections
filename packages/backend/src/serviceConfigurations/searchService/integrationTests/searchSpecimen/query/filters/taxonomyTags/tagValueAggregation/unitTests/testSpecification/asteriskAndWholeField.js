module.exports = [
  {
    input: '==pusa hisp*',
    matching: ['pusa hispida'],
    notMatching: ['pusa'],
  },
  {
    input: '==mus *lo*',
    matching: ['mus musculoides'],
    notMatching: ['musculoides mus'],
  },
  {
    input: '==*lo* mus',
    matching: [],
    notMatching: ['mus', 'mus musculoides'],
  },
]
