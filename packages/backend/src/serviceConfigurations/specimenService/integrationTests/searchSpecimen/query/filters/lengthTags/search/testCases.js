module.exports = [
  {
    expect: {
      count: 2,
      items: [{ catalogNumber: '825005' }, { catalogNumber: '628009' }],
    },
    filters: [
      {
        input: {
          value: {
            max: 1000,
            min: 0,
            rangeUnit: 'unspecified',
            tagType: 'total-length',
          },
        },
      },
    ],
    title: `returns 2 match for total-length between 0 and 1000 for unspecified range unit`,
  },
]
