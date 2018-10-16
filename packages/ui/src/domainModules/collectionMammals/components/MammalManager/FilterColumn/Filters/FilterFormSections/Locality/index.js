import React, { PureComponent } from 'react'
import { Grid } from 'semantic-ui-react'
import { Field } from 'coreModules/form/components'
import {
  MultipleSearchTagsSelectField,
  MultipleChoiceCheckboxesField,
} from 'coreModules/search/components'

import LocalityDropdownSearch from 'domainModules/locality/components/LocalityDropdownSearch'

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
        <Grid.Column mobile={16}>
          <Field
            autoComplete="off"
            component={LocalityDropdownSearch}
            fluid
            label="Higher geography"
            model="place"
            module="locality"
            name="locality.higherGeography"
            type="text"
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Field
            autoComplete="off"
            component={WrappedMultipleSearchTagsSelectField}
            fluid
            label="Locality"
            name="locality.tagValues"
            resource="searchSpecimen"
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Field
            component={WrappedMultipleChoiceCheckboxesField}
            displayCount
            label="Locality types"
            name="locality.tagTypes"
            resource="searchSpecimen"
          />
        </Grid.Column>
      </Grid>
    )
  }
}

export default LocalityFilterForm
