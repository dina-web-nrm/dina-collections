import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from 'semantic-ui-react'

const propTypes = {
  input: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
}

const CheckboxInput = ({ input }) => {
  const { value, onChange: reduxFormOnChange, ...inputRest } = input
  const checked = !!value
  return (
    <Checkbox
      checked={checked}
      onChange={(event, data) => {
        reduxFormOnChange(data.checked)
      }}
      type="checkbox"
      {...inputRest}
    />
  )
}

CheckboxInput.propTypes = propTypes

export default CheckboxInput
