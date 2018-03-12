import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Header, Segment } from 'semantic-ui-react'

import { createModuleTranslate } from 'coreModules/i18n/components'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import { FormTable } from 'coreModules/form/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import { globalSelectors as curatedListSelectors } from 'domainModules/curatedListService'
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
    featureObservationTypes: curatedListSelectors.getFeatureObservationTypes(
      state
    ),
  }
}

const propTypes = {
  featureObservations: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
  featureObservationTypes: PropTypes.object.isRequired,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
}
const defaultProps = {
  featureObservations: undefined,
}

class SegmentFeatureObservations extends Component {
  render() {
    const { featureObservations, featureObservationTypes, i18n } = this.props

    return (
      <Segment color="green">
        <Header size="medium">
          <ModuleTranslate textKey="features" />
        </Header>
        <FormTable
          columnHeaderTextKeys={columnHeaderTextKeys}
          footer={<Footer />}
          numberOfRows={
            (featureObservations && featureObservations.length) || 0
          }
          renderRow={({ index }) => {
            return (
              <FeatureObservationRow
                featureObservationTypes={featureObservationTypes}
                i18n={i18n}
                index={index}
                key={index}
              />
            )
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
  withI18n({
    module: 'collectionMammals',
    scope: 'featureObservations',
  }),
  pathBuilder({ name: 'featureObservations' })
)(SegmentFeatureObservations)
