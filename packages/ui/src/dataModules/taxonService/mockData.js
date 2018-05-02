/* eslint-disable sort-keys */
export const taxa = {
  data: [
    {
      id: '1',
      versionId: '1',
      parentVersionId: null,
    },
    {
      id: '2',
      versionId: '2',
      parentVersionId: '1',
    },
    {
      id: '3',
      versionId: '3',
      parentVersionId: '2',
    },
  ],
}

export const taxonNames = {
  data: [
    {
      id: '1',
      name: 'Mammalia',
      type: 'scientific',
      acceptedToTaxonVersionId: '1',
      vernacularToTaxonVersionId: null,
      rank: 'class',
      rubinNumber: '0000000',
    },
    {
      id: '2',
      name: 'Afrosoricida',
      type: 'scientific',
      acceptedToTaxonVersionId: '2',
      vernacularToTaxonVersionId: null,
      rank: 'order',
      rubinNumber: null,
    },
    {
      id: '3',
      name: 'Chrysochloridae',
      type: 'scientific',
      acceptedToTaxonVersionId: '3',
      vernacularToTaxonVersionId: null,
      rank: 'family',
      rubinNumber: null,
    },
  ],
}
