import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Grid, Header, Segment } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import {
  actionCreators as curatedListActionCreators,
  globalSelectors as curatedListGlobalSelectors,
} from 'domainModules/curatedListService'
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

const mapStateToProps = state => {
  return {
    hasFeatureObservations: curatedListGlobalSelectors.getHasFeatureObservationTypes(
      state
    ),
  }
}
const mapDispatchToProps = {
  getFeatureObservationTypes:
    curatedListActionCreators.getFeatureObservationTypes,
}

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  getFeatureObservationTypes: PropTypes.func.isRequired,
  getPath: PropTypes.func.isRequired,
  hasFeatureObservations: PropTypes.bool.isRequired,
  mode: PropTypes.oneOf(['edit', 'register']).isRequired,
}

class SegmentFeatureObservations extends PureComponent {
  componentDidMount() {
    this.props.getFeatureObservationTypes()
  }

  render() {
    const {
      changeFieldValue,
      getPath,
      hasFeatureObservations,
      mode,
    } = this.props

    log.render()
    return (
      <Segment color="green" loading={!hasFeatureObservations}>
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

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  pathBuilder({ name: 'featureObservations' })
)(SegmentFeatureObservations)
