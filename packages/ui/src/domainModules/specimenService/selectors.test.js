import {
  getHasSpecimens,
  getLocalState,
  getResources,
  getSpecimen,
  getSpecimenFeatureObservations,
  getSpecimenIndividualGroup,
  getSpecimens,
} from './selectors'

describe('domainModules/specimenService/selectors', () => {
  let state

  beforeEach(() => {
    state = {
      resources: {
        specimens: {
          a: {
            id: 'a',
            individualGroup: {
              featureObservations: [
                {
                  featureObservationText: 'bearSkin',
                  featureObservationType: {
                    id: 'skin',
                  },
                },
              ],
            },
          },
          b: {
            id: 'b',
            individualGroup: {
              featureObservations: [
                {
                  featureObservationText: 'pandaSkin',
                  featureObservationType: {
                    id: 'skin',
                  },
                },
              ],
            },
          },
        },
      },
    }
  })

  it('returns local state', () => {
    const globalState = { specimenService: state }
    expect(getLocalState(globalState)).toEqual(state)
  })
  it('returns resources', () => {
    expect(getResources(state)).toEqual(state.resources)
  })
  it('returns specimens', () => {
    expect(getSpecimens(state)).toEqual(state.resources.specimens)
  })
  it('returns specimen by id', () => {
    expect(getSpecimen(state, 'a')).toEqual(state.resources.specimens.a)
  })
  it('returns specimen individualGroup by id', () => {
    expect(getSpecimenIndividualGroup(state, 'a')).toEqual(
      state.resources.specimens.a.individualGroup
    )
  })
  it('returns specimen individualGroup featureObservations by id', () => {
    expect(getSpecimenFeatureObservations(state, 'a')).toEqual(
      state.resources.specimens.a.individualGroup.featureObservations
    )
  })

  describe('getHasSpecimens', () => {
    it('returns true', () => {
      expect(getHasSpecimens(state)).toEqual(true)
    })
    it('returns false', () => {
      expect(getHasSpecimens({ resources: { specimens: {} } })).toEqual(false)
    })
  })
})
