import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import { RangeDate, Field } from 'coreModules/form/components'
import { MultipleChoiceCheckboxesField } from 'coreModules/search/components'

const filterFunctionName = 'matchDateTags'
const multipleChoiceName = `date.dateType|multipleChoice-${filterFunctionName}`

const propTypes = {
  getDrilldownQuery: PropTypes.func.isRequired,
}

class DatePeriodFilterForm extends PureComponent {
  render() {
    const { getDrilldownQuery } = this.props

    return (
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Column width={16}>
          <Field
            component={RangeDate}
            displayDateTypeRadios
            label="from"
            module="collectionMammals"
            name="date"
            stack
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Field
            aggregationFunctionName="aggregateDateTags"
            component={MultipleChoiceCheckboxesField}
            displayCount
            drillDownQuery={getDrilldownQuery(multipleChoiceName)}
            filterFunctionName={filterFunctionName}
            label="Activity"
            name={multipleChoiceName}
            resource="searchSpecimen"
          />
        </Grid.Column>
      </Grid>
    )
  }
}

DatePeriodFilterForm.propTypes = propTypes

export default DatePeriodFilterForm
