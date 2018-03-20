import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'
import { FormFieldError } from '../../../error/components'
import FieldLabel from './FieldLabel'

export const propTypes = {
  children: PropTypes.node,
  errorScope: PropTypes.string,
  helpNotificationProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  helpText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  meta: PropTypes.shape({
    error: PropTypes.object,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
  module: PropTypes.string.isRequired,
  name: PropTypes.string,
  required: PropTypes.bool,
}
export const defaultProps = {
  children: undefined,
  errorScope: undefined,
  helpNotificationProps: undefined,
  helpText: undefined,
  label: undefined,
  name: undefined,
  required: false,
}

const FieldTemplate = ({
  children,
  errorScope,
  helpNotificationProps,
  helpText,
  label,
  meta: { error, touched },
  module,
  name,
  required,
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
          htmlFor={name}
          label={label}
        />
      )}
      {helpText && <p>{helpText}</p>}
      {children}
      {displayError && (
        <FormFieldError
          error={error}
          module={module}
          scope={errorScope || name}
        />
      )}
    </Form.Field>
  )
}

FieldTemplate.propTypes = propTypes
FieldTemplate.defaultProps = defaultProps

export default FieldTemplate
