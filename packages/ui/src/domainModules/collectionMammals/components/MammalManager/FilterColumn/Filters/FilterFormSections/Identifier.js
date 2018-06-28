import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import { Field } from 'coreModules/form/components'
import { MultipleSearchTagsSelect } from 'coreModules/search/components'

const propTypes = {
  name: PropTypes.string.isRequired,
}

class IdentifierFilterForm extends PureComponent {
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
              name={`${name}.identifier`}
              parameterKey="identifier"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

IdentifierFilterForm.propTypes = propTypes

export default IdentifierFilterForm
