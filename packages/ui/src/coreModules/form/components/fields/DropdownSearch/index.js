import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'
import extractProps from 'utilities/extractProps'
import DropdownSearchConnectInput from '../../inputs/DropdownSearch/Connect'
import DropdownSearchIdTextInput from '../../inputs/DropdownSearch/IdText'
import DropdownSearchLocalInput from '../../inputs/DropdownSearch/Local'
import DropdownSearchResource from '../../inputs/DropdownSearch/Resource'

import FieldTemplate, { fieldTemplatePropKeys } from '../../FieldTemplate'

const propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
  }).isRequired,
  leftButton: PropTypes.node,
  meta: PropTypes.object.isRequired,
  rightButton: PropTypes.node,
  type: PropTypes.string.isRequired,
}

const defaultProps = {
  leftButton: undefined,
  rightButton: undefined,
}

function Select(props) {
  let Component
  const { input, leftButton, meta, rightButton, type } = props

  switch (type) {
    case 'dropdown-search-connect': {
      Component = DropdownSearchConnectInput
      break
    }
    case 'dropdown-search-id-text': {
      Component = DropdownSearchIdTextInput
      break
    }
    case 'dropdown-search-local': {
      Component = DropdownSearchLocalInput
      break
    }

    case 'dropdown-search-resource': {
      Component = DropdownSearchResource
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

  const displayAsButton = !!(leftButton || rightButton)
  return (
    <FieldTemplate {...fieldTemplateProps} name={input.name}>
      {displayAsButton ? (
        <Button.Group>
          {leftButton}

          <Component
            displayAsButton={displayAsButton}
            {...rest}
            input={input}
            meta={meta}
          />

          {rightButton}
        </Button.Group>
      ) : (
        <Component {...rest} input={input} meta={meta} />
      )}
    </FieldTemplate>
  )
}

Select.propTypes = propTypes
Select.defaultProps = defaultProps

export default Select
