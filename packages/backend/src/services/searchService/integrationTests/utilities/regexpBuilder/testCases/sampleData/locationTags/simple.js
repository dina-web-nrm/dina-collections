module.exports = [
  {
    input: 'Bogesund',
    matching: ['bogesund, röskär', 'bogesund, rödskär'],
    notMatching: ['europe'],
  },
  {
    input: 'rödskär',
    matching: ['bogesund, rödskär'],
    notMatching: ['europe'],
  },
]
