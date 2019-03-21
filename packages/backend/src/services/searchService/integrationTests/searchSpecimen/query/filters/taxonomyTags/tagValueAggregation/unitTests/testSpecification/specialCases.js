module.exports = [
  {
    input: '"pusa hispida',
    matchingNotInSampleData: ['"pusa hispida'],
    notMatching: ['pusa hispida'],
  },
  {
    input: '="pusa hispida"',
    matching: ['pusa hispida'],
    notMatching: ['pus hispida', 'hispid pusa'],
  },
  {
    input: '"pusa hispida" "phoca"',
    matchingNotInSampleData: ['pusa hispida" "phoca'],
    notMatching: ['pusa hispida', 'phoca'],
  },
  {
    input: '*',
    matchingNotInSampleData: ['', 'p', 'pusa hispida'],
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
