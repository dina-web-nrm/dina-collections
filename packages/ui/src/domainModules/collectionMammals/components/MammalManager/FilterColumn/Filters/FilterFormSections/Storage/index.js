import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { Field } from 'coreModules/form/components'
import { MultipleSearchTagsSelectField } from 'coreModules/search/components'

import { higherOrderComponents } from '../../../queryBuilder'

const WrappedMultipleSearchTagsSelectField = higherOrderComponents.createFieldHoc()(
  MultipleSearchTagsSelectField
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
            label="Normal storage location"
            name="storage.tagValues"
            resource="searchSpecimen"
            tagTypeFilterEnabled
            tagTypeFilterInitialValue="any storage level"
            tagTypeFilterMatchAllOption="any storage level"
            tagTypeFilterText="Suggesting from"
          />
        </Grid.Column>
      </Grid>
    )
  }
}

export default StorageFilterForm
