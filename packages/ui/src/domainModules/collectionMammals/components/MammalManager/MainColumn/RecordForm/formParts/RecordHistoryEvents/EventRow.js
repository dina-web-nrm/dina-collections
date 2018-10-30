import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import { getYMDHMSFromTimestamp } from 'common/es5/date'

const propTypes = {
  actionType: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  username: PropTypes.string,
}

const defaultProps = {
  username: undefined,
}

class EventRow extends PureComponent {
  render() {
    const { actionType, timestamp, username } = this.props

    const eventTimestamp = getYMDHMSFromTimestamp(timestamp)
    const eventRow = username
      ? `${actionType} ${username} ${eventTimestamp}`
      : `${actionType} ${eventTimestamp}`

    return <Grid.Column width={10}>{eventRow}</Grid.Column>
  }
}

EventRow.propTypes = propTypes
EventRow.defaultProps = defaultProps

export default EventRow
