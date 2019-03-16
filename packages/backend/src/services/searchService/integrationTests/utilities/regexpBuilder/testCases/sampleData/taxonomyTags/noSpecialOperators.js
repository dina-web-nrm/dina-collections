module.exports = [
  {
    input: 'pusa',
    matching: ['pusa', 'pusa hispida'],
    notMatching: ['anpusa'],
  },
  {
    input: 'pu',
    matching: ['pusa', 'pusa hispida', 'rhabdomys pumilio'],
    notMatching: ['anpusa', 'test anpusi piu'],
  },
  {
    input: 'c',
    matching: [
      'carnivora',
      'chiroptera',
      'cervidae',
      'capreolus',
      'alouatta caraya',
      'capreolus capreolus',
    ],
    notMatching: ['ac'],
  },
]
