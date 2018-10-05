import {
  isDirty,
  getFormSyncErrors,
  getFormAsyncErrors,
  getFormSubmitErrors,
} from 'redux-form'
import objectPath from 'object-path'
import { isEmpty } from 'lodash'

import wrapSelectors from 'utilities/wrapSelectors'
import * as selectors from './selectors'

const getInitiallyHiddenFieldsHaveValue = (
  state,
  { formName, formValueSelector, unit }
) => {
  const initiallyHiddenFieldNames = selectors.getUnitInitiallyHiddenFieldNames(
    state.formSupport,
    {
      formName,
      unit,
    }
  )

  if (!initiallyHiddenFieldNames) {
    return undefined
  }

  for (let index = 0; index < initiallyHiddenFieldNames.length; index += 1) {
    const value = formValueSelector(state, initiallyHiddenFieldNames[index])

    const valueIsEmpty =
      (!value && value !== 0) || (typeof value === 'object' && isEmpty(value))

    if (!valueIsEmpty) {
      return true
    }
  }

  return false
}

const getSectionIsDirty = (state, { formName, section }) => {
  const getIsDirty = isDirty(formName)
  const sectionFieldNamesMap = selectors.getSectionFieldNamesMap(
    state.formSupport,
    {
      formName,
      section,
    }
  )

  const sectionFieldNames = sectionFieldNamesMap[section]

  return getIsDirty(state, ...sectionFieldNames)
}

const getAnyFieldIsInvalid = (state, { formName, fieldNames }) => {
  const syncErrors = getFormSyncErrors(formName)(state)
  const asyncErrors = getFormAsyncErrors(formName)(state)
  const submitErrors = getFormSubmitErrors(formName)(state)

  for (let index = 0; index < fieldNames.length; index += 1) {
    if (
      objectPath.get(syncErrors, fieldNames[index]) ||
      objectPath.get(asyncErrors, fieldNames[index]) ||
      objectPath.get(submitErrors, fieldNames[index])
    ) {
      return true
    }
  }

  return false
}

const getSectionIsInvalid = (state, { formName, section }) => {
  const sectionFieldNamesMap = selectors.getSectionFieldNamesMap(
    state.formSupport,
    {
      formName,
      section,
    }
  )

  const sectionFieldNames = sectionFieldNamesMap[section]

  return getAnyFieldIsInvalid(state, {
    fieldNames: sectionFieldNames,
    formName,
  })
}

const getSectionsInValidStatus = (state, { formName, sectionSpecs }) => {
  return sectionSpecs.map(({ name: section }) => {
    return getSectionIsInvalid(state, { formName, section })
  })
}

export default {
  ...wrapSelectors(selectors),
  getAnyFieldIsInvalid,
  getInitiallyHiddenFieldsHaveValue,
  getSectionIsDirty,
  getSectionIsInvalid,
  getSectionsInValidStatus,
}
