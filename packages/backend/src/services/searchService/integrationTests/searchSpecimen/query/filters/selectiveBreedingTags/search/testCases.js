module.exports = [
  {
    expect: { count: 0 },

    filters: { tagValue: 'non-existing-tag' },
    title: `returns 0 matching for non existing tagValue`,
  },
  {
    expect: {
      count: 15,
    },
    filters: [
      {
        input: { tagTypes: ['unknown'] },
      },
    ],
    title: `returns 15 matches for tagType: unknown (origin)`,
  },
  {
    expect: {
      count: 1,
    },
    filters: [
      {
        input: { tagTypes: ['no'] },
      },
    ],
    title: `returns 1matches for tagType: no`,
  },
]
