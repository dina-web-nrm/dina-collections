import objectPath from 'object-path'
import { createSelector } from 'reselect'
import { capitalizeFirstLetter } from 'common/es5/stringFormatters'
import getSecondArgument from 'utilities/getSecondArgument'

import {
  ALL_CUSTOM_SELECTOR_TYPES,
  SELECTOR_TYPE_GET_ALL_AS_OPTIONS,
} from '../../../constants'

const createGetAllAsOptionsSelector = ({
  customSelectorInput,
  resourceSelectors,
}) => {
  const {
    text: {
      doNotCapitalize,
      defaultLanguage,
      parameter: parameterPath,
      translated,
    },
  } = customSelectorInput

  return createSelector(
    [resourceSelectors.getAll, getSecondArgument],
    (items, currentLanguage) => {
      const mappedItems = items.map(item => {
        const { id, key } = item
        const parameter = objectPath.get(item, parameterPath)

        const text = translated
          ? parameter[currentLanguage] || parameter[defaultLanguage] || key
          : parameter

        return {
          key: id,
          text: doNotCapitalize ? text : capitalizeFirstLetter(text),
          value: id,
        }
      })

      return mappedItems
    }
  )
}

const createCustomSelector = ({ customSelectorInput, resourceSelectors }) => {
  const { type } = customSelectorInput

  if (!ALL_CUSTOM_SELECTOR_TYPES.includes(type)) {
    throw new Error(`Unknown custom selector type: ${type}`)
  }

  let selector
  let key

  switch (type) {
    case SELECTOR_TYPE_GET_ALL_AS_OPTIONS: {
      selector = createGetAllAsOptionsSelector({
        customSelectorInput,
        resourceSelectors,
      })
      key = SELECTOR_TYPE_GET_ALL_AS_OPTIONS
      break
    }
    default: {
      throw new Error(`Custom selector with type: ${type} is not implemented`)
    }
  }

  return {
    key,
    selector,
  }
}

export default function createCustomSelectors(
  { customSelectorsInput = [], resourceSelectors } = {}
) {
  return customSelectorsInput.reduce((customSelectors, customSelectorInput) => {
    const { selector, key } = createCustomSelector({
      customSelectorInput,
      resourceSelectors,
    })

    return {
      ...customSelectors,
      [key]: selector,
    }
  }, {})
}
