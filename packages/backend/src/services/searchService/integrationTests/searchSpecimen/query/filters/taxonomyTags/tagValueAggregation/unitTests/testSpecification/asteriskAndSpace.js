module.exports = [
  {
    input: '*lo* mus',
    matching: ['mus musculoides'],
    notMatching: ['mus'],
  },
  {
    input: 'mus *lo*',
    matching: ['mus musculoides'],
    notMatching: ['mus'],
  },
  {
    input: 'mus *lo',
    matching: [],
    notMatching: ['mus', 'mus musculoides'],
  },
]
