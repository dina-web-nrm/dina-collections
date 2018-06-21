import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createInjectSearch } from 'coreModules/search/higherOrderComponents'
import { MultipleSearchSelectionDropdown } from 'coreModules/form/components'

const propTypes = {
  onChange: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
}

class CollectingLocationMultipleSearch extends Component {
  constructor(props) {
    super(props)
    this.handleGetSearchQuery = this.handleGetSearchQuery.bind(this)
    this.handleOnSearchChange = this.handleOnSearchChange.bind(this)
    this.handleSelectValue = this.handleSelectValue.bind(this)
    this.state = {
      options: [],
      searchQuery: '',
      value: [],
    }
  }
  handleGetSearchQuery() {
    return this.state.searchQuery
  }

  handleSelectValue(value) {
    this.setState({
      value,
    })
    this.props.onChange(value)
  }

  handleOnSearchChange({ searchQuery }) {
    this.setState({
      options: [],
      searchQuery,
    })

    const query = {
      aggregations: [
        {
          aggregationFunction: 'identifiers',
          key: 'collectingLocations',
          options: { contains: searchQuery, limit: 10 },
        },
      ],
      query: {
        and: [
          {
            filter: {
              filterFunction: 'searchCollectingLocation',
              input: {
                value: searchQuery,
              },
            },
          },
        ],
      },
    }

    this.props.search(query).then(items => {
      const options = items.map(string => {
        return {
          key: string,
          text: string,
          type: 'string',
          value: string,
        }
      })
      this.setState({
        options,
      })
    })
  }

  render() {
    const { ...rest } = this.props
    const { value, options } = this.state
    const input = {
      name: 'test',
      onBlur: this.handleSelectValue,
      onChange: () => {},
      value,
    }

    return (
      <MultipleSearchSelectionDropdown
        {...rest}
        enableHelpNotifications={false}
        getOptions={() => {
          return options
        }}
        getSearchQuery={this.handleGetSearchQuery}
        getSelectedOptions={(state, tmp) => {
          const selected = tmp.map(item => {
            return {
              key: item,
              text: item,
              type: 'string',
              value: item,
            }
          })
          return selected
        }}
        input={input}
        meta={{}}
        onSearchChange={this.handleOnSearchChange}
        type="multiple-search-selection-dropdown-connect"
      />
    )
  }
}

CollectingLocationMultipleSearch.propTypes = propTypes

export default createInjectSearch({
  searchOnMount: false,
  storeSearchResult: false,
})(CollectingLocationMultipleSearch)
