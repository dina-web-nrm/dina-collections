/* eslint-disable sort-keys */
export const taxa = {
  data: [
    {
      id: '1',
      versionId: '1',
      parentId: null,
    },
    {
      id: '2',
      versionId: '2',
      parentId: '1',
    },
    {
      id: '3',
      versionId: '3',
      parentId: '2',
    },
  ],
}

export const taxonNames = {
  data: [
    {
      id: '1',
      name: 'Mammalia',
      type: 'scientific',
      acceptedToTaxonId: '1',
      vernacularToTaxonId: null,
      rank: 'class',
      rubinNumber: '0000000',
    },
    {
      id: '2',
      name: 'Afrosoricida',
      type: 'scientific',
      acceptedToTaxonId: '2',
      vernacularToTaxonId: null,
      rank: 'order',
      rubinNumber: null,
    },
    {
      id: '3',
      name: 'Chrysochloridae',
      type: 'scientific',
      acceptedToTaxonId: '3',
      vernacularToTaxonId: null,
      rank: 'family',
      rubinNumber: null,
    },
  ],
}
