import { createSelector } from 'reselect'
import crudSelectors from 'coreModules/crud/globalSelectors'
import toNestedFormat from 'common/es5/formatObject/toNestedFormat'

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
// import transformInput from './components/MammalForm/transformations/input'
import * as selectors from './selectors'

const { getOne } = crudSelectors.specimen

const getFeatureTypesGlobal = state => {
  return getFeatureTypes(getCuratedListState(state))
}

const getInitialSpecimen = (state, specimenId) => {
  if (!specimenId) {
    return undefined
  }
  return getOne(state, specimenId)
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
    if (!specimen) {
      return {
        determinations: [{}],
        identifiers: [
          {
            identifierType: {
              id: '1',
            },
            nameSpace: '',
            publishRecord: false,
            remarks: '',
            value: '',
          },
        ],
        recordHistoryEvents: [],
      }
    }

    const nestedFormatSpecimen = toNestedFormat({
      item: specimen,
      type: 'specimen',
    })

    return nestedFormatSpecimen.individual
  }
)

export default {
  ...wrapSelectors(selectors),
  getMammalFormInitialValues,
}
