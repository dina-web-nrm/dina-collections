import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'semantic-ui-react'
import FieldTemplate from '../../../FieldTemplate'

import { createDateTextValueFromInput, getDateSuggestion } from '../utilities'

const propTypes = {
  displaySubLabel: PropTypes.bool,
  fluid: PropTypes.bool,
  input: PropTypes.object.isRequired,
  isEndDate: PropTypes.bool,
}

const defaultProps = {
  displaySubLabel: false,
  fluid: false,
  isEndDate: false,
}

class FlexibleDate extends Component {
  constructor(props) {
    super(props)
    this.handleValueOnBlur = this.handleValueOnBlur.bind(this)
    this.handleValueOnChange = this.handleValueOnChange.bind(this)
    this.handleValueOnFocus = this.handleValueOnFocus.bind(this)
  }

  handleValueOnBlur(event) {
    const { onBlur } = this.props.input
    if (!onBlur) {
      return null
    }
    return onBlur(event.target.value)
  }

  handleValueOnChange(event) {
    const { onChange } = this.props.input
    if (!onChange) {
      return null
    }
    return onChange(event.target.value)
  }

  handleValueOnFocus(event) {
    const { onFocus } = this.props.input
    if (!onFocus) {
      return null
    }
    return onFocus(event.target.value)
  }

  render() {
    const { displaySubLabel, fluid, input, isEndDate } = this.props
    const preview = getDateSuggestion({
      input,
      isEndDate,
    })
    const value = createDateTextValueFromInput({ input })

    const previewStyle = {
      position: 'absolute',
      right: 5,
      textAlign: 'left',
      top: 7,
      zIndex: 20,
    }

    return (
      <FieldTemplate
        displayLabel={!!displaySubLabel}
        enableHelpNotifications={false}
        float="left"
        label="Text"
        meta={{}}
        parameterKey=""
      >
        <Input
          fluid={fluid}
          name={input.name}
          onBlur={this.handleValueOnBlur}
          onChange={this.handleValueOnChange}
          onFocus={this.handleValueOnFocus}
          placeholder="yyyy-mm-dd"
          type="text"
          value={value || ''}
        />
        {preview &&
          preview !== value && (
            <button
              className="ui green tiny label"
              onClick={event => {
                event.preventDefault()
                this.handleValueOnChange({
                  target: {
                    value: preview,
                  },
                })
              }}
              onKeyDown={event => {
                event.preventDefault()
                this.handleValueOnChange({
                  target: {
                    value: preview,
                  },
                })
              }}
              style={previewStyle}
            >
              {preview}
            </button>
          )}
      </FieldTemplate>
    )
  }
}

FlexibleDate.propTypes = propTypes
FlexibleDate.defaultProps = defaultProps

export default FlexibleDate
