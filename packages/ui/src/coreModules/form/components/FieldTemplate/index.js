import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'
import FieldError from './FieldError'
import FieldLabel from './FieldLabel'
import injectParameterKey from '../../higherOrderComponents/injectParameterKey'

export const propTypes = {
  children: PropTypes.node,
  displayLabel: PropTypes.bool,
  enableHelpNotifications: PropTypes.bool,
  helpNotificationProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  helpText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  meta: PropTypes.shape({
    error: PropTypes.object,
    touched: PropTypes.bool,
  }).isRequired,
  model: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  module: PropTypes.string.isRequired,
  name: PropTypes.string,
  parameterKey: PropTypes.string,
  required: PropTypes.bool,
}
export const defaultProps = {
  children: undefined,
  displayLabel: true,
  enableHelpNotifications: true,
  helpNotificationProps: undefined,
  helpText: undefined,
  label: undefined,
  model: undefined,
  name: undefined,
  parameterKey: undefined,
  required: false,
}

export const fieldTemplatePropKeys = Object.keys(propTypes)

const FieldTemplate = ({
  children,
  displayLabel,
  enableHelpNotifications,
  helpNotificationProps,
  helpText,
  label,
  meta: { error, touched },
  module,
  name,
  parameterKey,
  required,
}) => {
  const displayError = touched && !!error
  return (
    <Form.Field
      error={displayError}
      required={required}
      style={{ position: 'relative' }}
    >
      {displayLabel && (
        <FieldLabel
          enableHelpNotifications={enableHelpNotifications}
          helpNotificationProps={helpNotificationProps}
          helpText={helpText}
          htmlFor={name}
          label={label}
          module={module}
          parameterKey={parameterKey}
        />
      )}
      {helpText && <p>{helpText}</p>}
      {children}
      {displayError && (
        <FieldError error={error} module={module} parameterKey={parameterKey} />
      )}
    </Form.Field>
  )
}

FieldTemplate.propTypes = propTypes
FieldTemplate.defaultProps = defaultProps

export default injectParameterKey(FieldTemplate)
