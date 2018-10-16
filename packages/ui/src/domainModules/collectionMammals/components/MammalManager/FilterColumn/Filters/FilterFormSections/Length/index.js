import React, { PureComponent } from 'react'
import { Grid } from 'semantic-ui-react'

import { DropdownSearch, Field, Input } from 'coreModules/form/components'
import { MultipleChoiceCheckboxesField } from 'coreModules/search/components'

import { higherOrderComponents } from '../../../queryBuilder'

const WrappedMultipleChoiceCheckboxesField = higherOrderComponents.createFieldHoc()(
  MultipleChoiceCheckboxesField
)

const lengthUnitOptions = [
  {
    key: 'any unit',
    text: 'any unit',
    value: '',
  },
  {
    key: 'm',
    text: 'm',
    value: 'm',
  },
  {
    key: 'cm',
    text: 'cm',
    value: 'cm',
  },
  {
    key: 'mm',
    text: 'mm',
    value: 'mm',
  },
]

class LengthFilterForm extends PureComponent {
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
              name="length.rangeValue.min"
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
              name="length.rangeValue.max"
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
              name="length.rangeUnit"
              options={lengthUnitOptions}
              type="dropdown-search-local"
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Column width={16}>
          <Field
            component={WrappedMultipleChoiceCheckboxesField}
            displayCount
            label="Length type"
            name="length.rangeTypes"
            resource="searchSpecimen"
          />
        </Grid.Column>
      </Grid>
    )
  }
}

export default LengthFilterForm
