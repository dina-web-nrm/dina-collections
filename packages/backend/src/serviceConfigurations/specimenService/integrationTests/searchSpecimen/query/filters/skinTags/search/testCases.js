module.exports = [
  {
    expect: { count: 0 },

    filters: { tagValue: 'non-existing-appearance-tag' },
    title: `returns 0 matching for non existing tagValue`,
  },
]
