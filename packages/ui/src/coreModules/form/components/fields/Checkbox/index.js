import React from 'react'
import PropTypes from 'prop-types'
import FieldTemplate from '../../FieldTemplate'
import CheckboxInput from '../../inputs/Checkbox'

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
}
const defaultProps = {
  errorScope: undefined,
  helpNotificationProps: undefined,
  helpText: undefined,
  label: undefined,
  required: false,
}

const CheckboxField = ({
  errorScope,
  label,
  input,
  meta,
  module,
  required,
  helpText,
  helpNotificationProps,
}) => {
  return (
    <FieldTemplate
      errorScope={errorScope}
      helpNotificationProps={helpNotificationProps}
      helpText={helpText}
      label={label}
      meta={meta}
      module={module}
      name={input.name}
      required={required}
    >
      <CheckboxInput input={input} />
    </FieldTemplate>
  )
}

CheckboxField.propTypes = propTypes
CheckboxField.defaultProps = defaultProps

export default CheckboxField
