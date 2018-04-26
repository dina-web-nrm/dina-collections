import React from 'react'
import PropTypes from 'prop-types'
import ReadOnly from '../../inputs/CustomData/ReadOnly'

import FieldTemplate, {
  defaultProps as fieldTemplateDefaultProps,
  propTypes as fieldTemplatePropTypes,
} from '../../FieldTemplate'

const propTypes = {
  ...fieldTemplatePropTypes,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  type: PropTypes.string.isRequired,
}
const defaultProps = {
  ...fieldTemplateDefaultProps,
}

function CustomData({
  errorScope,
  helpNotificationProps,
  helpText,
  input,
  label,
  meta,
  module,
  required,
  type,
  ...rest
}) {
  let Component

  switch (type) {
    case 'read-only': {
      Component = ReadOnly
      break
    }
    default: {
      throw new Error(`Type: ${type} is not supported`)
    }
  }

  const { name } = input
  return (
    <FieldTemplate
      errorScope={errorScope}
      helpNotificationProps={helpNotificationProps}
      helpText={helpText}
      label={label}
      meta={meta}
      module={module}
      name={name}
      required={required}
    >
      <Component {...rest} input={input} />
    </FieldTemplate>
  )
}

CustomData.propTypes = propTypes
CustomData.defaultProps = defaultProps

export default CustomData
