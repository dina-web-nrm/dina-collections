import React from 'react'
import PropTypes from 'prop-types'
import { Form, Checkbox } from 'semantic-ui-react'
import { FormFieldError } from '../../error/components'
import FieldLabel from './FieldLabel'

const propTypes = {
  errorScope: PropTypes.string,
  helpNotificationProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  helpText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  input: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  meta: PropTypes.shape({
    error: PropTypes.object,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
  module: PropTypes.string.isRequired,
  required: PropTypes.bool,
  scope: PropTypes.string,
  type: PropTypes.string.isRequired,
}
const defaultProps = {
  errorScope: undefined,
  helpNotificationProps: undefined,
  helpText: undefined,
  label: undefined,
  required: false,
  scope: undefined,
}

const CheckboxField = ({
  errorScope,
  helpNotificationProps,
  label,
  input,
  meta: { touched, error },
  module,
  required,
  helpText,
  scope,
  type,
}) => {
  const displayError = touched && !!error

  const { value, onChange: reduxFormOnChange, ...inputRest } = input

  return (
    <Form.Field
      error={displayError}
      required={required}
      style={{ position: 'relative' }}
    >
      {(label || helpNotificationProps) && (
        <FieldLabel
          helpNotificationProps={helpNotificationProps}
          helpText={helpText}
          htmlFor={input.name}
          label={label}
        />
      )}
      {helpText && <p>{helpText}</p>}
      <Checkbox
        checked={!!value}
        onChange={(event, data) => {
          reduxFormOnChange(data.checked)
        }}
        scope={scope}
        type={type}
        {...inputRest}
      />
      {displayError && (
        <FormFieldError
          error={error}
          module={module}
          scope={errorScope || input.name}
        />
      )}
    </Form.Field>
  )
}

CheckboxField.propTypes = propTypes
CheckboxField.defaultProps = defaultProps

export default CheckboxField
