import React from 'react'
import PropTypes from 'prop-types'
import TextInput from '../../inputs/Input/Text'

import FieldTemplate, {
  defaultProps as fieldTemplateDefaultProps,
  propTypes as fieldTemplatePropTypes,
} from '../../FieldTemplate'

const propTypes = {
  ...fieldTemplatePropTypes,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
  type: PropTypes.string.isRequired,
}
const defaultProps = {
  ...fieldTemplateDefaultProps,
}

function Input({
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
  let castType
  switch (type) {
    case 'input-text': {
      Component = TextInput
      castType = 'text'
      break
    }
    case 'text': {
      Component = TextInput
      castType = 'text'
      break
    }
    case 'number': {
      Component = TextInput
      castType = 'number'
      break
    }
    case 'password': {
      Component = TextInput
      castType = 'password'
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
      <Component {...rest} input={input} type={castType} />
    </FieldTemplate>
  )
}

Input.propTypes = propTypes
Input.defaultProps = defaultProps

export default Input
