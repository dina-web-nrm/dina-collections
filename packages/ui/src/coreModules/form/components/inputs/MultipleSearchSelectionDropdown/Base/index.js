import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'semantic-ui-react'
import config from 'config'

const propTypes = {
  autoComplete: PropTypes.string,
  displayAsButton: PropTypes.bool,
  initialText: PropTypes.string,
  input: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  isLoading: PropTypes.bool,
  mountHidden: PropTypes.bool,
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
  initialText: '',
  isLoading: false,
  mountHidden: config.isTest,
  searchQuery: '',
  selectedOptions: [],
  text: undefined,
}

class MultipleSearchSelectionDropdownInput extends Component {
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

  handleOnChange(event, data) {
    const { value } = data
    this.handleSearchChange(null, { searchQuery: '' })

    this.props.input.onBlur(value)
  }

  render() {
    const {
      autoComplete,
      displayAsButton,
      initialText,
      input,
      isLoading,
      mountHidden,
      options: optionsInput = [],
      searchQuery,
      selectedOptions = [],
    } = this.props

    const options = [...optionsInput, ...selectedOptions]

    const { onChange } = input
    const hiddenInputName = `${input.name}.hidden`

    const style = displayAsButton
      ? { background: 'white', borderRadius: 0, fontWeight: 'normal' }
      : undefined
    return (
      <React.Fragment>
        <Dropdown
          autoComplete={autoComplete}
          button={displayAsButton}
          loading={isLoading}
          multiple
          onSearchChange={this.handleSearchChange}
          options={options}
          placeholder={initialText}
          search
          searchQuery={searchQuery}
          selection
          selectOnBlur={false}
          selectOnNavigation={false}
          {...input}
          onBlur={undefined}
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
