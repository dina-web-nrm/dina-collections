import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Grid, Header } from 'semantic-ui-react'

import { withI18n } from 'coreModules/i18n/higherOrderComponents'

import EventRow from './EventRow'

const mapStateToProps = (state, { formValueSelector, name }) => {
  const recordHistoryEvents = formValueSelector(state, name)

  if (!recordHistoryEvents || !recordHistoryEvents.length) {
    return {}
  }

  return {
    createdEvent: recordHistoryEvents.find(({ action }) => action === 'create'),
    lastModifiedEvent: recordHistoryEvents.find(
      ({ action }) => action === 'update'
    ),
  }
}

const propTypes = {
  createdEvent: PropTypes.object,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  lastModifiedEvent: PropTypes.object,
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
    } = this.props

    const hasEvents = createdEvent || lastModifiedEvent

    return (
      <Grid.Column width={16}>
        {hasEvents && (
          <Header as="h3">
            {moduleTranslate({
              capitalize: true,
              textKey: 'headers.recordHistory',
            })}
          </Header>
        )}

        {createdEvent && (
          <EventRow
            actionType={moduleTranslate({
              capitalize: true,
              textKey: 'other.createdBy',
            })}
            timestamp={createdEvent.srcCreatedAt}
            username={createdEvent.username}
          />
        )}

        {lastModifiedEvent && (
          <EventRow
            actionType={moduleTranslate({
              capitalize: true,
              textKey: 'other.lastModifiedBy',
            })}
            timestamp={lastModifiedEvent.srcUpdatedAt}
            username={lastModifiedEvent.username}
          />
        )}
      </Grid.Column>
    )
  }
}

RecordHistoryEvents.propTypes = propTypes
RecordHistoryEvents.defaultProps = defaultProps

export default compose(
  withI18n({ module: 'collectionMammals' }),
  connect(mapStateToProps)
)(RecordHistoryEvents)
