import React, { PureComponent } from 'react'
import { Grid } from 'semantic-ui-react'

import { Field, Input } from 'coreModules/form/components'
import { MultipleChoiceCheckboxesField } from 'coreModules/search/components'
import { higherOrderComponents } from '../../../queryBuilder'

const WrappedMultipleChoiceCheckboxesField = higherOrderComponents.createFieldHoc()(
  MultipleChoiceCheckboxesField
)

class AgeStageFilterForm extends PureComponent {
  render() {
    return (
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Row>
          <Grid.Column width={16}>Age in years</Grid.Column>
          <Grid.Column width={7}>
            <Field
              autoComplete="off"
              component={Input}
              fluid
              label="From"
              module="collectionMammals"
              name="ageAndStage.age.min"
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
              label="To"
              module="collectionMammals"
              name="ageAndStage.age.max"
              type="number"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Column width={16}>
          <Field
            component={WrappedMultipleChoiceCheckboxesField}
            displayCount
            label="Development stage"
            name="ageAndStage.stages"
            resource="searchSpecimen"
          />
        </Grid.Column>
      </Grid>
    )
  }
}

export default AgeStageFilterForm
