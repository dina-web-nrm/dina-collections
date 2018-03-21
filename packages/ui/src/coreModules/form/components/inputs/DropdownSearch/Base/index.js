import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'semantic-ui-react'
import config from 'config'

const propTypes = {
  autoComplete: PropTypes.string,
  initialText: PropTypes.string,
  input: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  mountHidden: PropTypes.bool,
  onSearchChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
    }).isRequired
  ).isRequired,
  parse: PropTypes.func,
}
const defaultProps = {
  autoComplete: undefined,
  initialText: '',
  mountHidden: config.isTest,
  parse: undefined,
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

    if (this.props.input.value) {
      // empty form value, if search is renewed after a value was selected
      this.props.input.onChange('')
    }
  }

  handleOnChange(event, { value }) {
    const { parse } = this.props

    this.props.onSearchChange({
      inputName: this.props.input.name,
      searchQuery: undefined,
    })

    const parsedValue = parse ? parse(value) : value
    this.props.input.onBlur(parsedValue)
  }

  render() {
    const {
      autoComplete,
      initialText,
      input,
      mountHidden,
      options,
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
          selectOnBlur={false}
          selectOnNavigation={false}
          text={input.value || initialText}
          {...input}
          onBlur={undefined}
          onChange={this.handleOnChange}
        />
        {mountHidden && (
          <input
            className="hidden"
            {...input}
            name={hiddenInputName}
            onChange={event => {
              const { value } = event.target
              onChange(event, { value })
            }}
            type="hidden"
            value={input.value || ''}
          />
        )}
      </React.Fragment>
    )
  }
}

DropdownSearchInput.propTypes = propTypes
DropdownSearchInput.defaultProps = defaultProps

export default DropdownSearchInput
