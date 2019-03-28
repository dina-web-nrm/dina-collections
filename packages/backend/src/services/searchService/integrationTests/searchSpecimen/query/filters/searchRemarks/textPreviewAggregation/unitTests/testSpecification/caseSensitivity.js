const complexMatch =
  'Ur Gyldenstolpe "A Cont. to the ornth. of Northern Bolivia": Orion är belägen ca 35 km söder om Reyes'

module.exports = [
  {
    input: '"A ConT',
    matching: [complexMatch],
    notMatching: ['Skin to other institutiob.'],
  },
  {
    input: '"a cont',
    matching: [complexMatch],
    notMatching: ['Skin to other institutiob.'],
  },
]
