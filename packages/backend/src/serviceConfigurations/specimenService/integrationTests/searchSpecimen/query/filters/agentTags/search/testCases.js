module.exports = [
  {
    expect: { count: 0 },

    filters: { tagValue: 'non-existing-agent' },
    title: `returns 0 matching for non existing tagValue`,
  },
  {
    expect: {
      count: 1,
      items: [{ catalogNumber: '583124' }],
    },
    filters: [{ input: { tagValue: 'bergman' } }],
    title: `returns 1 matching for 1 existing matching tagValue`,
  },
]
