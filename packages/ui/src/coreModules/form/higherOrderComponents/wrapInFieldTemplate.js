import React from 'react'
import PropTypes from 'prop-types'

import extractProps from 'utilities/extractProps'
import FieldTemplate, {
  defaultProps as fieldTemplateDefaultProps,
  fieldTemplatePropKeys,
  propTypes as fieldTemplatePropTypes,
} from 'coreModules/form/components/FieldTemplate'
import FieldLabel from 'coreModules/form/components/FieldTemplate/FieldLabel'
import { createParameterKey } from 'coreModules/form/utilities'

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

export default function wrapInFieldTemplate(ComposedComponent) {
  const WrappedInFieldTemplate = props => {
    const {
      displayLabel,
      enableHelpNotifications,
      helpNotificationProps,
      helpText,
      inline,
      input,
      label,
      meta,
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
        meta={meta}
        name={input.name}
      >
        <ComposedComponent {...rest} />
      </FieldTemplate>
    )
  }

  WrappedInFieldTemplate.propTypes = propTypes
  WrappedInFieldTemplate.defaultProps = defaultProps

  return WrappedInFieldTemplate
}
