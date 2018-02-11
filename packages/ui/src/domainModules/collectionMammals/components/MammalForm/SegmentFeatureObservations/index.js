import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Header, Segment } from 'semantic-ui-react'

import { createModuleTranslate } from 'coreModules/i18n/components'
import { FormTable } from 'coreModules/form/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import Footer from './Footer'
import FeatureObservationRow from './FeatureObservationRow'

const ModuleTranslate = createModuleTranslate('collectionMammals', {
  scope: 'featureObservations',
})

const columnHeaderTextKeys = [
  'modules.collectionMammals.featureObservations.feature',
  'modules.collectionMammals.featureObservations.value',
  'modules.collectionMammals.featureObservations.method',
  'modules.collectionMammals.featureObservations.agent',
  'modules.collectionMammals.featureObservations.date',
]

const mapStateToProps = (state, { formValueSelector }) => {
  return {
    featureObservations: formValueSelector(state, 'featureObservations'),
  }
}

const propTypes = {
  featureObservations: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
}
const defaultProps = {
  featureObservations: undefined,
}

class SegmentFeatureObservations extends Component {
  render() {
    const { featureObservations } = this.props

    return (
      <Segment color="green">
        <Header size="medium">
          <ModuleTranslate textKey="features" />
        </Header>
        <FormTable
          columnHeaderTextKeys={columnHeaderTextKeys}
          footer={<Footer />}
          numberOfItemsToSkip={1}
          numberOfRows={
            (featureObservations && featureObservations.length) || 0
          }
          renderRow={({ index }) => {
            return <FeatureObservationRow index={index} key={index} />
          }}
        />
      </Segment>
    )
  }
}

SegmentFeatureObservations.propTypes = propTypes
SegmentFeatureObservations.defaultProps = defaultProps

export default compose(
  connect(mapStateToProps),
  pathBuilder({ name: 'featureObservations' })
)(SegmentFeatureObservations)
