module.exports = [
  // catalog-no
  {
    expect: {
      allItems: {
        tagType: 'catalog-no',
      },
      count: 0,
    },
    filters: {
      tagTypes: ['catalog-no'],
      tagValue: '11111',
    },
    title:
      'returns 0 matching catalog-no identifiers for non existing tagValue',
  },
  {
    expect: {
      allItems: {
        tagType: 'catalog-no',
      },
      count: 7,
    },
    filters: {
      tagTypes: ['catalog-no'],
      tagValue: '5*',
    },
    title: 'returns 7 matching identifiers for 5*',
  },
  {
    expect: {
      allItems: {
        tagType: 'catalog-no',
      },
      count: 1,
    },
    filters: {
      tagTypes: ['catalog-no'],
      tagValue: '500001',
    },
    title: 'returns 1 matching identifiers for 500001',
  },

  // old-skeleton-no

  {
    expect: {
      allItems: {
        tagType: 'old-skeleton-no',
      },
      count: 0,
    },
    filters: {
      tagTypes: ['old-skeleton-no'],
      tagValue: '11111',
    },
    title:
      'returns 0 matching old-skeleton-no identifiers for non existing tagValue',
  },
  {
    expect: {
      allItems: {
        tagType: 'old-skeleton-no',
      },
      count: 1,
    },
    filters: {
      tagTypes: ['old-skeleton-no'],
      tagValue: '5*',
    },
    title: 'returns 1 matching identifiers for 1*',
  },
  {
    expect: {
      allItems: {
        tagType: 'old-skeleton-no',
      },
      count: 1,
    },
    filters: {
      tagTypes: ['old-skeleton-no'],
      tagValue: '1,285',
    },
    title: 'returns 1 matching identifiers for 1,285',
  },

  // old-skin-no
  {
    expect: {
      allItems: {
        tagType: 'old-skin-no',
      },
      count: 0,
    },
    filters: {
      tagTypes: ['old-skin-no'],
      tagValue: '11111',
    },
    title:
      'returns 0 matching old-skin-no identifiers for non existing tagValue',
  },
  {
    expect: {
      allItems: {
        tagType: 'old-skin-no',
      },
      count: 2,
    },
    filters: {
      tagTypes: ['old-skin-no'],
      tagValue: '1*',
    },
    title: 'returns 2 matching identifiers for 1*',
  },
  {
    expect: {
      allItems: {
        tagType: 'old-skin-no',
      },
      count: 1,
    },
    filters: {
      tagTypes: ['old-skin-no'],
      tagValue: '1; 4406; 52',
    },
    title: 'returns 1 matching identifiers for 1; 4406; 52',
  },

  // sva-no
  {
    expect: {
      allItems: {
        tagType: 'sva-no',
      },
      count: 0,
    },
    filters: {
      tagTypes: ['sva-no'],
      tagValue: '11111',
    },
    title: 'returns 0 matching sva-no identifiers for non existing tagValue',
  },
  {
    expect: {
      allItems: {
        tagType: 'sva-no',
      },
      count: 2,
    },
    filters: {
      tagTypes: ['sva-no'],
      tagValue: 'v0*',
    },
    title: 'returns 2 matching identifiers for 5*',
  },
  {
    expect: {
      allItems: {
        tagType: 'sva-no',
      },
      count: 1,
    },
    filters: {
      tagTypes: ['sva-no'],
      tagValue: 'v0253/98',
    },
    title: 'returns 1 matching identifiers for v0253/98',
  },

  // loan-no
  {
    expect: { count: 0 },
    filters: {
      tagTypes: ['loan-no'],
      tagValue: '11111',
    },
    title: 'returns 0 matching loan-no identifiers for non existing tagValue',
  },
  {
    expect: {
      allItems: {
        tagType: 'loan-no',
      },
      count: 1,
    },
    filters: {
      tagTypes: ['loan-no'],
      tagValue: '20*',
    },
    title: 'returns 1 matching identifiers for 20*',
  },
  {
    expect: {
      allItems: {
        tagType: 'loan-no',
      },
      count: 1,
    },
    filters: {
      tagTypes: ['loan-no'],
      tagValue: '2012-21',
    },

    title: 'returns 1 matching identifiers for 2012-21',
  },
]
