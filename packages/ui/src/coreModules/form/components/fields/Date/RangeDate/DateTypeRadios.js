import React from 'react'
import PropTypes from 'prop-types'
import { Radio } from 'semantic-ui-react'

import FieldTemplate from '../../../FieldTemplate'

const propTypes = {
  dateType: PropTypes.string.isRequired,
  dateTypes: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onDateTypeChange: PropTypes.func.isRequired,
}

const DateTypeRadios = ({
  dateType: currentDateType,
  dateTypes,
  onDateTypeChange: handleDateTypeChange,
}) => {
  return (
    <FieldTemplate
      enableHelpNotifications={false}
      label="Date type"
      meta={{}}
      name="radioGroup"
      style={{ marginBottom: '0.5em', width: '100%' }}
      subLabel
    >
      {dateTypes.map(dateType => {
        return (
          <Radio
            checked={currentDateType === dateType}
            className="inline group"
            key={dateType}
            label={dateType}
            name="radioGroup"
            onChange={handleDateTypeChange}
            value={dateType}
          />
        )
      })}
    </FieldTemplate>
  )
}

DateTypeRadios.propTypes = propTypes

export default DateTypeRadios
