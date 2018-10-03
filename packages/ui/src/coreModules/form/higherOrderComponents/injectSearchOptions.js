import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import objectPath from 'object-path'
import immutable from 'object-path-immutable'

import createDeleteProperties from 'common/es5/createDeleteProperties'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import { createInjectSearch } from 'coreModules/search/higherOrderComponents'
import createNestedItem from 'coreModules/crud/actionCreators/createNestedItem'

const deleteUndefinedProperties = createDeleteProperties(undefined)

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
  textAttributeName: PropTypes.string,
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
  textAttributeName: undefined,
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
        const suffix = objectPath.get(item, 'attributes.deactivatedAt')
          ? ' (removed)'
          : ''
        const text =
          (props.textAttributeName &&
            objectPath.get(item, props.textAttributeName)) ||
          props.extractText(item)
        return {
          key: item.id,
          text: `${text}${suffix}`,
          value: item.id,
        }
      }

      const defaultMapTextToOption = (text, value) => {
        return {
          key: text,
          text: `${text} (${props.i18n.moduleTranslate({
            textKey: 'plainText',
          })})`,
          value: deleteUndefinedProperties({
            ...value,
            [props.pathToTextInValue]: text,
          }),
        }
      }

      this.mapItemToOption = props.mapItemToOption || defaultMapItemToOption
      this.mapTextToOption = props.mapTextToOption || defaultMapTextToOption
    }

    updateSelectedOption({ id, requireEitherOr, text, value } = {}) {
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

      if (id) {
        const { options } = this.state

        const selectedOption = options.find(item => {
          return objectPath.get(item.value, this.props.pathToIdInValue) === id
        })

        if (selectedOption) {
          const option = requireEitherOr
            ? immutable.del(selectedOption, this.props.pathToTextInValue)
            : selectedOption

          const optionWithOtherValues = {
            ...option,
            value: deleteUndefinedProperties({
              ...option.value,
              ...value,
            }),
          }

          return this.setState({
            options: [optionWithOtherValues],
            selectedOption: optionWithOtherValues,
          })
        }

        const filters = [
          {
            filterFunctionName: 'id',
            value: id,
          },
        ]

        return this.search({
          filters,
          includeDeactivated: true,
          limit: 1,
        }).then(res => {
          const selectedOptions =
            this.buildOptionsFromResponse(res, {
              skipPlainTextOption: true,
              value,
            }) || []

          if (selectedOptions.length) {
            const option = selectedOptions[0]
            this.setState({
              options: [option],
              selectedOption: option,
            })
          }
        })
      }

      if (text) {
        const selectedOption = this.mapTextToOption(text, value)

        return this.setState({
          options: [selectedOption],
          selectedOption,
        })
      }

      return null
    }

    buildOptionsFromResponse(
      response = [],
      { skipPlainTextOption = false, value } = {}
    ) {
      if (Array.isArray(response)) {
        const { searchQuery } = this.state

        const options = []

        if (enablePlainTextOption && searchQuery && !skipPlainTextOption) {
          options.push(this.mapTextToOption(searchQuery, value))
        }

        return options.concat(
          response.map(item => this.mapItemToOption(item, value))
        )
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

    search({ filters = [], includeDeactivated, limit }) {
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

        return this.props.search({
          includeDeactivated,
          includeFields,
          limit,
          query,
        })
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
        includeDeactivated,
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
