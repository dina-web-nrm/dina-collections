module.exports = [
  {
    expect: { count: 0 },

    filters: { tagValue: 'non-existing-tag' },
    title: `returns 0 matching for non existing tagValue`,
  },
  {
    expect: {
      count: 12,
    },
    filters: [
      {
        filterFunction: 'matchOtherPreparationTags',
        input: { tagTypes: ['no other preparation'] },
      },
    ],
    title: `returns 15 matches for tagType: no other preparation`,
  },
  {
    expect: {
      count: 4,
    },
    filters: [
      {
        filterFunction: 'matchOtherPreparationTags',
        input: { tagTypes: ['unspecified other preparation'] },
      },
    ],
    title: `returns 1 matches for tagType: unspecified other preparation`,
  },
]
