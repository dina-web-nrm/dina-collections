module.exports = [
  {
    expect: {
      count: 35,
    },
    title: 'returns all aggregated identifiers',
  },
  {
    expect: {
      count: 16,
    },
    filters: {
      tagTypes: ['catalog-no'],
    },
    title: 'returns all aggregated catalog-no identifiers',
  },
  {
    expect: {
      count: 9,
    },
    filters: { tagTypes: ['old-skeleton-no'] },
    title: 'returns all aggregated old-skeleton-no identifiers',
  },
  {
    expect: {
      count: 7,
    },
    filters: { tagTypes: ['old-skin-no'] },
    title: 'returns all aggregated old-skin-no identifiers',
  },
  {
    expect: {
      count: 2,
    },
    filters: { tagTypes: ['sva-no'] },
    title: 'returns all aggregated sva-no identifiers',
  },
  {
    expect: {
      count: 1,
    },
    filters: { tagTypes: ['loan-no'] },
    title: 'returns all aggregated loan-no identifiers',
  },
  {
    expect: {
      count: 3,
    },
    filters: { tagTypes: ['loan-no', 'sva-no'] },
    title: 'returns all aggregated loan-no and sva-no identifiers',
  },
]
