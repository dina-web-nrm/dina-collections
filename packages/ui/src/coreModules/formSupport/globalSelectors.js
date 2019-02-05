import {
  getFormMeta,
  getFormSyncErrors,
  getFormAsyncErrors,
  getFormSubmitErrors,
  getFormValues,
  isDirty,
} from 'redux-form'
import objectPath from 'object-path'
import { isEmpty, isEqual } from 'lodash'

import wrapSelectors from 'utilities/wrapSelectors'

import { globalSelectors as formSupportKeyObjectSelectors } from 'coreModules/formSupport/keyObjectModule'

import * as selectors from './selectors'

const getInitiallyHiddenFieldsHaveValue = (
  state,
  {
    baseValues = {},
    compareInitiallyHiddenWithBaseValues,
    formName,
    formValueSelector,
    unit,
  }
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
    const fieldName = initiallyHiddenFieldNames[index]
    const value = formValueSelector(state, fieldName)
    const initialValue = objectPath.get(baseValues, fieldName)

    const valueIsEmpty =
      (!value && value !== 0) || (typeof value === 'object' && isEmpty(value))
    const hasValue = !valueIsEmpty

    if (hasValue) {
      if (
        !compareInitiallyHiddenWithBaseValues ||
        (compareInitiallyHiddenWithBaseValues && !isEqual(initialValue, value))
      ) {
        return true
      }
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

const getAnyFieldIsInvalid = (
  state,
  { fieldNames, formName, requireTouched = true }
) => {
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
          requireTouched,
        })

        if (anyInvalidRelativeField) {
          return true
        }
      }
    }

    const fieldMeta = objectPath.get(formMeta, fieldName)

    const hasErrors =
      objectPath.get(syncErrors, fieldName) ||
      objectPath.get(asyncErrors, fieldName) ||
      objectPath.get(submitErrors, fieldName)

    if (hasErrors) {
      if (!requireTouched) {
        return true
      }
      const isTouched = fieldMeta && fieldMeta.touched
      if (requireTouched && isTouched) {
        return true
      }
    }
  }

  return false
}

const getSectionIsInvalid = (state, { formName, sectionName }) => {
  const sectionInvalidStatus = formSupportKeyObjectSelectors.get[
    'sectionNavigation.:formName.sectionInvalidStatus'
  ](state, { formName })

  if (!sectionInvalidStatus) {
    return false
  }

  return sectionInvalidStatus[sectionName]
}

const computeSectionIsInvalid = (
  state,
  { formName, requireTouched, sectionName } = {}
) => {
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
    requireTouched,
  })
}

const getSectionsInValidStatus = (state, { formName, sectionSpecs }) => {
  return sectionSpecs.map(({ name: sectionName }) => {
    return computeSectionIsInvalid(state, { formName, sectionName })
  })
}

export default {
  ...wrapSelectors(selectors),
  computeSectionIsInvalid,
  getAnyFieldIsInvalid,
  getInitiallyHiddenFieldsHaveValue,
  getSectionIsDirty,
  getSectionIsInvalid,
  getSectionsInValidStatus,
}
