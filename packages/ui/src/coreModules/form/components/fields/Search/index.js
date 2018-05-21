import React from 'react'
import PropTypes from 'prop-types'
import extractProps from 'utilities/extractProps'
import ConnectSearchInput from '../../inputs/Search/Connect'
import FieldTemplate, { fieldTemplatePropKeys } from '../../FieldTemplate'

const propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
  }).isRequired,
  type: PropTypes.string.isRequired,
}

function Search(props) {
  let Component
  const { input, type } = props

  switch (type) {
    case 'search-connect': {
      Component = ConnectSearchInput
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

Search.propTypes = propTypes

export default Search
