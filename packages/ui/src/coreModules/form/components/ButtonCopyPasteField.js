import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Form, Icon } from 'semantic-ui-react'

import FieldLabel from './FieldLabel'

const mapStateToProps = (state, { copyField, formValueSelector }) => {
  return {
    copyValue: formValueSelector(state, copyField),
  }
}

const propTypes = {
  arrowIcon: PropTypes.oneOf([
    'down arrow',
    'left arrow',
    'right arrow',
    'up arrow',
  ]),
  buttonClassNames: PropTypes.string,
  buttonText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  changeFieldValue: PropTypes.func.isRequired,
  copyField: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
  copyValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fluid: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  pasteField: PropTypes.string.isRequired,
}
const defaultProps = {
  arrowIcon: undefined,
  buttonClassNames: undefined,
  buttonText: undefined,
  copyValue: undefined,
  fluid: false,
  label: undefined,
}

const ButtonCopyPasteField = ({
  arrowIcon,
  buttonClassNames,
  buttonText,
  changeFieldValue,
  copyField,
  copyValue,
  fluid,
  label,
  pasteField,
}) => {
  return (
    <Form.Field style={{ position: 'relative' }}>
      {label && (
        <FieldLabel
          htmlFor={`copy ${copyField} to ${pasteField}`}
          label={label}
        />
      )}
      <Button
        className={buttonClassNames}
        fluid={fluid}
        icon
        labelPosition={buttonText && 'right'}
        onClick={event => {
          event.preventDefault()
          changeFieldValue(pasteField, copyValue)
        }}
      >
        {buttonText}
        <Icon name="copy" />
        {arrowIcon && <Icon name={arrowIcon} />}
      </Button>
    </Form.Field>
  )
}

ButtonCopyPasteField.propTypes = propTypes
ButtonCopyPasteField.defaultProps = defaultProps

export default connect(mapStateToProps)(ButtonCopyPasteField)
