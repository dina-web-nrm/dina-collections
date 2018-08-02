import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import { Field } from 'coreModules/form/components'
import { MultipleSearchTagsSelectField } from 'coreModules/search/components'

const filterFunctionName = 'searchCollectingLocation'
const name = `storage.storageLocationName|searchTags-${filterFunctionName}`

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
            aggregationFunctionName="identifiers"
            autoComplete="off"
            component={MultipleSearchTagsSelectField}
            drillDownQuery={getDrilldownQuery(name)}
            filterFunctionName={filterFunctionName}
            label="Storage location name"
            name={name}
          />
        </Grid.Column>
      </Grid>
    )
  }
}

StorageFilterForm.propTypes = propTypes

export default StorageFilterForm
