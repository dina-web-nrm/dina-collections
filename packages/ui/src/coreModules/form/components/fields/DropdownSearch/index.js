import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'
import DropdownSearchConnectInput from '../../inputs/DropdownSearch/Connect'
import DropdownSearchLocalInput from '../../inputs/DropdownSearch/Local'

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

function Select({
  errorScope,
  helpNotificationProps,
  helpText,
  input,
  label,
  meta,
  module,
  required,
  type,
  leftButton,
  rightButton,
  ...rest
}) {
  let Component

  switch (type) {
    case 'dropdown-search-connect': {
      Component = DropdownSearchConnectInput
      break
    }
    case 'dropdown-search-local': {
      Component = DropdownSearchLocalInput
      break
    }
    default: {
      throw new Error(`Type: ${type} is not supported`)
    }
  }

  const { name } = input
  const displayAsButton = !!(leftButton || rightButton)
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
      {displayAsButton ? (
        <Button.Group>
          {leftButton}

          <Component
            displayAsButton={displayAsButton}
            {...rest}
            input={input}
          />

          {rightButton}
        </Button.Group>
      ) : (
        <Component {...rest} input={input} />
      )}
    </FieldTemplate>
  )
}

Select.propTypes = propTypes
Select.defaultProps = defaultProps

export default Select
