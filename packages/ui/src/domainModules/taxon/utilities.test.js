import { mapTaxonNameToOption } from './utilities'

describe('domainModules/taxonService/utilities', () => {
  it('returns option', () => {
    const taxonName = {
      id: 'abc',
      name: 'Sorex minutus',
    }
    const option = {
      key: 'abc',
      text: 'Sorex minutus',
      value: 'abc',
    }
    expect(mapTaxonNameToOption(taxonName)).toEqual(option)
  })
})
