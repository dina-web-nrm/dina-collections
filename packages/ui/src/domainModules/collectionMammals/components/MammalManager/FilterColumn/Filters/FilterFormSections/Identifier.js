import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import { Field } from 'coreModules/form/components'
import { MultipleSearchTagsSelectField } from 'coreModules/search/components'

const identifierTags = 'IdentifierTags'
const name = `identifier.identifier|searchTags-${identifierTags}`

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
            aggregationFunctionName="aggregateIdentifierTags"
            autoComplete="off"
            component={MultipleSearchTagsSelectField}
            drillDownQuery={getDrilldownQuery(name)}
            filterFunctionName={`search${identifierTags}`}
            label="Identifier"
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
