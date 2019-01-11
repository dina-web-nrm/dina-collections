/* eslint-disable class-methods-use-this */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import objectPath from 'object-path'
import { Button } from 'semantic-ui-react'
import { debounce } from 'lodash'

import { MultipleSearchSelectionDropdown } from 'coreModules/form/components'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import { createInjectSearch } from 'coreModules/search/higherOrderComponents'
import RefineTagSelection from './RefineTagSelection'
import * as selectors from './selectors'

const propTypes = {
  addTagTypeToText: PropTypes.bool,
  buildLocalAggregationQuery: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  inlineRefine: PropTypes.bool,
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.objectOf(
        PropTypes.shape({
          key: PropTypes.string.isRequired,
          matchingTags: PropTypes.array.isRequired,
          searchOption: PropTypes.object.isRequired,
        }).isRequired
      ).isRequired,
      PropTypes.string.isRequired,
    ]).isRequired,
  }).isRequired,

  search: PropTypes.func.isRequired,
}
const defaultProps = {
  addTagTypeToText: true,
  inlineRefine: false,
}

class RawMultipleSearchTagsSelect extends PureComponent {
  constructor(props) {
    super(props)
    this.getItemsForSearchQuery = this.getItemsForSearchQuery.bind(this)
    this.setSearchQueryResultsSelected = this.setSearchQueryResultsSelected.bind(
      this
    )
    this.handleGetSearchQuery = this.handleGetSearchQuery.bind(this)
    this.handleCloseRefine = this.handleCloseRefine.bind(this)
    this.handleOpenRefine = this.handleOpenRefine.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSelectSearchQueries = this.handleSelectSearchQueries.bind(this)
    this.handleSelectAllForSearchQuery = this.handleSelectAllForSearchQuery.bind(
      this
    )

    this.getSelectedOptions = this.getSelectedOptions.bind(this)

    this.handleDeselectAllForSearchQuery = this.handleDeselectAllForSearchQuery.bind(
      this
    )
    this.handleToggleTagSelected = this.handleToggleTagSelected.bind(this)

    this.state = {
      options: [],
      refineOpen: false,
      searchQuery: '',
    }

    this.debouncedGetItemsForSearchQuery = debounce(
      searchQuery => {
        return this.getItemsForSearchQuery({
          tagValue: searchQuery,
        }).then(items => {
          const options = this.createOptions({
            items,
            searchQuery,
          })

          this.setState({
            options,
          })
        })
      },
      400,
      {
        maxWait: 800,
      }
    )
  }

  componentWillUnmount() {
    this.debouncedGetItemsForSearchQuery.cancel()
  }

  getItemsForSearchQuery({ exact, tagType, tagValue, limit = 10 }) {
    const query = this.props.buildLocalAggregationQuery({
      input: {
        exact,
        limit,
        tagType,
        tagValue,
      },
    })
    query.limit = limit
    return this.props.search(query).then(items => {
      return items
    })
  }

  setSearchQueryResultsSelected(searchQuery, selected = true) {
    const reduxFormValues = this.props.input.value
    const reduxFormValue = objectPath.get(reduxFormValues, searchQuery)
    if (reduxFormValue) {
      const { matchingTags, searchOption } = reduxFormValue

      const updatedReduxFormValues = this.createReduxFormValues({
        matchingTags,
        prevReduxFormValues: reduxFormValues,
        searchOption,
        selected,
      })

      this.props.input.onChange(updatedReduxFormValues)
    }
  }

  getSelectedOptions(_, queryStrings) {
    const selectedOptions = queryStrings.map(key => {
      return this.props.input.value[key].searchOption
    })
    return selectedOptions
  }

  handleGetSearchQuery() {
    return this.state.searchQuery
  }

  handleCloseRefine() {
    this.setState({
      refineOpen: false,
    })
  }

  handleOpenRefine() {
    this.setState({
      refineOpen: true,
    })
  }

  handleSearchChange(input) {
    const { searchQuery } = input
    this.setState({
      searchQuery,
    })

    if (!searchQuery) {
      return this.setState({
        options: [],
        searchQuery,
      })
    }

    return this.debouncedGetItemsForSearchQuery(searchQuery)
  }

  handleSelectSearchQueries(queryStrings) {
    if (!queryStrings.length) {
      this.props.input.onChange({})
    }

    const { value: prevReduxFormValues } = this.props.input
    if (queryStrings.length > Object.keys(prevReduxFormValues || {}).length) {
      const queryString = queryStrings[queryStrings.length - 1]
      const searchOption = this.state.options.find(option => {
        return option.key === queryString
      })
      const { key } = searchOption
      const { tagType, tagValue } = searchOption.other
      return this.getItemsForSearchQuery({
        exact: !!(tagType && key),
        limit: 1000,
        tagType,
        tagValue,
      }).then(items => {
        const newReduxFormValues = this.createReduxFormValues({
          matchingTags: items,
          prevReduxFormValues,
          searchOption,
          selected: true,
        })

        return this.props.input.onChange(newReduxFormValues)
      })
    }

    const newTags =
      prevReduxFormValues &&
      queryStrings.reduce((obj, queryString) => {
        obj[queryString] = prevReduxFormValues[queryString] // eslint-disable-line no-param-reassign
        return obj
      }, {})

    return this.props.input.onChange(newTags)
  }

