import React from 'react'
import PropTypes from 'prop-types'
import extractProps from 'utilities/extractProps'
import FieldTemplate, {
  defaultProps as fieldTemplateDefaultProps,
  fieldTemplatePropKeys,
  propTypes as fieldTemplatePropTypes,
} from '../../FieldTemplate'

import CheckboxInput from '../../inputs/Checkbox'
import FieldLabel from '../../FieldTemplate/FieldLabel'
import { createParameterKey } from '../../../utilities'

const propTypes = {
  inline: PropTypes.bool,
  input: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  required: PropTypes.bool,
  ...fieldTemplatePropTypes,
}
const defaultProps = {
  inline: false,
  ...fieldTemplateDefaultProps,
}

const CheckboxField = props => {
  const {
    displayLabel,
    enableHelpNotifications,
    helpNotificationProps,
    helpText,
    inline,
    input,
    label,
    model,
    module,
    parameterKeyInput,
  } = props
  const parameterKey =
    parameterKeyInput ||
    createParameterKey({
      model,
      name: input.name,
    })

  const fieldLabel = inline ? (
    <FieldLabel
      enableHelpNotifications={enableHelpNotifications}
      helpNotificationProps={helpNotificationProps}
      helpText={helpText}
      htmlFor={input.name}
      label={label}
      module={module}
      parameterKey={parameterKey}
    />
  ) : (
    undefined
  )

  const { extractedProps: fieldTemplateProps, rest } = extractProps({
    keys: fieldTemplatePropKeys,
    props,
  })

  return (
    <FieldTemplate
      {...fieldTemplateProps}
      displayLabel={!fieldLabel && displayLabel}
      label={fieldLabel ? undefined : label}
      name={input.name}
    >
      <CheckboxInput {...rest} label={fieldLabel} />
    </FieldTemplate>
  )
}

CheckboxField.propTypes = propTypes
CheckboxField.defaultProps = defaultProps

export default CheckboxField
