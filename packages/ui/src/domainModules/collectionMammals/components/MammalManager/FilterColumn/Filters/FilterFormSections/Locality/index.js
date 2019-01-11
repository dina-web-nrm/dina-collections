import React, { PureComponent } from 'react'
import { Grid } from 'semantic-ui-react'
import { Field } from 'coreModules/form/components'
import { MultipleSearchTagsSelectField } from 'coreModules/search/components'

import { higherOrderComponents } from '../../../queryBuilder'

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
            label="Higher Geography (collecting)"
            name="locality.higherGeography.tagValues"
            resource="searchSpecimen"
            tagTypeFilterEnabled
            tagTypeFilterInitialValue="any geographic level"
            tagTypeFilterMatchAllOption="any geographic level"
            tagTypeFilterText="Suggesting from"
          />
        </Grid.Column>

        <Grid.Column width={16}>
          <Field
            autoComplete="off"
            component={WrappedMultipleSearchTagsSelectField}
            fluid
            label="Locality (collecting or origin)"
            name="locality.localities.tagValues"
            resource="searchSpecimen"
            tagTypeFilterEnabled
            tagTypeFilterInitialValue="any locality type"
            tagTypeFilterMatchAllOption="any locality type"
            tagTypeFilterText="Suggesting from"
          />
        </Grid.Column>
      </Grid>
    )
  }
}

export default LocalityFilterForm
