import { createSelector } from 'reselect'

import {
  getLocalState as getCuratedListState,
  getFeatureTypes,
} from 'dataModules/curatedListService/selectors'
import {
  getLocalState as getSpecimenState,
  getSpecimen,
  getSpecimenReadOnly,
} from 'dataModules/specimenService/selectors'
import {
  getLocalState as getStorageState,
  getPhysicalObjects,
} from 'dataModules/storageService/selectors'

import wrapSelectors from 'utilities/wrapSelectors'
import transformInput from './components/MammalForm/transformations/input'
import * as selectors from './selectors'

const getFeatureTypesGlobal = state => {
  return getFeatureTypes(getCuratedListState(state))
}

const getInitialSpecimen = (state, specimenId) => {
  if (!specimenId) {
    return undefined
  }

  return getSpecimen(getSpecimenState(state), specimenId)
}

const getSpecimenReadOnlyGlobalSelector = (state, specimenId) => {
  return getSpecimenReadOnly(getSpecimenState(state), specimenId)
}

const getPhysicalObjectsGlobal = state => {
  return getPhysicalObjects(getStorageState(state))
}

const getMammalFormInitialValues = createSelector(
  [
    getFeatureTypesGlobal,
    getInitialSpecimen,
    getPhysicalObjectsGlobal,
    getSpecimenReadOnlyGlobalSelector,
  ],
  (featureTypes, specimen, physicalObjects, readOnly) => {
    return transformInput({
      featureTypes,
      physicalObjects,
      readOnly,
      specimen,
    })
  }
)

export default {
  ...wrapSelectors(selectors),
  getMammalFormInitialValues,
}
