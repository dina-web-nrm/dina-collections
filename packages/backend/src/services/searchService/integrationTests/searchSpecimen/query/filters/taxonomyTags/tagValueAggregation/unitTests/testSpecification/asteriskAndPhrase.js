module.exports = [
  {
    input: '"mus *lo*"',
    matching: ['mus musculoides'],
    notMatching: ['musculoides mus'],
  },
  {
    input: '"*lo* mus"',
    matching: [],
    notMatching: ['mus', 'mus musculoides'],
  },
]
