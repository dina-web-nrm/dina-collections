import React from 'react'
import PropTypes from 'prop-types'
import extractProps from 'utilities/extractProps'
import TextAreaInput from '../../inputs/TextArea'

import FieldTemplate, { fieldTemplatePropKeys } from '../../FieldTemplate'

const propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
  type: PropTypes.string.isRequired,
}

function TextArea(props) {
  const { input } = props

  const { extractedProps: fieldTemplateProps, rest } = extractProps({
    keys: fieldTemplatePropKeys,
    props,
  })

  return (
    <FieldTemplate {...fieldTemplateProps} name={input.name}>
      <TextAreaInput {...rest} />
    </FieldTemplate>
  )
}

TextArea.propTypes = propTypes

export default TextArea
