module.exports = [
  {
    input: 'pu*',
    matching: ['pusa', 'pusa hispida'],
    notMatching: ['hispida'],
  },
  {
    input: '*pida',
    matching: ['pusa hispida'],
    notMatching: ['pusa'],
  },
  {
    input: '*lo*',
    matching: [
      'gulo',
      'gulo gulo',
      'phyllostomidae',
      'alouatta',
      'alouatta caraya',
      'mus musculoides',
    ],
    notMatching: ['pusa hispida', 'pusa'],
  },
  {
    errorMessage: '** is not allowed',
    input: '**',
    shouldThrow: true,
  },
]
