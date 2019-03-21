module.exports = [
  {
    input: 'pusa hispida',
    matching: ['pusa hispida'],
    notMatching: ['pus hispida', 'hispid pusa'],
  },
  {
    input: 'pusa  hispida',
    matching: ['pusa hispida'],
    notMatching: ['pus hispida', 'hispid pusa'],
  },
  {
    input: 'hispida pusa',
    matching: ['pusa hispida'],
    notMatching: ['pus hispida', 'hispid pusa'],
  },
  {
    input: 'hispida',
    matching: ['pusa hispida'],
    notMatching: ['hispid pusa'],
  },
  {
    input: 'mu mus',
    matching: [
      'mustelidae',
      'mus',
      'mustela',
      'mus musculoides',
      'mustela erminea',
    ],
  },
]
