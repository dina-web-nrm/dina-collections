import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import { getYMDHMSFromTimestamp } from 'common/es5/date'

const propTypes = {
  eventType: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  username: PropTypes.string,
}

const defaultProps = {
  username: undefined,
}

class EventRow extends PureComponent {
  render() {
    const { eventType, timestamp, username } = this.props

    const eventTimestamp = getYMDHMSFromTimestamp(timestamp)
    const eventRow = username
      ? `${eventType} ${username} ${eventTimestamp}`
      : `${eventType} ${eventTimestamp}`

    return <Grid.Column width={16}>{eventRow}</Grid.Column>
  }
}

EventRow.propTypes = propTypes
EventRow.defaultProps = defaultProps

export default EventRow
