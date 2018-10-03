import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'

const propTypes = {
  autoComplete: PropTypes.string,
  autoHeight: PropTypes.bool,
  disabled: PropTypes.bool,
  inline: PropTypes.bool,
  input: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  label: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  style: PropTypes.object,
  type: PropTypes.string,
  width: PropTypes.number,
}
const defaultProps = {
  autoComplete: undefined,
  autoHeight: false,
  disabled: false,
  inline: false,
  label: undefined,
  placeholder: undefined,
  rows: 3,
  style: {},
  type: 'text',
  width: 16,
}

const TextAreaInput = ({
  autoComplete,
  autoHeight,
  disabled,
  inline,
  input,
  label,
  placeholder,
  rows,
  type,
  style,
  width,
}) => {
  return (
    <Form.TextArea
      autoComplete={autoComplete}
      autoHeight={autoHeight}
      disabled={disabled}
      inline={inline}
      label={label}
      placeholder={placeholder}
      rows={rows}
      type={type}
      {...input}
      style={{ width: '100%', ...style }}
      width={width}
    />
  )
}

TextAreaInput.propTypes = propTypes
TextAreaInput.defaultProps = defaultProps

export default TextAreaInput
