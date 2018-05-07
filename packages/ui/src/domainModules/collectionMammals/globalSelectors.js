import { createSelector } from 'reselect'
import crudSelectors from 'coreModules/crud/globalSelectors'
import coreToNested from 'common/es5/formatObject/coreToNested'

// import {
//   getLocalState as getCuratedListState,
//   getFeatureTypes,
// } from 'dataModules/curatedListService/selectors'
// import {
//   getLocalState as getSpecimenState,
//   getSpecimenReadOnly,
// } from 'dataModules/specimenService/selectors'
// import {
//   getLocalState as getStorageState,
//   getPhysicalObjects,
// } from 'dataModules/storageService/selectors'

import wrapSelectors from 'utilities/wrapSelectors'
import setDefaultValues from './components/MammalForm/transformations/input'
import * as selectors from './selectors'

const { getOne } = crudSelectors.specimen

// const getFeatureTypesGlobal = state => {
//   return getFeatureTypes(getCuratedListState(state))
// }

const getInitialSpecimen = (state, specimenId) => {
  if (!specimenId) {
    return undefined
  }
  return getOne(state, specimenId)
}

// const getSpecimenReadOnlyGlobalSelector = (state, specimenId) => {
//   return getSpecimenReadOnly(getSpecimenState(state), specimenId)
// }

// const getPhysicalObjectsGlobal = state => {
//   return getPhysicalObjects(getStorageState(state))
// }

const getMammalFormInitialValues = createSelector(
  [getInitialSpecimen],
  specimen => {
    const nestedFormatSpecimen = !specimen
      ? {}
      : coreToNested({
          item: specimen,
          type: 'specimen',
        })

    return setDefaultValues(nestedFormatSpecimen).individual
  }
)

export default {
  ...wrapSelectors(selectors),
  getMammalFormInitialValues,
}
