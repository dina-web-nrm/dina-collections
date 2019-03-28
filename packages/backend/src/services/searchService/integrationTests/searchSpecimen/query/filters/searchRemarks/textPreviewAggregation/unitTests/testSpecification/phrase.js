module.exports = [
  {
    input: '"other institution"',
    matching: ['Skin to other institution.'],
    notMatching: ['institution other'],
  },
  {
    input: '"other inst"',
    notMatching: ['Skin to other institution.'],
  },
]
