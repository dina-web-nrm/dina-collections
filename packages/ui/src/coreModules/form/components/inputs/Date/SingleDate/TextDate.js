import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'semantic-ui-react'
import FieldTemplate from '../../../FieldTemplate'

const propTypes = {
  displaySubLabel: PropTypes.bool,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
}

const defaultProps = {
  displaySubLabel: false,
}

class TextDate extends Component {
  constructor(props) {
    super(props)
    this.handleValueOnChange = this.handleValueOnChange.bind(this)
    this.getFieldMeta = this.getFieldMeta.bind(this)
  }
  getFieldMeta() {
    const { meta } = this.props
    const fieldMeta =
      meta && meta.error && meta.error.dateText
        ? {
            ...meta,
            error: meta.errordateText,
          }
        : { ...meta, error: undefined }
    return fieldMeta
  }

  handleValueOnChange(event) {
    const { onChange } = this.props.input
    if (!onChange) {
      return null
    }
    return onChange(event.target.value)
  }

  render() {
    const { displaySubLabel, input } = this.props
    return (
      <FieldTemplate
        displayLabel={!!displaySubLabel}
        enableHelpNotifications={false}
        float="left"
        label="Text"
        meta={this.getFieldMeta()}
        parameterKey=""
      >
        <Input
          onChange={this.handleValueOnChange}
          placeholder="date text"
          type="text"
          value={input.value || ''}
        />
      </FieldTemplate>
    )
  }
}

TextDate.propTypes = propTypes
TextDate.defaultProps = defaultProps

export default TextDate
