import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'semantic-ui-react'
import config from 'config'

const propTypes = {
  autoComplete: PropTypes.string,
  displayAsButton: PropTypes.bool,
  fluid: PropTypes.bool,
  initialText: PropTypes.string,
  input: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  isLoading: PropTypes.bool,
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
  searchQuery: PropTypes.string,
  selectedOption: PropTypes.shape({
    key: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }),
  text: PropTypes.string,
}
const defaultProps = {
  autoComplete: undefined,
  displayAsButton: false,
  fluid: false,
  initialText: '',
  isLoading: false,
  mountHidden: config.isTest,
  searchQuery: '',
  selectedOption: undefined,
  text: undefined,
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

  handleOnChange(event, data) {
    const { value } = data
    this.handleSearchChange(null, { searchQuery: '' })

    this.props.input.onBlur(value)
  }

  render() {
    const {
      autoComplete,
      displayAsButton,
      fluid,
      initialText,
      input,
      isLoading,
      mountHidden,
      options,
      searchQuery,
      selectedOption,
    } = this.props
    const { onChange } = input
    const hiddenInputName = `${input.name}.hidden`
    const text = (selectedOption && selectedOption.text) || initialText
    const style = displayAsButton
      ? { background: 'white', borderRadius: 0, fontWeight: 'normal' }
      : undefined
    return (
      <React.Fragment>
        <Dropdown
          autoComplete={autoComplete}
          button={displayAsButton}
          fluid={fluid}
          loading={isLoading}
          onSearchChange={this.handleSearchChange}
          options={options}
          search
          searchQuery={searchQuery}
          selection
          selectOnBlur={false}
          selectOnNavigation={false}
          text={searchQuery || text}
          {...input}
          onBlur={undefined}
          onChange={this.handleOnChange}
          style={style}
          value={(selectedOption && selectedOption.value) || ''}
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
