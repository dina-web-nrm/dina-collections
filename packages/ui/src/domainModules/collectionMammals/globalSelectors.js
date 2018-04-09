import { createSelector } from 'reselect'

import {
  getLocalState as getCuratedListState,
  getFeatureObservationTypes,
} from 'dataModules/curatedListService/selectors'
import {
  getLocalState as getSpecimenState,
  getSpecimen,
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

const getInitialSpecimen = (state, specimenId) => {
  if (!specimenId) {
    return {}
  }

  return getSpecimen(getSpecimenState(state), specimenId)
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
    getInitialSpecimen,
    getPhysicalUnitsGlobal,
    getSpecimenReadOnlyGlobalSelector,
  ],
  (featureObservationTypes, specimen, physicalUnits, readOnly) => {
    return transformInput({
      featureObservationTypes,
      physicalUnits,
      readOnly,
      specimen,
    })
  }
)

export default {
  ...wrapSelectors(selectors),
  getMammalFormInitialValues,
}
