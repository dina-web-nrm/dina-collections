import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import { Field } from 'coreModules/form/components'
import { MultipleChoiceCheckboxesField } from 'coreModules/search/components'

const conditionFilter = 'matchConditionTags'
const collectingConditionFieldName = `collectingCondition.collectingCondition|multipleChoice-${
  conditionFilter
}`

const propTypes = {
  formName: PropTypes.string.isRequired,
  getDrilldownQuery: PropTypes.func.isRequired,
}

class CollectingConditionFilterForm extends PureComponent {
  render() {
    const { formName, getDrilldownQuery } = this.props

    return (
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Column width={16}>
          <Field
            aggregationFunctionName="aggregateConditionTags"
            component={MultipleChoiceCheckboxesField}
            displayCount
            drillDownQuery={getDrilldownQuery(collectingConditionFieldName)}
            filterFunctionName={conditionFilter}
            formName={formName}
            label="Collecting condition"
            name={collectingConditionFieldName}
          />
        </Grid.Column>
      </Grid>
    )
  }
}

CollectingConditionFilterForm.propTypes = propTypes

export default CollectingConditionFilterForm
