import { createSelector } from 'reselect'

import {
  getLocalState as getCuratedListState,
  getFeatureObservationTypes,
} from 'domainModules/curatedListService/selectors'
import {
  getLocalState as getSpecimenState,
  getSpecimenIndividualGroup,
} from 'domainModules/specimenService/selectors'
import {
  getLocalState as getStorageState,
  getPhysicalUnits,
} from 'domainModules/storageService/selectors'

import wrapSelectors from 'utilities/wrapSelectors'
import transformInput from './components/MammalForm/transformations/input'
import * as selectors from './selectors'

const getUpdateSpecimenInitialValues = createSelector(
  state => getFeatureObservationTypes(getCuratedListState(state)),
  (state, specimenId) =>
    getSpecimenIndividualGroup(getSpecimenState(state), specimenId),
  state => getPhysicalUnits(getStorageState(state)),
  (featureObservationTypes, individualGroup, physicalUnits) => {
    return transformInput({
      featureObservationTypes,
      individualGroup,
      physicalUnits,
    })
  }
)

export default {
  ...wrapSelectors(selectors),
  getUpdateSpecimenInitialValues,
}