  handleSelectAllForSearchQuery(searchQuery) {
    this.setSearchQueryResultsSelected(searchQuery, true)
  }

  handleDeselectAllForSearchQuery(searchQuery) {
    this.setSearchQueryResultsSelected(searchQuery, false)
  }

  handleToggleTagSelected({ searchQuery, id }) {
    const reduxFormValues = this.props.input.value
    const reduxFormValue = objectPath.get(reduxFormValues, searchQuery)
    if (reduxFormValue) {
      const { matchingTags, searchOption } = reduxFormValue

      const updatedReduxFormValues = this.createReduxFormValues({
        matchingTags: matchingTags.map(tag => {
          if (tag.id !== id) {
            return tag
          }

          return {
            ...tag,
            selected: !tag.selected,
          }
        }),
        prevReduxFormValues: reduxFormValues,
        searchOption,
      })

      this.props.input.onChange(updatedReduxFormValues)
    }
  }

  createOptions({ searchQuery, items }) {
    const { addTagTypeToText } = this.props
    const itemOptions = items
      .map(({ attributes }) => {
        if (attributes) {
          const { key, tagType, tagValue } = attributes
          const tagTypeText = addTagTypeToText ? ` [${tagType}] ` : ' '
          return {
            key,
            other: {
              tagType,
              tagValue,
            },
            text: `${tagValue}${tagTypeText}`,

            type: 'string',
            value: key,
          }
        }

        return null
      })
      .filter(item => !!item)
    const freeTextOption = {
      key: searchQuery,
      other: {
        tagValue: searchQuery,
      },
      text: `${searchQuery}`,
      type: 'string',
      value: searchQuery,
    }

    const options = [freeTextOption, ...itemOptions]
    return options
  }

  createReduxFormValues({
    matchingTags,
    prevReduxFormValues = {},
    searchOption,
    selected,
  }) {
    const { key } = searchOption

    const newFieldValue = {
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
      searchOption,
    }

    return {
      ...prevReduxFormValues,
      [key]: newFieldValue,
    }
  }

  render() {
    const {
      addTagTypeToText,
      i18n: { moduleTranslate },
      inlineRefine,
      input,
      ...rest
    } = this.props

    const { refineOpen, options } = this.state
    const { value: reduxFormValues } = input

    const patchedInput = {
      ...input,
      onBlur: this.handleSelectSearchQueries,
      value: Object.keys(reduxFormValues || {}),
    }

    const numberOfSearchResults = selectors.getNumberOfSearchResults(
      reduxFormValues
    )
    const numberOfSelectedResults = selectors.getNumberOfSelectedResults(
      reduxFormValues
    )

    return (
      <React.Fragment>
        <MultipleSearchSelectionDropdown
          {...rest}
          enableHelpNotifications={false}
          getOptions={() => {
            return options
          }}
          getSearchQuery={this.handleGetSearchQuery}
          getSelectedOptions={this.getSelectedOptions}
          icon="search"
          input={patchedInput}
          noResultsMessage={moduleTranslate({
            textKey: 'typeQueryAndPressEnter',
          })}
          onSearchChange={this.handleSearchChange}
          rightButton={
            <Button
              disabled={!reduxFormValues}
              onClick={
                refineOpen ? this.handleCloseRefine : this.handleOpenRefine
              }
            >
              {`${numberOfSelectedResults}/${numberOfSearchResults}`}
            </Button>
          }
          type="multiple-search-selection-dropdown-connect"
        />
        {refineOpen && (
          <RefineTagSelection
            addTagTypeToText={addTagTypeToText}
            inline={inlineRefine}
            numberOfSearchResults={numberOfSearchResults}
            numberOfSelectedResults={numberOfSelectedResults}
            onClose={this.handleCloseRefine}
            onDeselectAllForSearchQuery={this.handleDeselectAllForSearchQuery}
            onSelectAllForSearchQuery={this.handleSelectAllForSearchQuery}
            onToggleTagSelected={this.handleToggleTagSelected}
            open
            reduxFormValues={{ ...(reduxFormValues || {}) }}
          />
        )}
      </React.Fragment>
    )
  }
}

RawMultipleSearchTagsSelect.propTypes = propTypes
RawMultipleSearchTagsSelect.defaultProps = defaultProps

export const MultipleSearchTagsSelect = withI18n({ module: 'search' })(
  RawMultipleSearchTagsSelect
)

export default createInjectSearch({
  storeSearchResult: false,
})(MultipleSearchTagsSelect)
