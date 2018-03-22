import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DropdownSearchBaseInput from '../Base'

const propTypes = {
  getOptions: PropTypes.func.isRequired,
  initialText: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }).isRequired,
  parse: PropTypes.func,
}

const defaultProps = {
  initialText: undefined,
  parse: undefined,
}

class DropdownSearchLocalInput extends Component {
  constructor(props) {
    super(props)
    const searchQuery = null
    this.state = {
      options: props.getOptions(searchQuery),
    }
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  handleSearchChange({ searchQuery }) {
    const options = this.props.getOptions(searchQuery)
    this.setState({
      options,
    })
  }

  render() {
    const { initialText, input, parse } = this.props

    const { options } = this.state

    return (
      <DropdownSearchBaseInput
        initialText={initialText}
        input={input}
        onSearchChange={this.handleSearchChange}
        options={options}
        parse={parse}
      />
    )
  }
}

DropdownSearchLocalInput.propTypes = propTypes
DropdownSearchLocalInput.defaultProps = defaultProps

export default DropdownSearchLocalInput
