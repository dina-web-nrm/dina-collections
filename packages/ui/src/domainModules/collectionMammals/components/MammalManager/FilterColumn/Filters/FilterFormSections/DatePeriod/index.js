import React, { PureComponent } from 'react'

import { Grid } from 'semantic-ui-react'
import { RangeDate, Field } from 'coreModules/form/components'

class DatePeriodFilterForm extends PureComponent {
  render() {
    return (
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Column width={16}>
          <Field
            component={RangeDate}
            displayDateTypeRadios={false}
            displayEndDateLabel
            displayStartDateLabel
            displaySubLabels
            enableHelpNotifications={false}
            endDateLabel="Latest date"
            initialDateType="range"
            module="collectionMammals"
            name="datePeriod.date"
            stack
            startDateLabel="Earliest date"
          />
        </Grid.Column>
      </Grid>
    )
  }
}

export default DatePeriodFilterForm
