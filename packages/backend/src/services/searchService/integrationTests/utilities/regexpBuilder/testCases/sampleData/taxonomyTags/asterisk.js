module.exports = [
  {
    input: 'pu*',
    matching: ['pusa', 'pusa hispida'],
    notMatching: ['hispida'],
  },
  {
    input: '*pida',
    matching: ['pusa hispida', 'hispida pusa'],
    notMatching: ['pusa'],
  },
  {
    input: '*lo*',
    matching: ['gulo gulo', 'Mus musculoides', 'Gulo'],
    notMatching: ['pusa hispida', 'pusa'],
  },
  {
    errorMessage: '** is not allowed',
    input: '**',
    shouldThrow: true,
  },
]
