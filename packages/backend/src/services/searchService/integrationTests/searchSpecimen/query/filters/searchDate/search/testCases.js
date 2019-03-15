module.exports = [
  {
    expect: {
      count: 3,
    },
    filters: [{ input: { value: { start: '1989-12-31T23:00:00.000Z' } } }],
    title: `returns 3 matching after 1989-12-31`,
  },
  {
    expect: {
      count: 1,
    },
    filters: [{ input: { value: { end: '1800-01-01T22:47:47.999Z' } } }],
    title: `returns 1 matching before 1800`,
  },
  {
    expect: {
      count: 3,
    },
    filters: [
      {
        input: {
          value: {
            end: '1998-12-31T22:59:59.999Z',
            start: '1993-12-31T23:00:00.000Z',
          },
        },
      },
    ],
    title: `returns 3 matching between 1994 and 1998`,
  },
  {
    expect: {
      count: 0,
    },
    filters: [
      {
        input: {
          value: {
            invalid: true,
          },
        },
      },
    ],
    title: `returns 0 matching if invalid`,
  },
]
