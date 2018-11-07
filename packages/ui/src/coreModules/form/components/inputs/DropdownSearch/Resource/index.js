import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import objectPath from 'object-path'

import config from 'config'
import { injectSearchOptions } from 'coreModules/form/higherOrderComponents'
import DropdownSearchBase from '../Base'

const defaultExtractValue = item => {
  return item && item.attributes && item.attributes.name
}

const propTypes = {
  baseFilter: PropTypes.shape({
    filterFunctionName: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  }),
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
  pathToIdInValue: PropTypes.string,
  relationships: PropTypes.array,
  resolveRelationships: PropTypes.array,
  resource: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
  searchWithQuery: PropTypes.bool,
  selectedOption: PropTypes.shape({
    key: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }),
  updateSelectedOption: PropTypes.func.isRequired,
}

const defaultProps = {
  baseFilter: undefined,
  extractValue: defaultExtractValue,
  filterFunctionName: 'nameSearch',
  include: undefined,
  includeFields: ['id', 'attributes.name'],
  limit: 10,
  nestItems: false,
  onSearchQueryChange: undefined,
  pathToIdInValue: '',
  relationships: undefined,
  resolveRelationships: undefined,
  searchWithQuery: false,
  selectedOption: undefined,
}

class DropdownSearchResource extends Component {
  componentDidMount() {
    const { pathToIdInValue } = this.props
    const id = objectPath.get(
      this.props,
      pathToIdInValue ? `input.value.${pathToIdInValue}` : 'input.value'
    )
    if (id && !config.isTest) {
      this.props.updateSelectedOption({ id })
    }
  }

  componentDidUpdate() {
    const { pathToIdInValue } = this.props

    const selectedOptionId = objectPath.get(
      this.props,
      pathToIdInValue
        ? `selectedOption.value.${pathToIdInValue}`
        : 'selectedOption.value'
    )
    const id = objectPath.get(
      this.props,
      pathToIdInValue ? `input.value.${pathToIdInValue}` : 'input.value'
    )

    if (selectedOptionId !== id) {
      setTimeout(() => {
        this.props.updateSelectedOption({ id })
      })
    }
  }

  render() {
    return <DropdownSearchBase icon="search" {...this.props} />
  }
}

DropdownSearchResource.propTypes = propTypes
DropdownSearchResource.defaultProps = defaultProps

export default compose(injectSearchOptions())(DropdownSearchResource)
