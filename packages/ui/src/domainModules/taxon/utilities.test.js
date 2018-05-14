import { mapTaxonNameToOption } from './utilities'

describe('domainModules/taxonService/utilities', () => {
  it('returns option', () => {
    const taxonName = {
      attributes: {
        name: 'Sorex minutus',
      },
      id: 'abc',
    }
    const option = {
      key: 'abc',
      text: 'Sorex minutus',
      value: 'abc',
    }
    expect(mapTaxonNameToOption(taxonName)).toEqual(option)
  })
})
