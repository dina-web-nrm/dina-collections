import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import { SingleDate, Field } from 'coreModules/form/components'
import { MultipleChoiceCheckboxesField } from 'coreModules/search/components'

const filterFunctionName = 'matchDateTags'
const multipleChoiceName = `date.dateType|multipleChoice-${filterFunctionName}`
const fromDateFieldName = 'date.start'
const toDateFieldName = 'date.end'

const propTypes = {
  getDrilldownQuery: PropTypes.func.isRequired,
}

class DatePeriodFilterForm extends PureComponent {
  render() {
    const { getDrilldownQuery } = this.props

    return (
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Row>
          <Grid.Column width={8}>
            <SingleDate
              autoComplete="off"
              displayExact={false}
              displayFlexible
              fluid
              label="from"
              module="collectionMammals"
              name={fromDateFieldName}
              past
            />
          </Grid.Column>
          <Grid.Column width={8}>
            <SingleDate
              autoComplete="off"
              displayExact={false}
              displayFlexible
              fluid
              label="to"
              module="collectionMammals"
              name={toDateFieldName}
              past
            />
          </Grid.Column>
        </Grid.Row>
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
