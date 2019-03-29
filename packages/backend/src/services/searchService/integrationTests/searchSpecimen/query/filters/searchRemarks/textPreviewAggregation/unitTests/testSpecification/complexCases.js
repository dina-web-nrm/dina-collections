const complexMatch =
  'Ur Gyldenstolpe "A Cont. to the ornth. of Northern Bolivia": Orion är belägen ca 35 km söder om Reyes'

module.exports = [
  {
    input: 'other institution.',
    matching: ['Skin to other institution.'],
    notMatching: ['Skin to other institutiob.'],
  },
  {
    input: 'Gyldenstolpe Cont',
    matching: [complexMatch],
    notMatching: ['Skin to other institutiob.'],
  },
  {
    input: '"A',
    matching: [complexMatch],
    notMatching: ['Skin to other institutiob.'],
  },
  {
    input: '"A Cont.',
    matching: [complexMatch],
    notMatching: ['Skin to other institutiob.'],
  },
  {
    input: '"A Cont',
    matching: [complexMatch],
    notMatching: ['Skin to other institutiob.'],
  },
  {
    input: 'coordinates.',
    matching: [
      `Type locality in Wilson and reeder doesn${"'"}t agree with my coordinates.`,
    ],
    notMatching: ['Skin to other institutiob.'],
  },
  {
    input: `doesn${"'"}t`,
    matching: [
      `Type locality in Wilson and reeder doesn${"'"}t agree with my coordinates.`,
    ],
    notMatching: ['Skin to other institutiob.'],
  },
]
