module.exports = [
  {
    expect: { count: 0 },

    filters: { tagValue: 'non-existing-appearance-tag' },
    title: `returns 0 matching for non existing tagValue`,
  },
  {
    expect: {
      count: 15,
    },
    filters: [
      {
        filterFunction: 'matchAppearanceTags',
        input: { tagTypes: ['unknown (origin)'] },
      },
    ],
    title: `returns 15 matches for matchAppearanceTags: unknown (origin)`,
  },
  {
    expect: {
      count: 1,
    },
    filters: [
      {
        filterFunction: 'matchAppearanceTags',
        input: { tagTypes: ['wild and native (origin)'] },
      },
    ],
    title: `returns 1 matches for matchAppearanceTags: wild and native (origin)`,
  },
]
