import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'semantic-ui-react'

import { createInjectSearch } from 'coreModules/search/higherOrderComponents'
import { ANY } from '../../constants'

const propTypes = {
  buildLocalAggregationQuery: PropTypes.func.isRequired,
  inline: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  tagTypeFilterInitialValue: PropTypes.string.isRequired,
  tagTypeFilterMatchAllOption: PropTypes.string.isRequired,
  tagTypeFilterText: PropTypes.string.isRequired,
  value: PropTypes.string,
}

const defaultProps = {
  inline: false,
  value: '',
}

class TagTypeDropdown extends Component {
  constructor(props) {
    super(props)

    this.state = {
      options: [],
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.fetchAvailableTags = this.fetchAvailableTags.bind(this)
  }

  componentDidMount() {
    const {
      tagTypeFilterInitialValue,
      tagTypeFilterMatchAllOption,
    } = this.props

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

      if (tagTypeFilterMatchAllOption) {
        options.unshift({
          key: tagTypeFilterMatchAllOption,
          text: tagTypeFilterMatchAllOption,
          value: ANY,
        })
      }

      this.setState({ options })

      if (tagTypeFilterInitialValue) {
        if (tagTypeFilterInitialValue === tagTypeFilterMatchAllOption) {
          this.props.onChange('any')
        } else {
          this.props.onChange(tagTypeFilterInitialValue)
        }
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

  handleOnChange(event, data) {
    this.props.onChange(data.value)
  }

  render() {
    const { inline, value, tagTypeFilterText } = this.props
    const { options } = this.state

    return (
      <div style={{ fontStyle: 'italic' }}>
        <span>{tagTypeFilterText} </span>
        <Dropdown
          inline={inline}
          onChange={this.handleOnChange}
          options={options}
          value={value}
        />
      </div>
    )
  }
}

TagTypeDropdown.defaultProps = defaultProps
TagTypeDropdown.propTypes = propTypes

export default createInjectSearch({
  storeSearchResult: false,
})(TagTypeDropdown)
