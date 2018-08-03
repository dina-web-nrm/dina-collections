import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import { DropdownSearch, Field, Input } from 'coreModules/form/components'
import { MultipleChoiceCheckboxesField } from 'coreModules/search/components'

const weightTypeFilter = 'searchCollectingLocation'
const multipleChoiceName = `weight.weightType|multipleChoice-${
  weightTypeFilter
}`
const weightFilter = 'searchCollectingLocation'
const fromWeightFieldName = `weight.fromWeight|gte-${weightFilter}`
const toWeightFieldName = `weight.toWeight|lte-${weightFilter}`

const weightUnitOptions = [
  {
    key: 'any unit',
    text: 'any unit',
    value: '',
  },
]

const propTypes = {
  getDrilldownQuery: PropTypes.func.isRequired,
}

class WeightFilterForm extends PureComponent {
  render() {
    const { getDrilldownQuery } = this.props

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
              name={fromWeightFieldName}
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
              name={toWeightFieldName}
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
              name={toWeightFieldName}
              options={weightUnitOptions}
              type="dropdown-search-local"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Column width={16}>
          <Field
            aggregationFunctionName="identifiers"
            aggregationLimit={10}
            component={MultipleChoiceCheckboxesField}
            drillDownQuery={getDrilldownQuery(multipleChoiceName)}
            filterFunctionName={weightTypeFilter}
            label="Weight type"
            name={multipleChoiceName}
          />
        </Grid.Column>
      </Grid>
    )
  }
}

WeightFilterForm.propTypes = propTypes

export default WeightFilterForm
