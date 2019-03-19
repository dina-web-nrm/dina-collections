module.exports = [
  {
    expect: {
      count: 1,
      items: [{ catalogNumber: '985729' }],
    },
    filters: [
      {
        input: {
          value: {
            max: 11,
            min: 10,
            rangeUnit: 'unspecified',
            tagType: 'complete-body-weight',
          },
        },
      },
    ],
    title: `returns 1 match for complete-body-weight between 10 and 11 for unspecified range unit`,
  },
  {
    expect: {
      count: 1,
      items: [{ catalogNumber: '956051' }],
    },
    filters: [
      {
        input: {
          value: {
            max: 10000,
            rangeUnit: 'unspecified',
            tagType: 'unknown-weight-type',
          },
        },
      },
    ],
    title: `returns 1 match for unknown-weight-type below 10000 for unspecified range unit`,
  },
  {
    expect: {
      count: 0,
    },
    filters: [
      {
        input: {
          value: {
            max: 11,
            min: 10,
            rangeUnit: 'cm',
            tagType: 'complete-body-weight',
          },
        },
      },
    ],
    title: `returns 0 match for complete-body-weight between 10 and 11 for cm range unit`,
  },
]
