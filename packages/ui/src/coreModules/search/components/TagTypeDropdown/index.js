import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'semantic-ui-react'
import objectPath from 'object-path'

import { createInjectSearch } from '../../higherOrderComponents'
import { ANY } from '../../constants'

const propTypes = {
  buildLocalAggregationQuery: PropTypes.func.isRequired,
  inline: PropTypes.bool,
  inlineDescription: PropTypes.node,
  input: PropTypes.shape({
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  search: PropTypes.func.isRequired,
  tagTypeInitialOptionValue: PropTypes.string,
  tagTypeMatchAllOptionText: PropTypes.string,
  value: PropTypes.string,
}

const defaultProps = {
  inline: false,
  inlineDescription: undefined,
  input: undefined,
  onBlur: undefined,
  onChange: undefined,
  placeholder: undefined,
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
    const {
      inline,
      inlineDescription,
      input,
      placeholder,
      value: valueFromParent,
    } = this.props

    const { options } = this.state
    const value = valueFromParent || (input && input.value) || ''

    if (inlineDescription) {
      return (
        <div style={{ fontStyle: 'italic' }}>
          <span>{inlineDescription} </span>
          <Dropdown
            className="placeholder-same-color-as-text"
            inline
            onChange={this.handleChange}
            options={options}
            placeholder={placeholder}
            value={value}
          />
        </div>
      )
    }

    if (inline) {
      return (
        <Dropdown
          className="placeholder-same-color-as-text"
          inline
          onChange={this.handleChange}
          options={options}
          placeholder={placeholder}
          value={value}
        />
      )
    }

    return (
      <Dropdown
        onChange={this.handleChange}
        options={options}
        placeholder={placeholder}
        search
        selection
        value={value}
      />
    )
  }
}

TagTypeDropdown.defaultProps = defaultProps
TagTypeDropdown.propTypes = propTypes

export default createInjectSearch({
  storeSearchResult: false,
})(TagTypeDropdown)
