import { createSelector } from 'reselect'

import {
  getLocalState as getCuratedListState,
  getFeatureObservationTypes,
} from 'dataModules/curatedListService/selectors'
import {
  getLocalState as getSpecimenState,
  getSpecimenIndividualGroup,
  getSpecimenReadOnly,
} from 'dataModules/specimenService/selectors'
import {
  getLocalState as getStorageState,
  getPhysicalUnits,
} from 'dataModules/storageService/selectors'

import wrapSelectors from 'utilities/wrapSelectors'
import transformInput from './components/MammalForm/transformations/input'
import * as selectors from './selectors'

const getFeatureObservationTypesGlobal = state => {
  return getFeatureObservationTypes(getCuratedListState(state))
}

const getInitialIndividualGroup = (state, specimenId) => {
  if (!specimenId) {
    return {}
  }

  return getSpecimenIndividualGroup(getSpecimenState(state), specimenId)
}

const getSpecimenReadOnlyGlobalSelector = (state, specimenId) => {
  return getSpecimenReadOnly(getSpecimenState(state), specimenId)
}

const getPhysicalUnitsGlobal = state => {
  return getPhysicalUnits(getStorageState(state))
}

const getMammalFormInitialValues = createSelector(
  [
    getFeatureObservationTypesGlobal,
    getInitialIndividualGroup,
    getPhysicalUnitsGlobal,
    getSpecimenReadOnlyGlobalSelector,
  ],
  (featureObservationTypes, individualGroup, physicalUnits, readOnly) => {
    return transformInput({
      featureObservationTypes,
      individualGroup,
      physicalUnits,
      readOnly,
    })
  }
)

export default {
  ...wrapSelectors(selectors),
  getMammalFormInitialValues,
}
