import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'semantic-ui-react'

const propTypes = {
  fetchAvailableTags: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  tagTypeFilterInitialValue: PropTypes.string.isRequired,
  tagTypeFilterMatchAllOption: PropTypes.string.isRequired,
  tagTypeFilterText: PropTypes.string.isRequired,
  value: PropTypes.string,
}

const defaultProps = {
  value: '',
}

class TagTypeFilterInlineDropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: [],
    }
    this.handleOnChange = this.handleOnChange.bind(this)
  }
  componentDidMount() {
    const {
      tagTypeFilterInitialValue,
      tagTypeFilterMatchAllOption,
    } = this.props
    return this.props.fetchAvailableTags().then(tags => {
      const options = tags.map(tag => {
        return {
          key: tag.attributes.key,
          text: tag.attributes.key,
          value: tag.attributes.key,
        }
      })

      if (tagTypeFilterMatchAllOption) {
        options.push({
          key: tagTypeFilterMatchAllOption,
          text: tagTypeFilterMatchAllOption,
          value: 'any',
        })
      }

      this.setState({
        options: options.sort((a, b) => {
          if (a.key > b.key) {
            return 1
          }

          if (a.key < b.key) {
            return -1
          }
          return 0
        }),
      })
      if (tagTypeFilterInitialValue) {
        if (tagTypeFilterInitialValue === tagTypeFilterMatchAllOption) {
          this.props.onChange('any')
        } else {
          this.props.onChange(tagTypeFilterInitialValue)
        }
      }
    })
  }
  handleOnChange(event, data) {
    this.props.onChange(data.value)
  }
  render() {
    const { value, tagTypeFilterText } = this.props
    const { options } = this.state
    return (
      <div style={{ fontStyle: 'italic' }}>
        <span>{tagTypeFilterText} </span>
        <Dropdown
          inline
          onChange={this.handleOnChange}
          options={options}
          value={value}
        />
      </div>
    )
  }
}

TagTypeFilterInlineDropdown.defaultProps = defaultProps
TagTypeFilterInlineDropdown.propTypes = propTypes

export default TagTypeFilterInlineDropdown
