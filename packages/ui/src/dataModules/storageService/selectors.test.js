import {
  getLocalState,
  getPhysicalObject,
  getPhysicalObjects,
  getResources,
  getStorageLocation,
  getStorageLocations,
  getStorageLocationsArray,
} from './selectors'

describe('dataModules/storageService/selectors', () => {
  let state

  beforeEach(() => {
    state = {
      resources: {
        physicalObjects: {
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
  it('returns physicalObject', () => {
    expect(getPhysicalObjects(state)).toEqual({
      a: { id: 'a' },
      b: { id: 'b' },
    })
  })
  it('returns physicalObject by id', () => {
    expect(getPhysicalObject(state, 'a')).toEqual({ id: 'a' })
  })
  it('returns storageLocations', () => {
    expect(getStorageLocations(state)).toEqual(state.resources.storageLocations)
  })
  it('returns storageLocation by id', () => {
    expect(getStorageLocation(state, 'd')).toEqual(
      state.resources.storageLocations.d
    )
  })
  it('returns storageLocations in array', () => {
    expect(getStorageLocationsArray(state)).toEqual([{ id: 'c' }, { id: 'd' }])
  })
})
