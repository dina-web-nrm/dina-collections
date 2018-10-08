import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import { Field } from 'coreModules/form/components'
import { MultipleSearchTagsSelectField } from 'coreModules/search/components'

const storageLocationTags = 'StorageLocationTags'
const name = `storage.storageLocationName|searchTags-${storageLocationTags}`

const propTypes = {
  getDrilldownQuery: PropTypes.func.isRequired,
}

class StorageFilterForm extends PureComponent {
  render() {
    const { getDrilldownQuery } = this.props

    return (
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Column width={16}>
          <Field
            aggregationFunctionName="aggregateStorageLocationTags"
            autoComplete="off"
            component={MultipleSearchTagsSelectField}
            drillDownQuery={getDrilldownQuery(name)}
            filterFunctionName={`search${storageLocationTags}`}
            label="Normal storage"
            name={name}
            resource="searchSpecimen"
          />
        </Grid.Column>
      </Grid>
    )
  }
}

StorageFilterForm.propTypes = propTypes

export default StorageFilterForm
