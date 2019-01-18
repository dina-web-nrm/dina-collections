import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'semantic-ui-react'
import objectPath from 'object-path'

import { createInjectSearch } from '../../higherOrderComponents'
import { ANY } from '../../constants'

const propTypes = {
  buildLocalAggregationQuery: PropTypes.func.isRequired,
  inlineDescription: PropTypes.node,
  input: PropTypes.shape({
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  search: PropTypes.func.isRequired,
  tagTypeInitialOptionValue: PropTypes.string,
  tagTypeMatchAllOptionText: PropTypes.string,
  value: PropTypes.string,
}

const defaultProps = {
  inlineDescription: undefined,
  input: undefined,
  onBlur: undefined,
  onChange: undefined,
  tagTypeInitialOptionValue: undefined,
  tagTypeMatchAllOptionText: undefined,
  value: '',
}

class TagTypeDropdown extends Component {
  constructor(props) {
    super(props)
    this.onChange = objectPath.get(props, 'input.onChange') || props.onChange

    if (!this.onChange) {
      throw new Error('onChange or input.onChange must be provided')
    }

    this.state = {
      options: [],
    }

    this.fetchAvailableTags = this.fetchAvailableTags.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const { tagTypeInitialOptionValue, tagTypeMatchAllOptionText } = this.props

    return this.fetchAvailableTags().then(tags => {
      const options = tags
        .map(tag => {
          return tag.attributes.key
        })
        .sort()
        .map(tagKey => {
          return {
            key: tagKey,
            text: tagKey,
            value: tagKey,
          }
        })

      if (tagTypeMatchAllOptionText) {
        options.unshift({
          key: tagTypeMatchAllOptionText,
          text: tagTypeMatchAllOptionText,
          value: ANY,
        })
      }

      this.setState({ options })

      if (tagTypeInitialOptionValue) {
        this.onChange(tagTypeInitialOptionValue)
      }
    })
  }

  fetchAvailableTags() {
    const query = this.props.buildLocalAggregationQuery({
      input: {
        aggregationFunctionType: 'type',
        getAll: true,
      },
    })

    return this.props.search(query).then(items => {
      return items
    })
  }

  handleChange(event, data) {
    this.onChange(data.value)

    if (this.props.input && this.props.input.onBlur) {
      this.props.input.onBlur(data.value)
    }
  }

  render() {
    const { input, value, inlineDescription } = this.props
    const { options } = this.state

    if (inlineDescription) {
      return (
        <div style={{ fontStyle: 'italic' }}>
          <span>{inlineDescription} </span>
          <Dropdown
            inline
            onChange={this.handleChange}
            options={options}
            value={value}
          />
        </div>
      )
    }

    return (
      <Dropdown
        onChange={this.handleChange}
        options={options}
        search
        selection
        value={value || (input && input.value) || ''}
      />
    )
  }
}

TagTypeDropdown.defaultProps = defaultProps
TagTypeDropdown.propTypes = propTypes

export default createInjectSearch({
  storeSearchResult: false,
})(TagTypeDropdown)
