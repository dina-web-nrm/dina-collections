import React from 'react'
import PropTypes from 'prop-types'

import { Translate } from 'coreModules/i18n/components'
import { FormFieldHelpIcon } from 'coreModules/notifications/components'
import injectHelpNotificationProps from '../../higherOrderComponents/injectHelpNotificationProps'
import injectLabelKey from '../../higherOrderComponents/injectLabelKey'

const propTypes = {
  helpNotificationProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  helpText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  labelKey: PropTypes.string,
}
const defaultProps = {
  helpNotificationProps: undefined,
  helpText: undefined,
  label: undefined,
  labelKey: undefined,
}
const FieldLabel = ({
  helpNotificationProps,
  helpText,
  htmlFor,
  label: translatedLabel,
  labelKey,
}) => {
  const label = <Translate capitalize textKey={labelKey} />
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

export default injectLabelKey(injectHelpNotificationProps(FieldLabel))
