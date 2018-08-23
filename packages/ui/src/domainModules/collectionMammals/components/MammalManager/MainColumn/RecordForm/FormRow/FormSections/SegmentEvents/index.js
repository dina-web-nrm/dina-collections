import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Segment } from 'semantic-ui-react'
import { compose } from 'redux'
import { createEnsureAllItemsFetched } from 'coreModules/crud/higherOrderComponents'

import createLog from 'utilities/log'
import CollectingInformation from './CollectingInformation'
import DeathInformation from './DeathInformation'
import OriginInformation from './OriginInformation'

const log = createLog('modules:collectionMammals:MammalForm:SegmentEvents')

const propTypes = {
  allItemsFetched: PropTypes.bool.isRequired,
}

class SegmentEvents extends PureComponent {
  render() {
    const { allItemsFetched } = this.props
    log.render()
    return (
      <Segment color="green" loading={!allItemsFetched}>
        <CollectingInformation allPlacesFetched={allItemsFetched} />
        <DeathInformation />
        <OriginInformation />
      </Segment>
    )
  }
}

SegmentEvents.propTypes = propTypes

export default compose(
  createEnsureAllItemsFetched({
    relationships: ['parent'],
    resource: 'place',
  })
)(SegmentEvents)
