import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Inspector from 'react-json-inspector'
import 'react-json-inspector/json-inspector.css'
import { Button, Icon } from 'semantic-ui-react'

const propTypes = {
  defaultExpanded: PropTypes.bool,
  input: PropTypes.object.isRequired,
}

const defaultProps = {
  defaultExpanded: false,
}

class ReadOnly extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isExpanded: props.defaultExpanded,
    }
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  handleOnClick() {
    this.setState({
      isExpanded: true,
    })
  }

  render() {
    const { value } = this.props.input
    let buttonText = 'Display'
    let disabled = false
    if (!(value && Object.keys(value).length)) {
      buttonText = 'No read only data'
      disabled = true
    }

    if (!this.state.isExpanded) {
      return (
        <Button
          disabled={disabled}
          icon
          labelPosition="left"
          onClick={event => {
            event.preventDefault()
            this.handleOnClick()
          }}
        >
          {buttonText}
          <Icon name="plus" />
        </Button>
      )
    }

    return (
      <div style={{ minHeight: 600 }}>
        <Inspector data={value} isExpanded={() => true} />
      </div>
    )
  }
}

ReadOnly.defaultProps = defaultProps
ReadOnly.propTypes = propTypes

export default ReadOnly
