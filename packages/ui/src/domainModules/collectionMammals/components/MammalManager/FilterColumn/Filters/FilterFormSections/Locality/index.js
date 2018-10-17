import React, { PureComponent } from 'react'
import { Grid } from 'semantic-ui-react'
import { Field } from 'coreModules/form/components'
import {
  MultipleSearchTagsSelectField,
  MultipleChoiceCheckboxesField,
} from 'coreModules/search/components'

import { higherOrderComponents } from '../../../queryBuilder'

const WrappedMultipleChoiceCheckboxesField = higherOrderComponents.createFieldHoc()(
  MultipleChoiceCheckboxesField
)

const WrappedMultipleSearchTagsSelectField = higherOrderComponents.createFieldHoc()(
  MultipleSearchTagsSelectField
)

class LocalityFilterForm extends PureComponent {
  render() {
    return (
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Column width={16}>
          <Field
            autoComplete="off"
            component={WrappedMultipleSearchTagsSelectField}
            fluid
            label="Higher Geography"
            name="locality.higherGeography.tagValues"
            resource="searchSpecimen"
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Field
            component={WrappedMultipleChoiceCheckboxesField}
            displayCount
            label="Higher geography level"
            name="locality.higherGeography.tagTypes"
            resource="searchSpecimen"
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Field
            autoComplete="off"
            component={WrappedMultipleSearchTagsSelectField}
            fluid
            label="Locality"
            name="locality.localities.tagValues"
            resource="searchSpecimen"
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Field
            component={WrappedMultipleChoiceCheckboxesField}
            displayCount
            label="Locality type"
            name="locality.localities.tagTypes"
            resource="searchSpecimen"
          />
        </Grid.Column>
      </Grid>
    )
  }
}

export default LocalityFilterForm
