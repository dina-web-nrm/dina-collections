module.exports = [
  {
    input: 'pusa hispida',
    matching: ['pusa hispida', 'hispida pusa'],
    notMatching: ['pus hispida', 'hispid pusa'],
  },
  {
    input: 'pusa  hispida',
    matching: ['pusa hispida', 'hispida pusa'],
    notMatching: ['pus hispida', 'hispid pusa'],
  },
  {
    input: 'mu mus',
    matching: ['mus musculoides', 'mustela erminea'],
  },
]
