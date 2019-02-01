import React, { PureComponent } from 'react'
import { Form, Grid } from 'semantic-ui-react'

import { Field, FieldLabel, Input } from 'coreModules/form/components'
import { MultipleChoiceCheckboxesField } from 'coreModules/search/components'
import { higherOrderComponents } from '../../../queryBuilder'

const WrappedMultipleChoiceCheckboxesField = higherOrderComponents.createFieldHoc()(
  MultipleChoiceCheckboxesField
)

class AgeStageFilterForm extends PureComponent {
  render() {
    return (
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Column width={16}>
          <Form.Field
            style={{
              position: 'relative',
              width: '100%',
            }}
          >
            <FieldLabel label="Age in years" />
            <Grid textAlign="left" verticalAlign="top">
              <Grid.Column width={7}>
                <Field
                  autoComplete="off"
                  component={Input}
                  enableHelpNotifications={false}
                  fluid
                  label="from"
                  module="collectionMammals"
                  name="ageAndStage.age.min"
                  subLabel
                  type="number"
                />
              </Grid.Column>
              <Grid.Column width={7}>
                <Field
                  autoComplete="off"
                  component={Input}
                  enableHelpNotifications={false}
                  fluid
                  label="to"
                  module="collectionMammals"
                  name="ageAndStage.age.max"
                  subLabel
                  type="number"
                />
              </Grid.Column>
            </Grid>
          </Form.Field>
        </Grid.Column>
        <Grid.Column width={16}>
          <Field
            component={WrappedMultipleChoiceCheckboxesField}
            displayCount
            enableHelpNotifications={false}
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
