import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { Grid, Header, Segment } from 'semantic-ui-react'

import config from 'config'
import createLog from 'utilities/log'
import { Accordion } from 'coreModules/commonUi/components'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import { createEnsureAllItemsFetched } from 'coreModules/crud/higherOrderComponents'
import FeatureObservationsTable from './FeatureObservationsTable'
import FeatureObservationsTitle from './FeatureObservationsTitle'

const log = createLog(
  'modules:collectionMammals:MammalForm:SegmentFeatureObservations'
)

const GROUPS_AND_HEADLINES = [
  { groups: ['age-stage', 'age-and-stage'], headlineKey: 'stage-and-age' },
  { groups: ['sex'], headlineKey: 'sex' },
  { groups: ['bone-count'], headlineKey: 'bone-count' },
  { groups: ['weight'], headlineKey: 'weight' },
  { groups: ['length'], headlineKey: 'length' },
  { groups: ['condition'], headlineKey: 'condition' },
]

const ModuleTranslate = createModuleTranslate('collectionMammals', {
  scope: 'featureObservations',
})

const propTypes = {
  allItemsFetched: PropTypes.bool.isRequired,
  changeFieldValue: PropTypes.func.isRequired,
  getPath: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(['edit', 'register']).isRequired,
}

class SegmentFeatureObservations extends PureComponent {
  render() {
    const {
      allItemsFetched: allFeatureTypesFetched,
      changeFieldValue,
    } = this.props

    log.render()
    return (
      <Segment color="green" loading={!allFeatureTypesFetched}>
        <Header size="medium">
          <ModuleTranslate textKey="features" />
        </Header>
        <Grid textAlign="left" verticalAlign="top">
          <Grid.Column mobile={16}>
            <Accordion
              delayItemRenderUntilActive={!config.isTest}
              items={GROUPS_AND_HEADLINES}
              renderContent={props => (
                <FeatureObservationsTable
                  changeFieldValue={changeFieldValue}
                  {...props}
                />
              )}
              renderTitle={props => <FeatureObservationsTitle {...props} />}
            />
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

SegmentFeatureObservations.propTypes = propTypes

export default compose(
  withRouter,
  createEnsureAllItemsFetched({ resource: 'featureType' }),
  pathBuilder({ name: 'individual.featureObservations' })
)(SegmentFeatureObservations)
