module.exports = [
  {
    input: '=pusa',
    matching: ['pusa'],
    notMatching: ['pusan'],
  },
  {
    input: '=pu',
    notMatching: ['pusa'],
  },
  {
    input: '=',
    matching: [''],
    notMatching: ['pusan', 'c'],
  },
]
