import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from 'semantic-ui-react'

const propTypes = {
  disabled: PropTypes.bool,
  input: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  label: PropTypes.any,
}

const defaultProps = {
  disabled: false,
  label: undefined,
}

const CheckboxInput = ({ disabled, input, label }) => {
  const { value, onChange: reduxFormOnChange, ...inputRest } = input
  const checked = !!value
  return (
    <Checkbox
      checked={checked}
      disabled={disabled}
      label={label}
      onChange={(event, data) => {
        reduxFormOnChange(data.checked)
      }}
      type="checkbox"
      {...inputRest}
    />
  )
}

CheckboxInput.propTypes = propTypes
CheckboxInput.defaultProps = defaultProps

export default CheckboxInput
