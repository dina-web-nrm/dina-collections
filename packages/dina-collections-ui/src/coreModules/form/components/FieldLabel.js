import React from 'react'
import PropTypes from 'prop-types'

import { FormFieldHelpIcon } from 'coreModules/notifications/components'

const propTypes = {
  helpNotificationProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  helpText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}
const defaultProps = {
  helpNotificationProps: undefined,
  helpText: undefined,
  label: undefined,
}
const FieldLabel = ({ label, htmlFor, helpNotificationProps, helpText }) => {
  return (
    <label htmlFor={htmlFor}>
      {label}
      {
        // this ugly stuff is required since currently translations can only
        // be components
      }
      {helpText && ' ('}
      {helpText && helpText}
      {helpText && ')'}
      {helpNotificationProps && ' '}
      {helpNotificationProps && (
        <FormFieldHelpIcon helpNotificationProps={helpNotificationProps} />
      )}
    </label>
  )
}

FieldLabel.propTypes = propTypes
FieldLabel.defaultProps = defaultProps

export default FieldLabel
