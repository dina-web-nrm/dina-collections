import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import { Field } from 'coreModules/form/components'
import { MultipleSearchTagsSelectField } from 'coreModules/search/components'

const taxonomyTags = 'TaxonomyTags'
const name = `taxonomy.taxonName|searchTags-${taxonomyTags}`

const propTypes = {
  getDrilldownQuery: PropTypes.func.isRequired,
}

class IdentifierFilterForm extends PureComponent {
  render() {
    const { getDrilldownQuery } = this.props

    return (
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Column width={16}>
          <Field
            aggregationFunctionName="aggregateTaxonomyTags"
            autoComplete="off"
            component={MultipleSearchTagsSelectField}
            drillDownQuery={getDrilldownQuery(name)}
            filterFunctionName={`search${taxonomyTags}`}
            label="Taxon name"
            name={name}
            resource="searchSpecimen"
          />
        </Grid.Column>
      </Grid>
    )
  }
}

IdentifierFilterForm.propTypes = propTypes

export default IdentifierFilterForm
