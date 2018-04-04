import {
  getLocalState,
  getResources,
  getPhysicalUnits,
  getStorageLocations,
  getPhysicalUnit,
  getStorageLocation,
} from './selectors'

describe('dataModules/storageService/selectors', () => {
  let state

  beforeEach(() => {
    state = {
      resources: {
        physicalUnits: {
          a: { id: 'a' },
          b: { id: 'b' },
        },
        storageLocations: {
          c: { id: 'c' },
          d: { id: 'd' },
        },
      },
    }
  })

  it('returns local state', () => {
    const globalState = { storageService: state }
    expect(getLocalState(globalState)).toEqual(state)
  })
  it('returns resources', () => {
    expect(getResources(state)).toEqual(state.resources)
  })
  it('returns physicalUnits', () => {
    expect(getPhysicalUnits(state)).toEqual(state.resources.physicalUnits)
  })
  it('returns physicalUnit by id', () => {
    expect(getPhysicalUnit(state, 'a')).toEqual(state.resources.physicalUnits.a)
  })
  it('returns storageLocations', () => {
    expect(getStorageLocations(state)).toEqual(state.resources.storageLocations)
  })
  it('returns storageLocation by id', () => {
    expect(getStorageLocation(state, 'd')).toEqual(
      state.resources.storageLocations.d
    )
  })
})
