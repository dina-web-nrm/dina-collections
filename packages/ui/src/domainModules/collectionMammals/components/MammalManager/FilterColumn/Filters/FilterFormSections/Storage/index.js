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

class StorageFilterForm extends PureComponent {
  render() {
    return (
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Column width={16}>
          <Field
            addTagTypeToText={false}
            autoComplete="off"
            component={WrappedMultipleSearchTagsSelectField}
            enableHelpNotifications={false}
            label="Normal storage location"
            name="storage.tagValues"
            resource="searchSpecimen"
            tagTypeFilterEnabled
            tagTypeInitialOptionValue={ANY}
            tagTypeInlineDescription="Suggesting from"
            tagTypeMatchAllOptionText="any storage level"
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Field
            autoComplete="off"
            component={WrappedTagTypeDropdownField}
            enableHelpNotifications={false}
            label="Limit to specimens with storage level"
            name="storage.tagType"
            resource="searchSpecimen"
            tagTypeInitialOptionValue={ANY}
            tagTypeMatchAllOptionText="Any storage level"
          />
        </Grid.Column>
      </Grid>
    )
  }
}

export default StorageFilterForm
