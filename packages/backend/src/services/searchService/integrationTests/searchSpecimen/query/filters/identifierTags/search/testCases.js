module.exports = [
  {
    expect: { count: 0 },

    filters: { tagValue: 'non-existing-identifier' },
    title: `returns 0 matching for non existing tagValue`,
  },
  {
    expect: {
      count: 1,
      items: [{ catalogNumber: '500001' }],
    },
    filters: [{ input: { tagValue: '500001' } }],
    title: `returns 1 matching for 1 existing matching tagValue`,
  },
]
