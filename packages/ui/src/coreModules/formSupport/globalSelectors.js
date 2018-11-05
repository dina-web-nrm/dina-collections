import {
  getFormMeta,
  getFormSyncErrors,
  getFormAsyncErrors,
  getFormSubmitErrors,
  getFormValues,
  isDirty,
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

const getSectionIsDirty = (state, { formName, sectionName }) => {
  const getIsDirty = isDirty(formName)
  const sectionFieldNamesMap = selectors.getSectionFieldNamesMap(
    state.formSupport,
    {
      formName,
    }
  )

  const sectionFieldNames = sectionFieldNamesMap[sectionName]

  return getIsDirty(state, ...sectionFieldNames)
}

const getAnyFieldIsInvalid = (state, { fieldNames, formName }) => {
  const asyncErrors = getFormAsyncErrors(formName)(state)
  const formMeta = getFormMeta(formName)(state)
  const syncErrors = getFormSyncErrors(formName)(state)
  const submitErrors = getFormSubmitErrors(formName)(state)
  const formValues = getFormValues(formName)(state)

  for (let index = 0; index < fieldNames.length; index += 1) {
    const fieldName = fieldNames[index]
    const fieldNameParts = fieldName.split('.*.')

    if (fieldNameParts.length > 1) {
      const fieldArray = objectPath.get(formValues, fieldNameParts[0])

      if (fieldArray && fieldArray.length) {
        const fieldNamesWithIndex = fieldArray.map((_, fieldNameIndex) => {
          return fieldName.replace('.*.', `.${fieldNameIndex}.`)
        })

        const anyInvalidRelativeField = getAnyFieldIsInvalid(state, {
          fieldNames: fieldNamesWithIndex,
          formName,
        })

        if (anyInvalidRelativeField) {
          return true
        }
      }
    }

    const fieldMeta = objectPath.get(formMeta, fieldName)

    if (
      fieldMeta &&
      fieldMeta.touched &&
      (objectPath.get(syncErrors, fieldName) ||
        objectPath.get(asyncErrors, fieldName) ||
        objectPath.get(submitErrors, fieldName))
    ) {
      return true
    }
  }

  return false
}

const getSectionIsInvalid = (state, { formName, sectionName }) => {
  const sectionFieldNamesMap = selectors.getSectionFieldNamesMap(
    state.formSupport,
    {
      formName,
    }
  )

  const sectionFieldNames = sectionFieldNamesMap[sectionName]

  return getAnyFieldIsInvalid(state, {
    fieldNames: sectionFieldNames,
    formName,
  })
}

const getSectionsInValidStatus = (state, { formName, sectionSpecs }) => {
  return sectionSpecs.map(({ name: sectionName }) => {
    return getSectionIsInvalid(state, { formName, sectionName })
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
