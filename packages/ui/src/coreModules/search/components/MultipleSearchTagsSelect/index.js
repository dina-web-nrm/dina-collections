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
  filterFunctionName: PropTypes.string.isRequired,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  inlineRefine: PropTypes.bool,
  input: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
}
const defaultProps = {
  aggregationFunctionName: undefined,
  aggregationKey: undefined,
  aggregationLimit: 10000,
  inlineRefine: false,
  input: {},
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
    this.handleSelectValue = this.handleSelectValue.bind(this)
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
      searchQueryResultsMap: undefined,
      value: [],
    }
  }

  getItemsForSearchQuery(searchQuery) {
    const {
      aggregationFunctionName,
      aggregationKey,
      aggregationLimit,
      filterFunctionName,
    } = this.props

    const query = {
      idsOnly: false,
      query: {
        and: [
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
    const searchQueryResults = objectPath.get(
      this.state,
      `searchQueryResultsMap.${searchQuery}`
    )
    if (searchQueryResults) {
      this.setState(prevState => {
        const newSearchQueryResultsMap = {
          ...prevState.searchQueryResultsMap,
          [searchQuery]: searchQueryResults.map(result => {
            result.selected = selected // eslint-disable-line no-param-reassign
            return result
          }),
        }

        this.props.onChange(newSearchQueryResultsMap)

        return {
          searchQueryResultsMap: newSearchQueryResultsMap,
        }
      })
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
      options: searchQuery
        ? [
            {
              key: searchQuery,
              text: searchQuery,
              type: 'string',
              value: searchQuery,
            },
          ]
        : [],
      searchQuery,
    })
  }

  handleSelectValue(value) {
    if (!value.length) {
      this.props.onChange(undefined)
      return this.setState({
        searchQueryResultsMap: undefined, // eslint-disable-line react/no-unused-state
        value,
      })
    }

    const { value: previousValue } = this.state

    if (value.length > previousValue.length) {
      const searchQuery = value[value.length - 1]
      return this.getItemsForSearchQuery(searchQuery).then(items => {
        this.setState(prevState => {
          const newTags = {
            ...prevState.searchQueryResultsMap,
            [searchQuery]: items.map(item => ({ ...item, selected: true })),
          }
          this.props.onChange(newTags)

          return {
            ...prevState,
            searchQueryResultsMap: newTags,
            value,
          }
        })
      })
    }

    return this.setState(prevState => {
      const newTags =
        prevState.searchQueryResultsMap &&
        value.reduce((obj, searchQuery) => {
          obj[searchQuery] = prevState.searchQueryResultsMap[searchQuery] // eslint-disable-line no-param-reassign
          return obj
        }, {})

      this.props.onChange(newTags)

      return {
        ...prevState,
        searchQueryResultsMap: newTags,
        value,
      }
    })
  }

  handleSelectAllForSearchQuery(searchQuery) {
    this.setSearchQueryResultsSelected(searchQuery, true)
  }

  handleDeselectAllForSearchQuery(searchQuery) {
    this.setSearchQueryResultsSelected(searchQuery, false)
  }

  handleToggleTagSelected({ searchQuery, id }) {
    const searchQueryResults = objectPath.get(
      this.state,
      `searchQueryResultsMap.${searchQuery}`
    )
    if (searchQueryResults) {
      const resultItem = searchQueryResults.find(result => result.id === id)
      if (resultItem) {
        objectPath.set(resultItem, 'selected', !resultItem.selected)
        this.setState(prevState => {
          const newSearchQueryResultsMap = {
            ...prevState.searchQueryResultsMap,
            [searchQuery]: searchQueryResults,
          }

          this.props.onChange(newSearchQueryResultsMap)

          return {
            searchQueryResultsMap: newSearchQueryResultsMap,
          }
        })
      }
    }
  }

  render() {
    const {
      i18n: { moduleTranslate },
      inlineRefine,
      input,
      ...rest
    } = this.props
    const { value, refineOpen, options, searchQueryResultsMap } = this.state
    const patchedInput = {
      name: 'MultipleSearchTagsSelect',
      ...input,
      onBlur: this.handleSelectValue,
      onChange: () => {},
      value,
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
          meta={{}}
          noResultsMessage={moduleTranslate({
            textKey: 'typeQueryAndPressEnter',
          })}
          onSearchChange={this.handleSearchChange}
          rightButton={
            <Button
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
            searchQueryResultsMap={searchQueryResultsMap}
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
  searchOnMount: false,
  storeSearchResult: false,
})(MultipleSearchTagsSelect)
