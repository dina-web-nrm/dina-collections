import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import { Field, Input } from 'coreModules/form/components'
import { MultipleChoiceCheckboxesField } from 'coreModules/search/components'

const ageStageFilter = 'matchAgeStageTags'
const stageFieldName = `ageAndStage.ageStage|multipleChoice-${ageStageFilter}`
const fromAgeFieldName = `ageAndStage.min`
const toAgeFieldName = `ageAndStage.max`

const propTypes = {
  formName: PropTypes.string.isRequired,
  getDrilldownQuery: PropTypes.func.isRequired,
}

class AgeStageFilterForm extends PureComponent {
  render() {
    const { formName, getDrilldownQuery } = this.props

    return (
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Column width={16}>
          <Field
            aggregationFunctionName="aggregateAgeStageTags"
            component={MultipleChoiceCheckboxesField}
            displayCount
            drillDownQuery={getDrilldownQuery(stageFieldName)}
            filterFunctionName={ageStageFilter}
            label="Age stage"
            name={stageFieldName}
          />
        </Grid.Column>
        <Grid.Row>
          <Grid.Column width={16}>Age in years</Grid.Column>
          <Grid.Column width={7}>
            <Field
              autoComplete="off"
              component={Input}
              fluid
              label="from"
              module="collectionMammals"
              name={fromAgeFieldName}
              type="number"
            />
          </Grid.Column>
          <Grid.Column textAlign="center" verticalAlign="middle" width={2}>
            {'—'}
          </Grid.Column>
          <Grid.Column width={7}>
            <Field
              autoComplete="off"
              component={Input}
              fluid
              label="to"
              module="collectionMammals"
              name={toAgeFieldName}
              type="number"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

AgeStageFilterForm.propTypes = propTypes

export default AgeStageFilterForm
