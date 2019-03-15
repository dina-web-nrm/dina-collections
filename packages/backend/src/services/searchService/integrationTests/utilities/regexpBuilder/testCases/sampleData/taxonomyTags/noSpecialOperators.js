module.exports = [
  {
    input: 'pusa',
    matching: ['pusa', 'pusa hispida'],
    notMatching: ['anpusa'],
  },
  {
    input: 'pu',
    matching: ['pusa', 'pusa hispida', 'rhabdomys pumilo'],
    notMatching: ['anpusa', 'test anpusi piu'],
  },
  {
    input: 'c',
    matching: ['alouatta carya', 'capreaolus capreolus'],
    notMatching: ['ac'],
  },
]
