module.exports = [
  {
    expect: {
      count: 7,
      items: [
        'specimenRemarks',
        'collectingDateRemarks',
        'physicalObjectsRemarks',
        'aSinglePhysicalObjectRemarks',
        'deathRemarks',
        'collectingInformationRemarks',
        'taxonomyRemarks',
      ].map(tagType => {
        return {
          id: tagType,
        }
      }),
    },
    snapshot: true,
    title: 'returns all tag types',
  },
]
