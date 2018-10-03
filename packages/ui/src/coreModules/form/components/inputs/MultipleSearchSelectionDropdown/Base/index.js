import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'semantic-ui-react'
import config from 'config'

const propTypes = {
  autoComplete: PropTypes.string,
  displayAsButton: PropTypes.bool,
  icon: PropTypes.string,
  initialText: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    ),
  }).isRequired,
  isLoading: PropTypes.bool,
  mountHidden: PropTypes.bool,
  noResultsMessage: PropTypes.string,
  onSearchChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      type: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
    }).isRequired
  ).isRequired,
  searchQuery: PropTypes.string,
  selectedOptions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      type: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
    })
  ),
  text: PropTypes.string,
}
const defaultProps = {
  autoComplete: undefined,
  displayAsButton: false,
  icon: 'dropdown',
  initialText: '',
  isLoading: false,
  mountHidden: config.isTest,
  noResultsMessage: 'No results found.',
  searchQuery: '',
  selectedOptions: [],
  text: undefined,
}

class MultipleSearchSelectionDropdownInput extends Component {
  constructor(props) {
    super(props)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
  }

  handleSearchChange(event, { searchQuery }) {
    this.props.onSearchChange({
      inputName: this.props.input.name,
      searchQuery,
    })
  }

  handleOnChange(event, data) {
    const { value } = data
    this.handleSearchChange(null, { searchQuery: '' })

    this.props.input.onBlur(value)
  }

  handleOnBlur(event, data) {
    const { value } = data
    this.handleSearchChange(null, { searchQuery: '' })
    if (this.props.searchQuery && !value.includes(this.props.searchQuery)) {
      this.props.input.onBlur([...value, this.props.searchQuery])
    } else {
      this.props.input.onBlur(value)
    }
  }

  render() {
    const {
      autoComplete,
      displayAsButton,
      icon,
      initialText,
      input,
      isLoading,
      mountHidden,
      noResultsMessage,
      options: optionsInput = [],
      searchQuery,
      selectedOptions = [],
    } = this.props

    const options = [...optionsInput, ...selectedOptions]

    const { onChange } = input
    const hiddenInputName = `${input.name}.hidden`

    const style = displayAsButton
      ? {
          background: 'white',
          borderRadius: 0,
          fontWeight: 'normal',
          maxWidth: '75%',
        }
      : undefined
    return (
      <React.Fragment>
        <Dropdown
          autoComplete={autoComplete}
          button={displayAsButton}
          icon={icon}
          loading={isLoading}
          multiple
          noResultsMessage={noResultsMessage}
          onSearchChange={this.handleSearchChange}
          options={options}
          placeholder={initialText}
          search
          searchQuery={searchQuery}
          selection
          selectOnBlur={false}
          selectOnNavigation={false}
          {...input}
          onBlur={this.handleOnBlur}
          onChange={this.handleOnChange}
          style={style}
          value={selectedOptions && selectedOptions.map(({ value }) => value)}
        />
        {(true || mountHidden) && (
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

MultipleSearchSelectionDropdownInput.propTypes = propTypes
MultipleSearchSelectionDropdownInput.defaultProps = defaultProps

export default MultipleSearchSelectionDropdownInput
