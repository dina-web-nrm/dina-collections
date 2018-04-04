import {
  getLocalState,
  getResources,
  getCatalogNumbers,
  getCatalogNumber,
} from './selectors'

describe('dataModules/identifierService/selectors', () => {
  let state

  beforeEach(() => {
    state = {
      resources: {
        catalogNumbers: {
          a: { id: 'a' },
          b: { id: 'b' },
        },
      },
    }
  })

  it('returns local state', () => {
    const globalState = { identifierService: state }
    expect(getLocalState(globalState)).toEqual(state)
  })
  it('returns resources', () => {
    expect(getResources(state)).toEqual(state.resources)
  })
  it('returns catalogNumbers', () => {
    expect(getCatalogNumbers(state)).toEqual(state.resources.catalogNumbers)
  })
  it('returns catalogNumber by id', () => {
    expect(getCatalogNumber(state, 'a')).toEqual(
      state.resources.catalogNumbers.a
    )
  })
})
