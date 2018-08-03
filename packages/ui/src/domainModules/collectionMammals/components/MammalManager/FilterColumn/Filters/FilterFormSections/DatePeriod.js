import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import { DateRange, Field } from 'coreModules/form/components'
import { MultipleChoiceCheckboxesField } from 'coreModules/search/components'

const filterFunctionName = 'searchCollectingLocation'
const multipleChoiceName = `date.dateType|multipleChoice-${filterFunctionName}`

const propTypes = {
  formName: PropTypes.string.isRequired,
  getDrilldownQuery: PropTypes.func.isRequired,
}

class DatePeriodFilterForm extends PureComponent {
  render() {
    const { formName, getDrilldownQuery } = this.props

    return (
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Column width={16}>
          <DateRange
            autoComplete="off"
            formName={formName}
            module="collectionMammals"
            name="date.dateRange"
            stack={false}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Field
            aggregationFunctionName="identifiers"
            aggregationLimit={10}
            component={MultipleChoiceCheckboxesField}
            drillDownQuery={getDrilldownQuery(multipleChoiceName)}
            filterFunctionName={filterFunctionName}
            label="Activity"
            name={multipleChoiceName}
          />
        </Grid.Column>
      </Grid>
    )
  }
}

DatePeriodFilterForm.propTypes = propTypes

export default DatePeriodFilterForm
