import React from 'react'
import PropTypes from 'prop-types'

import { Translate } from 'coreModules/i18n/components'
import { FormFieldHelpIcon } from 'coreModules/notifications/components'
import injectHelpNotificationProps from '../../higherOrderComponents/injectHelpNotificationProps'
import injectLabelKey from '../../higherOrderComponents/injectLabelKey'

const propTypes = {
  helpNotificationProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  helpText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  htmlFor: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  labelKey: PropTypes.string,
  required: PropTypes.bool,
  subLabel: PropTypes.bool,
}
const defaultProps = {
  helpNotificationProps: undefined,
  helpText: undefined,
  htmlFor: undefined,
  label: undefined,
  labelKey: undefined,
  required: false,
  subLabel: false,
}
const FieldLabel = ({
  helpNotificationProps,
  helpText,
  htmlFor,
  label: translatedLabel,
  labelKey,
  required,
  subLabel,
}) => {
  const style = subLabel
    ? {
        display: 'inline-block',
        fontSize: '0.9em',
        fontStyle: 'italic',
        fontWeight: 400,
        margin: 0,
      }
    : {
        display: 'inline-block',
      }

  const helpIconWrapperStyle = required
    ? {
        display: 'inline-block',
        marginLeft: '0.25em',
      }
    : {
        display: 'inline-block',
      }

  const label = translatedLabel || <Translate capitalize textKey={labelKey} />
  return (
    <React.Fragment>
      <label htmlFor={htmlFor} style={style}>
        {label}
        {
          // this ugly stuff is required since currently translations can only
          // be components
        }
        {helpText && ' ('}
        {helpText && helpText}
        {helpText && ')'}
        {helpNotificationProps && ' '}
      </label>
      {helpNotificationProps && (
        // this is outside of label to make required asterisk come before help icon
        <div style={helpIconWrapperStyle}>
          <FormFieldHelpIcon helpNotificationProps={helpNotificationProps} />
        </div>
      )}
    </React.Fragment>
  )
}

FieldLabel.propTypes = propTypes
FieldLabel.defaultProps = defaultProps

export default injectLabelKey(injectHelpNotificationProps(FieldLabel))
