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

  return initiallyHiddenFieldNames.reduce((hasValue, fieldName) => {
    if (hasValue) {
      return true
    }

    const value = formValueSelector(state, fieldName)

    if (
      (!value && value !== 0) ||
      (typeof value === 'object' && isEmpty(value))
    ) {
      return false
    }

    return true
  }, false)
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

  const isInvalid = fieldNames.reduce((hasInvalidValue, fieldName) => {
    if (hasInvalidValue) {
      return true
    }

    return !!(
      objectPath.get(syncErrors, fieldName) ||
      objectPath.get(asyncErrors, fieldName) ||
      objectPath.get(submitErrors, fieldName)
    )
  }, false)

  return isInvalid
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
