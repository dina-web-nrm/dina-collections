import { mapTaxonToOption } from './utilities'

describe('dataModules/taxonService/utilities', () => {
  it('returns option', () => {
    const taxon = {
      id: 'abc',
      scientificName: 'Sorex minutus',
    }
    const option = {
      key: 'abc',
      text: 'Sorex minutus',
      value: 'abc',
    }
    expect(mapTaxonToOption(taxon)).toEqual(option)
  })
})
