import React, { PureComponent } from 'react'
import { Grid } from 'semantic-ui-react'
import { Field } from 'coreModules/form/components'
import {
  MultipleSearchTagsSelectField,
  TagTypeDropdownField,
} from 'coreModules/search/components'

import { ANY } from 'coreModules/search/constants'

import { higherOrderComponents } from '../../../queryBuilder'

const WrappedMultipleSearchTagsSelectField = higherOrderComponents.createFieldHoc()(
  MultipleSearchTagsSelectField
)

const WrappedTagTypeDropdownField = higherOrderComponents.createFieldHoc()(
  TagTypeDropdownField
)

class TaxonomyFilterForm extends PureComponent {
  render() {
    return (
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Column width={16}>
          <Field
            addTagTypeToText={false}
            autoComplete="off"
            component={WrappedMultipleSearchTagsSelectField}
            label="Taxon"
            name="taxonomy.tagValues"
            resource="searchSpecimen"
            tagTypeFilterEnabled
            tagTypeInitialOptionValue={ANY}
            tagTypeInlineDescription="Suggesting from"
            tagTypeMatchAllOptionText="any rank"
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Field
            autoComplete="off"
            component={WrappedTagTypeDropdownField}
            label="Limit to specimens of rank"
            name="taxonomy.tagType"
            resource="searchSpecimen"
            tagTypeInitialOptionValue={ANY}
            tagTypeMatchAllOptionText="Any rank level"
          />
        </Grid.Column>
      </Grid>
    )
  }
}

export default TaxonomyFilterForm
