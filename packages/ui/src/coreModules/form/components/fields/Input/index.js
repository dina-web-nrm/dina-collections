import React from 'react'
import PropTypes from 'prop-types'
import extractProps from 'utilities/extractProps'
import TextInput from '../../inputs/Input/Text'
import FieldTemplate, { fieldTemplatePropKeys } from '../../FieldTemplate'

const propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
  type: PropTypes.string.isRequired,
}

function Input(props) {
  const { input, type } = props
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

  const { extractedProps: fieldTemplateProps, rest } = extractProps({
    keys: fieldTemplatePropKeys,
    props,
  })

  return (
    <FieldTemplate {...fieldTemplateProps} name={name}>
      <Component {...rest} input={input} type={castType} />
    </FieldTemplate>
  )
}

Input.propTypes = propTypes

export default Input
