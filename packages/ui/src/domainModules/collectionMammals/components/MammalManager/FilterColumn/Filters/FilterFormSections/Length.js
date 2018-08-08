import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import { DropdownSearch, Field, Input } from 'coreModules/form/components'
import { MultipleChoiceCheckboxesField } from 'coreModules/search/components'

const lengthTypeFilter = 'searchCollectingLocation'
const multipleChoiceName = `length.lengthType|multipleChoice-${
  lengthTypeFilter
}`
const lengthFilter = 'matchLengthType'
const fromLengthFieldName = `length.fromLength|gte-${lengthFilter}`
const toLengthFieldName = `length.toLength|lte-${lengthFilter}`

const lengthUnitOptions = [
  {
    key: 'any unit',
    text: 'any unit',
    value: '',
  },
]

const propTypes = {
  formName: PropTypes.string.isRequired,
  getDrilldownQuery: PropTypes.func.isRequired,
}

class LengthFilterForm extends PureComponent {
  render() {
    const { formName, getDrilldownQuery } = this.props

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
              name={fromLengthFieldName}
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
              name={toLengthFieldName}
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
              name={toLengthFieldName}
              options={lengthUnitOptions}
              type="dropdown-search-local"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Column width={16}>
          <Field
            aggregationFunctionName="lengthType"
            component={MultipleChoiceCheckboxesField}
            displayCount
            drillDownQuery={getDrilldownQuery(multipleChoiceName)}
            filterFunctionName={lengthTypeFilter}
            formName={formName}
            label="Length type"
            name={multipleChoiceName}
          />
        </Grid.Column>
      </Grid>
    )
  }
}

LengthFilterForm.propTypes = propTypes

export default LengthFilterForm
