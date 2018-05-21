import React from 'react'
import PropTypes from 'prop-types'
import extractProps from 'utilities/extractProps'
import ReadOnly from '../../inputs/CustomData/ReadOnly'
import FieldTemplate, { fieldTemplatePropKeys } from '../../FieldTemplate'

const propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  type: PropTypes.string.isRequired,
}

function CustomData(props) {
  let Component
  const { input, type } = props

  switch (type) {
    case 'read-only': {
      Component = ReadOnly
      break
    }
    default: {
      throw new Error(`Type: ${type} is not supported`)
    }
  }

  const { extractedProps: fieldTemplateProps, rest } = extractProps({
    keys: fieldTemplatePropKeys,
    props,
  })

  return (
    <FieldTemplate {...fieldTemplateProps} name={input.name}>
      <Component {...rest} />
    </FieldTemplate>
  )
}

CustomData.propTypes = propTypes

export default CustomData
