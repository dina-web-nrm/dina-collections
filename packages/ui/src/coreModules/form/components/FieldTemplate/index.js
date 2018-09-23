import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'
import FieldError from './FieldError'
import FieldLabel from './FieldLabel'
import injectParameterKey from '../../higherOrderComponents/injectParameterKey'

export const propTypes = {
  children: PropTypes.node,
  displayError: PropTypes.bool,
  displayLabel: PropTypes.bool,
  enableHelpNotifications: PropTypes.bool,
  errorStyle: PropTypes.object,
  float: PropTypes.string,
  helpNotificationProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  helpText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  meta: PropTypes.shape({
    error: PropTypes.object,
    touched: PropTypes.bool,
  }),
  model: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  module: PropTypes.string,
  name: PropTypes.string,
  parameterKey: PropTypes.string,
  required: PropTypes.bool,
  subLabel: PropTypes.bool,
}
export const defaultProps = {
  children: undefined,
  displayError: undefined,
  displayLabel: true,
  enableHelpNotifications: true,
  errorStyle: undefined,
  float: undefined,
  helpNotificationProps: undefined,
  helpText: undefined,
  label: undefined,
  meta: {},
  model: undefined,
  module: undefined,
  name: undefined,
  parameterKey: undefined,
  required: false,
  subLabel: undefined,
}

export const fieldTemplatePropKeys = Object.keys(propTypes)

const FieldTemplate = ({
  children,
  displayError: displayErrorInput,
  displayLabel,
  enableHelpNotifications,
  errorStyle,
  float,
  helpNotificationProps,
  helpText,
  label,
  meta,
  module,
  name,
  parameterKey,
  required,
  subLabel,
}) => {
  const { error, touched, warning } = meta
  const displayError =
    displayErrorInput !== undefined ? displayErrorInput : touched && !!error

  const displayWarning = touched && !!warning

  return (
    <Form.Field
      error={displayError}
      required={required}
      style={{ float, position: 'relative', width: float ? '100%' : undefined }}
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
          subLabel={subLabel}
        />
      )}
      {helpText && <p>{helpText}</p>}
      {children}
      {!displayError &&
        displayWarning && (
          <FieldError
            error={warning}
            module={module}
            parameterKey={parameterKey}
            warning
          />
        )}
      {displayError && (
        <FieldError
          error={error}
          module={module}
          parameterKey={parameterKey}
          style={errorStyle}
        />
      )}
    </Form.Field>
  )
}

FieldTemplate.propTypes = propTypes
FieldTemplate.defaultProps = defaultProps

export default injectParameterKey(FieldTemplate)
