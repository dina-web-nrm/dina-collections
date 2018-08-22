import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Segment } from 'semantic-ui-react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createEnsureAllItemsFetched } from 'coreModules/crud/higherOrderComponents'

import createLog from 'utilities/log'
import CollectingInformation from './CollectingInformation'
import DeathInformation from './DeathInformation'
import OriginInformation from './OriginInformation'

const log = createLog('modules:collectionMammals:MammalForm:SegmentEvents')

const mapStateToProps = (state, { formValueSelector }) => {
  return {
    collectionInformation: formValueSelector(
      state,
      'individual.collectionInformation'
    ),
  }
}

const propTypes = {
  allItemsFetched: PropTypes.bool.isRequired,
  formValueSelector: PropTypes.func.isRequired,
}

class SegmentEvents extends PureComponent {
  render() {
    const { allItemsFetched, formValueSelector } = this.props
    log.render()
    return (
      <Segment color="green" loading={!allItemsFetched}>
        <CollectingInformation
          allPlacesFetched={allItemsFetched}
          formValueSelector={formValueSelector}
        />
        <DeathInformation formValueSelector={formValueSelector} />
        <OriginInformation formValueSelector={formValueSelector} />
      </Segment>
    )
  }
}

SegmentEvents.propTypes = propTypes

export default compose(
  createEnsureAllItemsFetched({
    relationships: ['parent'],
    resource: 'place',
  }),
  connect(mapStateToProps)
)(SegmentEvents)
