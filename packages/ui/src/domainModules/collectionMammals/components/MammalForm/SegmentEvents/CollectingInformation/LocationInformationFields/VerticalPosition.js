import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Header } from 'semantic-ui-react'
import { compose } from 'redux'

import { Field, Input } from 'coreModules/form/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'

const propTypes = {
  getPath: PropTypes.func.isRequired,
}

function VerticalPosition({ getPath }) {
  return (
    <React.Fragment>
      <Grid.Row>
        <Grid.Column computer={4} mobile={16} tablet={4}>
          <Grid>
            <Grid.Row>
              <Grid.Column mobile={16}>
                <Header size="small">Elevation (m)</Header>
              </Grid.Column>
              <Grid.Column computer={8} mobile={16} tablet={8}>
                <Field
                  autoComplete="off"
                  component={Input}
                  module="collectionMammals"
                  name={getPath('minimumElevationInMeters')}
                  type="number"
                />
              </Grid.Column>
              <Grid.Column computer={8} mobile={16} tablet={8}>
                <Field
                  autoComplete="off"
                  component={Input}
                  module="collectionMammals"
                  name={getPath('maximumElevationInMeters')}
                  type="number"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
        <Grid.Column computer={4} mobile={16} tablet={4}>
          <Grid>
            <Grid.Row>
              <Grid.Column mobile={16}>
                <Header size="small">Dept (m)</Header>
              </Grid.Column>
              <Grid.Column computer={8} mobile={16} tablet={8}>
                <Field
                  autoComplete="off"
                  component={Input}
                  module="collectionMammals"
                  name={getPath('minimumDepthInMeters')}
                  type="number"
                />
              </Grid.Column>
              <Grid.Column computer={8} mobile={16} tablet={8}>
                <Field
                  autoComplete="off"
                  component={Input}
                  module="collectionMammals"
                  name={getPath('maximumDepthInMeters')}
                  type="number"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid.Row>
    </React.Fragment>
  )
}

VerticalPosition.propTypes = propTypes

export default compose(pathBuilder({ name: 'verticalPosition' }))(
  VerticalPosition
)
