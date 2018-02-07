import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'semantic-ui-react'
import { FormFieldError } from '../../error/components'
import FieldLabel from './FieldLabel'

const propTypes = {
  autoComplete: PropTypes.string,
  errorScope: PropTypes.string,
  helpNotificationProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  helpText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  icon: PropTypes.string,
  iconPosition: PropTypes.string,
  input: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  meta: PropTypes.shape({
    error: PropTypes.object,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
  module: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  scope: PropTypes.string,
  type: PropTypes.string.isRequired,
}
const defaultProps = {
  autoComplete: undefined,
  errorScope: undefined,
  helpNotificationProps: undefined,
  helpText: undefined,
  icon: undefined,
  iconPosition: 'left',
  label: undefined,
  placeholder: undefined,
  required: false,
  scope: undefined,
}

const InputField = ({
  autoComplete,
  errorScope,
  label,
  icon,
  iconPosition,
  input,
  meta: { touched, error },
  module,
  placeholder,
  required,
  helpText,
  helpNotificationProps,
  scope,
  type,
}) => {
  const displayError = touched && !!error

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
      <Input
        autoComplete={autoComplete}
        icon={icon}
        iconPosition={icon && iconPosition}
        placeholder={placeholder}
        scope={scope}
        type={type}
        {...input}
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

InputField.propTypes = propTypes
InputField.defaultProps = defaultProps

export default InputField
