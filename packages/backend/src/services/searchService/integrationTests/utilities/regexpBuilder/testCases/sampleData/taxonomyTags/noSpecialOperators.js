module.exports = [
  {
    input: 'pusa',
    matching: ['pusa', 'pusa hispida'],
    notMatching: ['anpusa'],
  },
  {
    input: 'pu',
    matching: ['pusa', 'pusa hispida'],
    notMatching: ['anpusa', 'test anpusi piu'],
  },
  {
    input: 'c',
    matching: [
      'carnivora',
      'chiroptera',
      'cervidae',
      'capreolus',
      'capreolus capreolus',
    ],
    notMatching: ['ac'],
  },
]
