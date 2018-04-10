import {
  getHasSpecimens,
  getLocalState,
  getResources,
  getSpecimen,
  getSpecimenFeatureObservations,
  getSpecimenIndividual,
  getSpecimens,
} from './selectors'

describe('dataModules/specimenService/selectors', () => {
  let state

  beforeEach(() => {
    state = {
      resources: {
        specimens: {
          a: {
            id: 'a',
            individual: {
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
            individual: {
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
  it('returns specimen individual by id', () => {
    expect(getSpecimenIndividual(state, 'a')).toEqual(
      state.resources.specimens.a.individual
    )
  })
  it('returns specimen individual featureObservations by id', () => {
    expect(getSpecimenFeatureObservations(state, 'a')).toEqual(
      state.resources.specimens.a.individual.featureObservations
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
