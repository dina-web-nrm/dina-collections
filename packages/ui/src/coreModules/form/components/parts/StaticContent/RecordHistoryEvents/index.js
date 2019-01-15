import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import TranslatedHeader from '../TranslatedHeader'
import EventRow from './EventRow'

const mapStateToProps = (_, { resourceActivities }) => {
  if (!resourceActivities || !resourceActivities.length) {
    return {}
  }

  return {
    createdEvent: resourceActivities.find(({ action }) => action === 'create'),
    lastModifiedEvent: resourceActivities.find(
      ({ action }) => action === 'update'
    ),
  }
}

const propTypes = {
  createdEvent: PropTypes.shape({
    srcCreatedAt: PropTypes.string,
    username: PropTypes.string,
  }),
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  lastModifiedEvent: PropTypes.shape({
    srcUpdatedAt: PropTypes.string,
    username: PropTypes.string,
  }),
  module: PropTypes.string.isRequired,
}
const defaultProps = {
  createdEvent: undefined,
  lastModifiedEvent: undefined,
}

class RecordHistoryEvents extends PureComponent {
  render() {
    const {
      createdEvent,
      lastModifiedEvent,
      i18n: { moduleTranslate },
      module,
    } = this.props

    const hasEvents = createdEvent || lastModifiedEvent

    const username =
      (createdEvent && createdEvent.username) || 'Admin (imported)'
    return (
      <React.Fragment>
        {hasEvents && (
          <TranslatedHeader
            as="h3"
            module={module}
            textKey="headers.recordHistory"
          />
        )}
        {createdEvent && (
          <EventRow
            eventType={moduleTranslate({
              capitalize: true,
              module,
              textKey: 'other.createdBy',
            })}
            includeSourceLink={createdEvent.hasSourceData}
            recordHistoryId={createdEvent.id}
            timestamp={createdEvent.srcCreatedAt}
            username={username}
          />
        )}

        {lastModifiedEvent && (
          <EventRow
            eventType={moduleTranslate({
              capitalize: true,
              module,
              textKey: 'other.lastModifiedBy',
            })}
            timestamp={lastModifiedEvent.srcUpdatedAt}
            username={lastModifiedEvent.username}
          />
        )}
      </React.Fragment>
    )
  }
}

RecordHistoryEvents.propTypes = propTypes
RecordHistoryEvents.defaultProps = defaultProps

export default compose(withI18n(), connect(mapStateToProps))(
  RecordHistoryEvents
)
