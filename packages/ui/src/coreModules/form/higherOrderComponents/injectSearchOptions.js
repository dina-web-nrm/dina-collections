import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import objectPath from 'object-path'

import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import { createInjectSearch } from 'coreModules/search/higherOrderComponents'
import createNestedItem from 'coreModules/crud/actionCreators/createNestedItem'

const defaultExtractValue = item => {
  return item && item.attributes && item.attributes.name
}

const mapDispatchToProps = {
  createNestedItem,
}

const propTypes = {
  baseFilter: PropTypes.shape({
    filterFunctionName: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }),
  createNestedItem: PropTypes.func.isRequired,
  extractText: PropTypes.func,
  filterFunctionName: PropTypes.string,
  getManySearch: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  include: PropTypes.array,
  includeFields: PropTypes.array,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.shape({
        normalized: PropTypes.shape({
          id: PropTypes.string,
        }),
        textI: PropTypes.string,
        textV: PropTypes.string,
      }),
    ]),
  }).isRequired,
  limit: PropTypes.number,
  mapItemToOption: PropTypes.func,
  mapTextToOption: PropTypes.func,
  nestItems: PropTypes.bool,
  onSearchQueryChange: PropTypes.func,
  pathToIdInValue: PropTypes.string,
  pathToTextInValue: PropTypes.string,
  relationships: PropTypes.array,
  resolveRelationships: PropTypes.array,
  resource: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
  searchWithQuery: PropTypes.bool,
}

const defaultProps = {
  baseFilter: undefined,
  extractText: defaultExtractValue,
  filterFunctionName: 'nameSearch',
  include: undefined,
  includeFields: ['id', 'attributes.name'],
  limit: 10,
  mapItemToOption: undefined,
  mapTextToOption: undefined,
  nestItems: false,
  onSearchQueryChange: undefined,
  pathToIdInValue: '',
  pathToTextInValue: '',
  relationships: undefined,
  resolveRelationships: undefined,
  searchWithQuery: false,
}

const injectSearchOptions = (
  { enablePlainTextOption = false } = {}
) => ComposedComponent => {
  class SearchOptionsInjector extends Component {
    constructor(props) {
      super(props)

      this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this)
      this.updateSelectedOption = this.updateSelectedOption.bind(this)
      this.state = {
        options: [],
        searchQuery: '',
        selectedOption: undefined,
      }

      const defaultMapItemToOption = item => {
        return {
          key: item.id,
          text: props.extractText(item),
          value: item.id,
        }
      }

      const defaultMapTextToOption = text => {
        return {
          key: text,
          text: `${text} (${props.i18n.moduleTranslate({
            textKey: 'plainText',
          })})`,
          value: { [props.pathToTextInValue]: text },
        }
      }

      this.mapItemToOption = props.mapItemToOption || defaultMapItemToOption
      this.mapTextToOption = props.mapTextToOption || defaultMapTextToOption
    }

    updateSelectedOption({ id, text }) {
      if (!id && !text) {
        return this.setState(prevState => {
          if (prevState.selectedOption === undefined) {
            return null
          }

          return {
            selectedOption: undefined,
          }
        })
      }

      if (text) {
        return this.setState({
          selectedOption: this.mapTextToOption(text),
        })
      }

      const { options } = this.state

      if (id) {
        const selectedOption = options.find(item => {
          return objectPath.get(item.value, this.props.pathToIdInValue) === id
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
          const selectedOptions =
            this.buildOptionsFromResponse(res, { skipPlainTextOption: true }) ||
            []

          if (selectedOptions.length) {
            this.setState({
              selectedOption: selectedOptions[0],
            })
          }
        })
      }

      return null
    }

    buildOptionsFromResponse(
      response = [],
      { skipPlainTextOption = false } = {}
    ) {
      if (Array.isArray(response)) {
        const { searchQuery } = this.state

        const options = []

        if (enablePlainTextOption && searchQuery && !skipPlainTextOption) {
          options.push(this.mapTextToOption(searchQuery))
        }

        return options.concat(response.map(this.mapItemToOption))
      }
      // TODO handle response is error
      return []
    }

    handleSearchQueryChange({ searchQuery }) {
      const { baseFilter, filterFunctionName, limit } = this.props
      this.setState({
        searchQuery,
      })

      if (this.props.onSearchQueryChange) {
        this.props.onSearchQueryChange({ searchQuery })
      }

      const filters = [{ filterFunctionName, value: searchQuery }]

      if (baseFilter) {
        filters.push(baseFilter)
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

      return (
        <ComposedComponent
          {...this.props}
          onSearchChange={this.handleSearchQueryChange}
          options={options}
          searchQuery={searchQuery}
          selectedOption={selectedOption}
          updateSelectedOption={this.updateSelectedOption}
        />
      )
    }
  }

  SearchOptionsInjector.propTypes = propTypes
  SearchOptionsInjector.defaultProps = defaultProps

  return compose(
    withI18n({ module: 'form' }),
    createInjectSearch({
      storeSearchResult: false,
    }),
    connect(null, mapDispatchToProps)
  )(SearchOptionsInjector)
}

export default injectSearchOptions
