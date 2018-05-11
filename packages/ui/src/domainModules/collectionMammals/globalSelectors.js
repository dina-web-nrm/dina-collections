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

const getInitialSpecimen = (state, specimenId) => {
  if (!specimenId) {
    return undefined
  }
  return getOne(state, specimenId)
}

const getState = state => {
  return state
}

const getMammalFormInitialValues = createSelector(
  [getInitialSpecimen, getState],
  (specimen, state) => {
    const getItemByTypeId = (type, id) => {
      const getOneSelector = crudSelectors[type] && crudSelectors[type].getOne
      const getOneByLidSelector =
        crudSelectors[type] && crudSelectors[type].getOneByLid
      return (
        (getOneSelector && getOneSelector(state, id)) ||
        (getOneByLidSelector && getOneByLidSelector(state, id)) ||
        null
      )
    }

    const nestedFormatSpecimen = !specimen
      ? {}
      : coreToNested({
          getItemByTypeId,
          item: specimen,
          type: 'specimen',
        })
    return setDefaultValues({ specimen: nestedFormatSpecimen })
  }
)

export default {
  ...wrapSelectors(selectors),
  getMammalFormInitialValues,
}
