import { createSelector } from 'reselect'

import {
  reduceFieldSpecsToSectionFieldNamesMap,
  reduceFieldSpecsToUnitFieldNamesMap,
} from './utilities'

export const getLocalState = state => state.formSupport

export const getFormSpec = (state, { formName }) => {
  return state[formName]
}

export const getSectionFieldNamesMap = createSelector(getFormSpec, formSpec => {
  return reduceFieldSpecsToSectionFieldNamesMap(Object.values(formSpec))
})

export const getUnitFieldNamesMap = createSelector(getFormSpec, formSpec => {
  return reduceFieldSpecsToUnitFieldNamesMap(Object.values(formSpec))
})

export const getUnitInitiallyHiddenFieldNamesMap = createSelector(
  getFormSpec,
  formSpec => {
    const initiallyHiddenFields = Object.values(formSpec).filter(
      ({ initiallyHidden }) => initiallyHidden
    )

    return reduceFieldSpecsToUnitFieldNamesMap(initiallyHiddenFields)
  }
)

export const getUnitInitiallyHiddenFieldNames = (state, { formName, unit }) => {
  const unitInitiallyHiddenFieldNamesMap = getUnitInitiallyHiddenFieldNamesMap(
    state,
    { formName }
  )
  return unitInitiallyHiddenFieldNamesMap[unit]
}
