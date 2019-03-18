import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid, Icon } from 'semantic-ui-react'

import { getYMDHMSFromTimestamp } from 'common/es5/date'

const propTypes = {
  eventType: PropTypes.string.isRequired,
  includeSourceLink: PropTypes.bool,
  recordHistoryId: PropTypes.string,
  timestamp: PropTypes.string.isRequired,
  username: PropTypes.string,
}

const defaultProps = {
  includeSourceLink: false,
  recordHistoryId: undefined,
  username: 'Admin',
}

class EventRow extends PureComponent {
  render() {
    const {
      eventType,
      includeSourceLink,
      recordHistoryId,
      timestamp,
      username,
    } = this.props

    const eventTimestamp = getYMDHMSFromTimestamp(timestamp)
    let eventRow = username
      ? `${eventType} ${username} ${eventTimestamp}`
      : `${eventType} ${eventTimestamp}`
    if (includeSourceLink) {
      eventRow = (
        <span>
          {eventRow}{' '}
          <a
            data-testid="sourceDataLink"
            href={`/dataViewer/sourceData/${recordHistoryId}`}
            target="_blank"
          >
            Source data <Icon name="external alternate" />
          </a>
        </span>
      )
    }

    return <Grid.Column width={16}>{eventRow}</Grid.Column>
  }
}

EventRow.propTypes = propTypes
EventRow.defaultProps = defaultProps

export default EventRow
