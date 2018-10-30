import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import { getYMDHMSFromTimestamp } from 'common/es5/date'

const propTypes = {
  actionType: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  userName: PropTypes.string,
}

const defaultProps = {
  userName: '',
}

class EventRow extends PureComponent {
  render() {
    const { actionType, timestamp, userName } = this.props

    const eventTimestamp = getYMDHMSFromTimestamp(timestamp)
    return (
      <Grid.Column width={10}>
        {actionType} {userName} {eventTimestamp}
      </Grid.Column>
    )
  }
}

EventRow.propTypes = propTypes
EventRow.defaultProps = defaultProps

export default EventRow
