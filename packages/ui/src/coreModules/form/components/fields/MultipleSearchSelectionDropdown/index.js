import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'
import extractProps from 'utilities/extractProps'
import MultipleSearchSelectionDropdownConnectInput from '../../inputs/MultipleSearchSelectionDropdown/Connect'
import MultipleSearchSelectionDropdownLocalInput from '../../inputs/MultipleSearchSelectionDropdown/Local'

import FieldTemplate, { fieldTemplatePropKeys } from '../../FieldTemplate'

const propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    ),
  }).isRequired,
  leftButton: PropTypes.node,
  rightButton: PropTypes.node,
  type: PropTypes.string.isRequired,
}

const defaultProps = {
  leftButton: undefined,
  rightButton: undefined,
}

function MultipleSearchSelectionDropdownField(props) {
  let Component
  const { type, leftButton, rightButton, input } = props

  switch (type) {
    case 'multiple-search-selection-dropdown-connect': {
      Component = MultipleSearchSelectionDropdownConnectInput
      break
    }
    case 'multiple-search-selection-dropdown-local': {
      Component = MultipleSearchSelectionDropdownLocalInput
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
        <Button.Group style={{ width: '100%' }}>
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

MultipleSearchSelectionDropdownField.propTypes = propTypes
MultipleSearchSelectionDropdownField.defaultProps = defaultProps

export default MultipleSearchSelectionDropdownField
