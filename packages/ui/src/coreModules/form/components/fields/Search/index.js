import React from 'react'
import PropTypes from 'prop-types'
import ConnectSearchInput from '../../inputs/Search/Connect'

import FieldTemplate, {
  defaultProps as fieldTemplateDefaultProps,
  propTypes as fieldTemplatePropTypes,
} from '../../FieldTemplate'

const propTypes = {
  ...fieldTemplatePropTypes,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
  }).isRequired,
  type: PropTypes.string.isRequired,
}
const defaultProps = {
  ...fieldTemplateDefaultProps,
}

function Search({
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
    case 'search-connect': {
      Component = ConnectSearchInput
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

Search.propTypes = propTypes
Search.defaultProps = defaultProps

export default Search
