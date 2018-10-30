import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Grid, Header } from 'semantic-ui-react'

import { withI18n } from 'coreModules/i18n/higherOrderComponents'

import EventRow from './EventRow'

const mapStateToProps = (state, { formValueSelector, name }) => {
  return {
    recordHistoryEvents: formValueSelector(state, name),
  }
}

const propTypes = {
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  recordHistoryEvents: PropTypes.arrayOf(
    PropTypes.shape({
      action: PropTypes.string,
      srcCreatedAt: PropTypes.string,
      srcUpdatedAt: PropTypes.string,
      username: PropTypes.string,
    })
  ),
}
const defaultProps = {
  recordHistoryEvents: [],
}

class RecordHistoryEvents extends Component {
  render() {
    const { i18n: { moduleTranslate }, recordHistoryEvents } = this.props

    const createdEvent = recordHistoryEvents.find(
      ({ action }) => action === 'create'
    )
    const lastModifiedEvent = recordHistoryEvents.find(
      ({ action }) => action === 'update'
    )

    const hasEvents = recordHistoryEvents.length > 0
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
