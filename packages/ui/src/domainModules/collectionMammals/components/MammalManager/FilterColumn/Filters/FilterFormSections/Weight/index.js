import React, { PureComponent } from 'react'
import { Grid } from 'semantic-ui-react'

import { DropdownSearch, Field, Input } from 'coreModules/form/components'
import { MultipleChoiceCheckboxesField } from 'coreModules/search/components'

import { higherOrderComponents } from '../../../queryBuilder'

const WrappedMultipleChoiceCheckboxesField = higherOrderComponents.createFieldHoc()(
  MultipleChoiceCheckboxesField
)

const weightUnitOptions = [
  {
    key: 'any unit',
    text: 'any unit',
    value: '',
  },
  {
    key: 'kg',
    text: 'kg',
    value: 'kg',
  },
  {
    key: 'g',
    text: 'g',
    value: 'g',
  },
]

class WeightFilterForm extends PureComponent {
  render() {
    return (
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Row>
          <Grid.Column width={5}>
            <Field
              autoComplete="off"
              component={Input}
              fluid
              label="from"
              module="collectionMammals"
              name="weight.rangeValue.min"
              type="number"
            />
          </Grid.Column>
          <Grid.Column width={5}>
            <Field
              autoComplete="off"
              component={Input}
              fluid
              label="to"
              module="collectionMammals"
              name="weight.rangeValue.max"
              type="number"
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <Field
              autoComplete="off"
              component={DropdownSearch}
              fluid
              label="unit"
              module="collectionMammals"
              name="weight.rangeUnit"
              options={weightUnitOptions}
              type="dropdown-search-local"
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Column width={16}>
          <Field
            component={WrappedMultipleChoiceCheckboxesField}
            displayCount
            label="Weight type"
            name="weight.rangeTypes"
            resource="searchSpecimen"
          />
        </Grid.Column>
      </Grid>
    )
  }
}

export default WeightFilterForm
