import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import { Field } from 'coreModules/form/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import { MultipleSearchTagsSelect } from 'coreModules/search/components'

const propTypes = {
  name: PropTypes.string.isRequired,
}

class TaxonomyFilterForm extends PureComponent {
  render() {
    const { name } = this.props
    return (
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Row>
          <Grid.Column width={16}>
            <Field
              aggregationFunctionName="identifiers"
              autoComplete="off"
              component={MultipleSearchTagsSelect}
              // drillDownQuery
              filterFunctionName="searchCollectingLocation"
              name={`${name}.taxon`}
              parameterKey="taxonomy"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

TaxonomyFilterForm.propTypes = propTypes

export default pathBuilder({
  name: 'taxonomy',
})(TaxonomyFilterForm)
