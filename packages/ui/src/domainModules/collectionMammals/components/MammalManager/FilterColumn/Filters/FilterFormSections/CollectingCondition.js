import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import { Field } from 'coreModules/form/components'
import { MultipleChoiceCheckboxesField } from 'coreModules/search/components'

const collectingConditionFilter = 'searchCollectingLocation'
const collectingConditionFieldName = `collectingCondition.collectingCondition|multipleChoice-${
  collectingConditionFilter
}`

const propTypes = {
  getDrilldownQuery: PropTypes.func.isRequired,
}

class CollectingConditionFilterForm extends PureComponent {
  render() {
    const { getDrilldownQuery } = this.props

    return (
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Column width={16}>
          <Field
            aggregationFunctionName="identifiers"
            aggregationLimit={10}
            component={MultipleChoiceCheckboxesField}
            drillDownQuery={getDrilldownQuery(collectingConditionFieldName)}
            filterFunctionName={collectingConditionFilter}
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
