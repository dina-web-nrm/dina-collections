import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Grid, Header, Segment } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import AccordionWrapper from './AccordionWrapper'

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
  changeFieldValue: PropTypes.func.isRequired,
  getPath: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(['edit', 'register']).isRequired,
}

class SegmentFeatureObservations extends PureComponent {
  render() {
    const { changeFieldValue, getPath, mode } = this.props
    log.debug('this.props', this.props)
    log.render()
    return (
      <Segment color="green">
        <Header size="medium">
          <ModuleTranslate textKey="features" />
        </Header>
        <Grid textAlign="left" verticalAlign="top">
          <Grid.Column mobile={16}>
            <AccordionWrapper
              changeFieldValue={changeFieldValue}
              getPath={getPath}
              groupsAndHeadlines={GROUPS_AND_HEADLINES}
              mode={mode}
            />
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

SegmentFeatureObservations.propTypes = propTypes

export default compose(pathBuilder({ name: 'featureObservations' }))(
  SegmentFeatureObservations
)
