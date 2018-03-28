import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Header } from 'semantic-ui-react'
import { compose } from 'redux'

import { Field, Input } from 'coreModules/form/components'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'

const buildModuleTextKey = textKey =>
  `modules.collectionMammals.occurrences.localityInformation.${textKey}`

const propTypes = {
  getPath: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
}

function VerticalPosition({ getPath, i18n: { moduleTranslate } }) {
  return (
    <React.Fragment>
      <Grid.Row>
        <Grid.Column computer={3} mobile={16} tablet={4}>
          <Grid>
            <Grid.Row>
              <Grid.Column mobile={16}>
                <Header size="small">Elevation (m)</Header>
              </Grid.Column>
              <Grid.Column computer={8} mobile={16} tablet={8}>
                <Field
                  autoComplete="off"
                  component={Input}
                  helpNotificationProps={{
                    descriptionHeaderKey: buildModuleTextKey(
                      'minimumElevationInMeters'
                    ),
                    descriptionKey: buildModuleTextKey(
                      'helpTexts.minimumElevationInMeters'
                    ),
                  }}
                  label={moduleTranslate({
                    textKey: 'minimumElevationInMeters',
                  })}
                  module="collectionMammals"
                  name={getPath('minimumElevationInMeters')}
                  type="number"
                />
              </Grid.Column>
              <Grid.Column computer={8} mobile={16} tablet={8}>
                <Field
                  autoComplete="off"
                  component={Input}
                  helpNotificationProps={{
                    descriptionHeaderKey: buildModuleTextKey(
                      'maximumElevationInMeters'
                    ),
                    descriptionKey: buildModuleTextKey(
                      'helpTexts.maximumElevationInMeters'
                    ),
                  }}
                  label={moduleTranslate({
                    textKey: 'maximumElevationInMeters',
                  })}
                  module="collectionMammals"
                  name={getPath('maximumElevationInMeters')}
                  type="number"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
        <Grid.Column computer={3} mobile={16} tablet={4}>
          <Grid>
            <Grid.Row>
              <Grid.Column mobile={16}>
                <Header size="small">Dept (m)</Header>
              </Grid.Column>
              <Grid.Column computer={8} mobile={16} tablet={8}>
                <Field
                  autoComplete="off"
                  component={Input}
                  helpNotificationProps={{
                    descriptionHeaderKey: buildModuleTextKey(
                      'minimumDepthInMeters'
                    ),
                    descriptionKey: buildModuleTextKey(
                      'helpTexts.minimumDepthInMeters'
                    ),
                  }}
                  label={moduleTranslate({ textKey: 'minimumDepthInMeters' })}
                  module="collectionMammals"
                  name={getPath('minimumDepthInMeters')}
                  type="number"
                />
              </Grid.Column>
              <Grid.Column computer={8} mobile={16} tablet={8}>
                <Field
                  autoComplete="off"
                  component={Input}
                  helpNotificationProps={{
                    descriptionHeaderKey: buildModuleTextKey(
                      'maximumDepthInMeters'
                    ),
                    descriptionKey: buildModuleTextKey(
                      'helpTexts.maximumDepthInMeters'
                    ),
                  }}
                  label={moduleTranslate({ textKey: 'maximumDepthInMeters' })}
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

export default compose(
  withI18n({
    module: 'collectionMammals',
    scope: 'individualCircumstances.localityInformation.verticalPosition',
  }),
  pathBuilder({ name: 'verticalPosition' })
)(VerticalPosition)
