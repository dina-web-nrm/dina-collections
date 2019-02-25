import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'

import config from 'config'
import createLog from 'utilities/log'
import { Accordion } from 'coreModules/commonUi/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import { globalSelectors as crudKeyObjectSelectors } from 'coreModules/crud/keyObjectModule'
import FeatureObservationsTable from './FeatureObservationsTable'
import FeatureObservationsTitle from './FeatureObservationsTitle'

const log = createLog(
  'modules:collectionMammals:MammalForm:FeatureObservations'
)

const GROUPS_AND_HEADLINES = [
  {
    groups: ['age-and-stage', 'age-stage'],
    headlineKey: 'age-development-stage',
  },
  { groups: ['sex'], headlineKey: 'sex' },
  { groups: ['carcass-condition'], headlineKey: 'carcass-condition' },
  { groups: ['bone-count'], headlineKey: 'bone-count' },
  { groups: ['weight'], headlineKey: 'weight' },
  { groups: ['length'], headlineKey: 'length' },
]

const mapStateToProps = state => {
  return {
    allFeatureTypesFetched: crudKeyObjectSelectors.get[
      ':resource.allItems.fetched'
    ](state, { resource: 'featureType' }),
  }
}

const propTypes = {
  allFeatureTypesFetched: PropTypes.bool,
  changeFieldValue: PropTypes.func.isRequired,
}

const defaultProps = {
  allFeatureTypesFetched: false,
}

class FeatureObservations extends PureComponent {
  render() {
    const { allFeatureTypesFetched, changeFieldValue } = this.props

    if (!allFeatureTypesFetched) {
      return null
    }
    log.render()
    return (
      <Grid.Column width={16}>
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
    )
  }
}

FeatureObservations.defaultProps = defaultProps
FeatureObservations.propTypes = propTypes

export default compose(
  connect(mapStateToProps),
  pathBuilder()
)(FeatureObservations)
