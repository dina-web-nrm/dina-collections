import React, { PureComponent } from 'react'

import { Grid } from 'semantic-ui-react'

import { MultipleChoiceCheckboxesField } from 'coreModules/search/components'
import { RangeDate, Field } from 'coreModules/form/components'
import { higherOrderComponents } from '../../../queryBuilder'

const WrappedMultipleChoiceCheckboxesField = higherOrderComponents.createFieldHoc()(
  MultipleChoiceCheckboxesField
)

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
            endDateLabel="Latest date"
            initialDateType="range"
            module="collectionMammals"
            name="datePeriod.date"
            stack
            startDateLabel="Earliest date"
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Field
            component={WrappedMultipleChoiceCheckboxesField}
            displayCount
            label="Activity"
            name="datePeriod.types"
            resource="searchSpecimen"
          />
        </Grid.Column>
      </Grid>
    )
  }
}

export default DatePeriodFilterForm
