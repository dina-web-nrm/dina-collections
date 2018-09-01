import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createInjectSearch } from 'coreModules/search/higherOrderComponents'

import createNestedItem from 'coreModules/crud/actionCreators/createNestedItem'
import DropdownSearchBase from '../Base'

const defaultExtractValue = item => {
  return item && item.attributes && item.attributes.name
}

const mapDispatchToProps = {
  createNestedItem,
}

const propTypes = {
  createNestedItem: PropTypes.func.isRequired,
  extractValue: PropTypes.func,
  filterFunctionName: PropTypes.string,
  getManySearch: PropTypes.func.isRequired,
  include: PropTypes.array,
  includeFields: PropTypes.array,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }).isRequired,
  limit: PropTypes.number,
  nestItems: PropTypes.bool,
  onSearchQueryChange: PropTypes.func,
  relationships: PropTypes.array,
  resolveRelationships: PropTypes.array,
  resource: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
  searchWithQuery: PropTypes.bool,
  staticFilter: PropTypes.shape({
    filterFunctionName: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }),
}

const defaultProps = {
  extractValue: defaultExtractValue,
  filterFunctionName: 'nameSearch',
  include: undefined,
  includeFields: ['id', 'attributes.name'],
  limit: 10,
  nestItems: false,
  onSearchQueryChange: undefined,
  relationships: undefined,
  resolveRelationships: undefined,
  searchWithQuery: false,
  staticFilter: undefined,
}

class DropdownSearchResource extends Component {
  constructor(props) {
    super(props)

    this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this)
    this.updateSelectedOption = this.updateSelectedOption.bind(this)
    this.state = {
      options: [],
      searchQuery: '',
      selectedOption: undefined,
    }
  }

  componentDidMount() {
    const { input } = this.props
    const id = input && input.value
    if (id) {
      this.updateSelectedOption(id)
    }
  }

  componentDidUpdate() {
    const { selectedOption: { value: selectedOptionId = '' } = {} } = this.state
    const id = this.props.input && this.props.input.value
    if (selectedOptionId !== id) {
      setTimeout(() => {
        this.updateSelectedOption(id)
      })
    }
  }

  updateSelectedOption(id) {
    if (!id) {
      return this.setState({
        selectedOption: undefined,
      })
    }
    const { options } = this.state
    const selectedOption = options.find(item => {
      return item.value === id
    })

    if (selectedOption) {
      return this.setState({
        selectedOption,
      })
    }

    const filters = [
      {
        filterFunctionName: 'id',
        value: id,
      },
    ]

    this.search({ filters, limit: 1 }).then(res => {
      const selectedOptions = this.buildOptionsFromResponse(res) || []
      if (selectedOptions.length) {
        this.setState({
          selectedOption: selectedOptions[0],
        })
      }
    })
    return null
  }

  buildOptionsFromResponse(response = []) {
    const { extractValue } = this.props
    return response.map(item => {
      return {
        key: item.id,
        text: extractValue(item),
        value: item.id,
      }
    })
  }

  handleSearchQueryChange({ searchQuery }) {
    const { filterFunctionName, limit, staticFilter } = this.props
    this.setState({
      searchQuery,
    })

    if (this.props.onSearchQueryChange) {
      this.props.onSearchQueryChange({ searchQuery })
    }

    const filters = [{ filterFunctionName, value: searchQuery }]

    if (staticFilter) {
      filters.push(staticFilter)
    }

    this.search({ filters, limit }).then(res => {
      const options = this.buildOptionsFromResponse(res)
      this.setState({
        options,
      })
    })
  }

  search({ filters = [], limit }) {
    const {
      include,
      includeFields,
      nestItems = false,
      relationships,
      resolveRelationships,
      resource,
      searchWithQuery,
    } = this.props
    if (searchWithQuery) {
      const query = {
        and: filters.map(filter => {
          return {
            filter: {
              filterFunction: filter.filterFunctionName,
              input: {
                value: filter.value,
              },
            },
          }
        }),
      }

      return this.props.search({ includeFields, limit, query })
    }

    const queryParamFilters = filters.reduce((obj, filter) => {
      return {
        ...obj,
        [filter.filterFunctionName]: filter.value,
      }
    }, {})

    const queryParams = {
      filter: queryParamFilters,
      include,
      limit,
      relationships,
    }

    return this.props.getManySearch({ queryParams }).then(res => {
      if (!nestItems) {
        return res
      }
      const promises = res.map(item => {
        return this.props.createNestedItem({
          item,
          relationships,
          resolveRelationships,
          resource,
          storeResult: false,
        })
      })

      return Promise.all(promises).then(nestedItems => {
        return nestedItems
      })
    })
  }

  render() {
    const { options, searchQuery, selectedOption } = this.state

    const { ...rest } = this.props
    return (
      <DropdownSearchBase
        onSearchChange={this.handleSearchQueryChange}
        options={options}
        searchQuery={searchQuery}
        selectedOption={selectedOption}
        {...rest}
      />
    )
  }
}

DropdownSearchResource.propTypes = propTypes
DropdownSearchResource.defaultProps = defaultProps

export default compose(
  createInjectSearch({
    storeSearchResult: false,
  }),
  connect(null, mapDispatchToProps)
)(DropdownSearchResource)
