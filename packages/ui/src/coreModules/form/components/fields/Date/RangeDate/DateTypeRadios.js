import React from 'react'
import PropTypes from 'prop-types'
import { Radio } from 'semantic-ui-react'

import FieldTemplate from '../../../FieldTemplate'

const propTypes = {
  dateType: PropTypes.string.isRequired,
  dateTypes: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  enableHelpNotifications: PropTypes.bool,
  module: PropTypes.string,
  name: PropTypes.string,
  onDateTypeChange: PropTypes.func.isRequired,
}

const defaultProps = {
  enableHelpNotifications: undefined,
  module: undefined,
  name: undefined,
}

const DateTypeRadios = ({
  dateType: currentDateType,
  dateTypes,
  enableHelpNotifications,
  module,
  name,
  onDateTypeChange: handleDateTypeChange,
}) => {
  return (
    <FieldTemplate
      enableHelpNotifications={enableHelpNotifications}
      label="Date type"
      meta={{}}
      module={module}
      name={name}
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
DateTypeRadios.defaultProps = defaultProps

export default DateTypeRadios
