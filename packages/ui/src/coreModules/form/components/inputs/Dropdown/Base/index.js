import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'semantic-ui-react'

const propTypes = {
  autoComplete: PropTypes.string,
  format: PropTypes.func,
  initialText: PropTypes.string,
  input: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onSearchChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
    }).isRequired
  ).isRequired,

  selectOnBlur: PropTypes.string,
}
const defaultProps = {
  autoComplete: undefined,
  format: undefined,
  initialText: '',
  selectOnBlur: false,
}

class DropdownSearchInput extends Component {
  constructor(props) {
    super(props)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleSearchChange(event, { searchQuery }) {
    this.props.onSearchChange({
      inputName: this.props.input.name,
      searchQuery,
    })
  }

  handleOnChange(event, { value }) {
    const { format } = this.props

    this.props.onSearchChange({
      inputName: this.props.input.name,
      searchQuery: '',
    })
    const formattedValue = format ? format(value) : value
    this.props.input.onBlur(formattedValue)
  }

  render() {
    const {
      autoComplete,
      input,
      selectOnBlur,
      options,
      initialText,
    } = this.props
    const { onChange } = input
    const hiddenInputName = `${input.name}.hidden`
    return (
      <React.Fragment>
        <Dropdown
          autoComplete={autoComplete}
          onSearchChange={this.handleSearchChange}
          options={options}
          search
          selection
          selectOnBlur={selectOnBlur}
          selectOnNavigation={false}
          text={input.value || initialText}
          {...input}
          onBlur={undefined}
          onChange={this.handleOnChange}
        />
        <input
          {...input}
          name={hiddenInputName}
          onChange={event => {
            const { value } = event.target
            onChange(event, { value })
          }}
          type="hidden"
          value={input.value || ''}
        />
      </React.Fragment>
    )
  }
}

DropdownSearchInput.propTypes = propTypes
DropdownSearchInput.defaultProps = defaultProps

export default DropdownSearchInput
