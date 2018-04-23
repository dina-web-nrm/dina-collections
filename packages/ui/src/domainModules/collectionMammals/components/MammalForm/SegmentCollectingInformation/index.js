import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Header, Grid, Segment } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { Field, Input } from 'coreModules/form/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import { createEnsureAllItemsFetched } from 'coreModules/crud/higherOrderComponents'
import LocationInformationFields from './LocationInformationFields'

const log = createLog(
  'modules:collectionMammals:MammalForm:SegmentCollectingInformation'
)

const ModuleTranslate = createModuleTranslate('collectionMammals')

const propTypes = {
  allItemsFetched: PropTypes.bool.isRequired,
  getPath: PropTypes.func.isRequired,
}

class SegmentCollectingInformation extends PureComponent {
  render() {
    const { getPath, allItemsFetched } = this.props
    log.render()
    return (
      <Segment color="green" loading={!allItemsFetched}>
        <Header size="medium">
          <ModuleTranslate textKey="collectingInformation.collectingInformation" />
        </Header>
        <Grid textAlign="left" verticalAlign="top">
          {allItemsFetched && <LocationInformationFields />}

          <Grid.Column computer={10} mobile={16}>
            <Field
              autoComplete="off"
              component={Input}
              label={
                <ModuleTranslate
                  scope="collectingInformation"
                  textKey="collectorsText"
                />
              }
              module="collectionMammals"
              name={getPath('collectorsText')}
              type="text"
            />
          </Grid.Column>

          <Grid.Column computer={6} mobile={16}>
            <Field
              autoComplete="off"
              component={Input}
              label={
                <ModuleTranslate
                  scope="collectingInformation"
                  textKey="expeditionText"
                />
              }
              module="collectionMammals"
              name={getPath('event.expeditionText')}
              type="text"
            />
          </Grid.Column>
          <Grid.Column computer={4} mobile={16}>
            <Field
              autoComplete="off"
              component={Input}
              label={
                <ModuleTranslate
                  scope="collectingInformation"
                  textKey="startDate"
                />
              }
              module="collectionMammals"
              name={getPath('event.startDate')}
              type="text"
            />
          </Grid.Column>
          <Grid.Column computer={4} mobile={16}>
            <Field
              autoComplete="off"
              component={Input}
              label={
                <ModuleTranslate
                  scope="collectingInformation"
                  textKey="endDate"
                />
              }
              module="collectionMammals"
              name={getPath('event.endDate')}
              type="text"
            />
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

SegmentCollectingInformation.propTypes = propTypes

export default compose(
  createEnsureAllItemsFetched({
    relationships: ['parent'],
    resource: 'place',
  }),
  pathBuilder({ name: 'collectingInformation.0' })
)(SegmentCollectingInformation)
