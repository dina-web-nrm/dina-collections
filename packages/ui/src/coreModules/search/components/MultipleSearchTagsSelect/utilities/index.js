export function createOption({
  count,
  key,
  optionType,
  tagType,
  tagValue,
  text,
  value,
}) {
  return {
    key,
    other: {
      count,
      optionType,
      tagType,
      tagValue,
    },
    text,
    value,
  }
}

export function createOptions({
  addTagTypeToText,
  searchQuery,
  items,
  translateTagType,
}) {
  const itemOptions = items
    .map(({ attributes }) => {
      if (attributes) {
        const { count, key, tagText, tagType, tagValue } = attributes
        const tagTypeText = addTagTypeToText
          ? ` [${translateTagType(tagType)}]`
          : ''

        return createOption({
          count,
          key,
          optionType: 'tag',
          tagType,
          tagValue,
          text: `${tagText}${tagTypeText}`,
          value: key,
        })
      }

      return null
    })
    .filter(item => !!item)

  const freeTextOption = createOption({
    key: searchQuery,
    optionType: 'freeText',
    tagValue: searchQuery,
    text: `${searchQuery}`,
    value: searchQuery,
  })

  const options = [freeTextOption, ...itemOptions]
  return options
}

export function createReduxFormValues({
  hasMatchingTags = true,
  matchingTags,
  matchingTagsReachedLimit = false,
  prevReduxFormValues = {},
  searchOption,
  selected,
}) {
  const { key } = searchOption

  const newFieldValue = {
    hasMatchingTags,
    key,
    matchingTags: matchingTags.map(matchingTag => {
      if (selected === undefined) {
        return matchingTag
      }
      return {
        ...matchingTag,
        selected,
      }
    }),
    matchingTagsReachedLimit,
    searchOption,
  }

  return {
    ...prevReduxFormValues,
    [key]: newFieldValue,
  }
}

export function createMatchingTagFromItem(item) {
  const { attributes: { count, tagType, tagValue } = {}, id } = item
  return {
    attributes: {
      count,
      tagType,
      tagValue,
    },
    id,
  }
}

export function createMatchingTagsFromItems(items) {
  return items.map(createMatchingTagFromItem)
}

export function filterReduxFormValuesByExistingQueryStrings({
  reduxFormValues,
  queryStrings,
}) {
  return (
    reduxFormValues &&
    queryStrings.reduce((obj, queryString) => {
      obj[queryString] = reduxFormValues[queryString] // eslint-disable-line no-param-reassign
      return obj
    }, {})
  )
}

export function getOptionWasAdded({ queryStrings, reduxFormValues }) {
  return queryStrings.length > Object.keys(reduxFormValues || {}).length
}

export function getLastSearchOption({ queryStrings, options }) {
  const queryString = queryStrings[queryStrings.length - 1]

  const searchOption = options.find(option => {
    return option.key === queryString
  })
  if (!searchOption) {
    return null
  }
  return searchOption
}
