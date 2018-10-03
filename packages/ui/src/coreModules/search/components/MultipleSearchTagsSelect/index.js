import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import objectPath from 'object-path'
import { Button } from 'semantic-ui-react'

import { MultipleSearchSelectionDropdown } from 'coreModules/form/components'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import { createInjectSearch } from 'coreModules/search/higherOrderComponents'
import RefineTagSelection from './RefineTagSelection'
import * as selectors from './selectors'

const propTypes = {
  aggregationFunctionName: PropTypes.string,
  aggregationKey: PropTypes.string,
  aggregationLimit: PropTypes.number,
  drillDownQuery: PropTypes.shape({
    and: PropTypes.array.isRequired,
  }),
  filterFunctionName: PropTypes.string.isRequired,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  inlineRefine: PropTypes.bool,
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.objectOf(
        PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            selected: PropTypes.bool.isRequired,
          })
        ).isRequired
      ).isRequired,
      PropTypes.string.isRequired,
    ]).isRequired,
  }).isRequired,
  search: PropTypes.func.isRequired,
}
const defaultProps = {
  aggregationFunctionName: undefined,
  aggregationKey: undefined,
  aggregationLimit: 10000,
  drillDownQuery: undefined,
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
    this.handleDeselectAllForSearchQuery = this.handleDeselectAllForSearchQuery.bind(
      this
    )
    this.handleToggleTagSelected = this.handleToggleTagSelected.bind(this)

    this.state = {
      options: [],
      refineOpen: false,
      searchQuery: '',
    }
  }

  getItemsForSearchQuery(searchQuery) {
    const {
      aggregationFunctionName,
      aggregationKey,
      aggregationLimit,
      drillDownQuery,
      filterFunctionName,
    } = this.props

    const query = {
      query: {
        and: [
          ...((drillDownQuery && drillDownQuery.and) || []),
          {
            filter: {
              filterFunction: filterFunctionName,
              input: {
                value: searchQuery,
              },
            },
          },
        ],
      },
    }

    if (aggregationFunctionName) {
      query.aggregations = [
        {
          aggregationFunction: aggregationFunctionName,
          key: aggregationKey,
          options: { contains: searchQuery, limit: aggregationLimit },
        },
      ]
    }

    return this.props.search(query).then(items => {
      return items
    })
  }

  setSearchQueryResultsSelected(searchQuery, selected = true) {
    const searchQueryResultsMap = this.props.input.value
    const searchQueryResults = objectPath.get(
      searchQueryResultsMap,
      searchQuery
    )
    if (searchQueryResults) {
      const newSearchQueryResultsMap = {
        ...searchQueryResultsMap,
        [searchQuery]: searchQueryResults.map(result => {
          return { ...result, selected }
        }),
      }

      this.props.input.onChange(newSearchQueryResultsMap)
    }
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

  handleSearchChange({ searchQuery }) {
    this.setState({
      searchQuery,
    })

    if (!searchQuery) {
      return this.setState({
        options: [],
        searchQuery,
      })
    }
    return this.getItemsForSearchQuery(searchQuery).then(items => {
      const itemOptions = items.map(({ attributes }) => {
        return {
          key: attributes.key,
          text: attributes.key,
          type: 'string',
          value: attributes.key,
        }
      })
      const freeTextOption = {
        key: searchQuery,
        text: `${searchQuery}`,
        type: 'string',
        value: searchQuery,
      }

      const options = [freeTextOption, ...itemOptions]

      this.setState({
        options,
        searchQuery,
      })
    })
  }

  handleSelectSearchQueries(searchQueries) {
    if (!searchQueries.length) {
      this.props.input.onChange({})
    }

    const { value: previousSearchQueryResultsMap } = this.props.input

    if (
      searchQueries.length >
      Object.keys(previousSearchQueryResultsMap || {}).length
    ) {
      const searchQuery = searchQueries[searchQueries.length - 1]
      return this.getItemsForSearchQuery(searchQuery).then(items => {
        const newTags = {
          ...previousSearchQueryResultsMap,
          [searchQuery]: items.map(item => ({ ...item, selected: true })),
        }
        return this.props.input.onChange(newTags)
      })
    }

    const newTags =
      previousSearchQueryResultsMap &&
      searchQueries.reduce((obj, searchQuery) => {
        obj[searchQuery] = previousSearchQueryResultsMap[searchQuery] // eslint-disable-line no-param-reassign
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
    const searchQueryResultsMap = this.props.input.value
    const searchQueryResults = objectPath.get(
      searchQueryResultsMap,
      searchQuery
    )

    if (searchQueryResults) {
      const newSearchQueryResultsMap = {
        ...searchQueryResultsMap,
        [searchQuery]: searchQueryResults.map(resultItem => {
          if (resultItem.id === id) {
            return {
              ...resultItem,
              selected: !resultItem.selected,
            }
          }

          return resultItem
        }),
      }

      this.props.input.onChange(newSearchQueryResultsMap)
    }
  }

  render() {
    const {
      i18n: { moduleTranslate },
      inlineRefine,
      input,
      ...rest
    } = this.props

    const { refineOpen, options } = this.state
    const { value: searchQueryResultsMap } = input

    const patchedInput = {
      ...input,
      onBlur: this.handleSelectSearchQueries,
      value: Object.keys(searchQueryResultsMap || {}),
    }

    const numberOfSearchResults = selectors.getNumberOfSearchResults(
      searchQueryResultsMap
    )
    const numberOfSelectedResults = selectors.getNumberOfSelectedResults(
      searchQueryResultsMap
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
          getSelectedOptions={selectors.getSelectedOptions}
          icon="search"
          input={patchedInput}
          noResultsMessage={moduleTranslate({
            textKey: 'typeQueryAndPressEnter',
          })}
          onSearchChange={this.handleSearchChange}
          rightButton={
            <Button
              disabled={!searchQueryResultsMap}
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
            inline={inlineRefine}
            numberOfSearchResults={numberOfSearchResults}
            numberOfSelectedResults={numberOfSelectedResults}
            onClose={this.handleCloseRefine}
            onDeselectAllForSearchQuery={this.handleDeselectAllForSearchQuery}
            onSelectAllForSearchQuery={this.handleSelectAllForSearchQuery}
            onToggleTagSelected={this.handleToggleTagSelected}
            open
            searchQueryResultsMap={{ ...(searchQueryResultsMap || {}) }}
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
