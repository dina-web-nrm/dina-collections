import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import formParts from 'coreModules/form/components/parts'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'

import EventRow from './EventRow'

const { TranslatedHeader } = formParts

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
      </React.Fragment>
    )
  }
}

RecordHistoryEvents.propTypes = propTypes
RecordHistoryEvents.defaultProps = defaultProps

export default compose(
  withI18n({ module: 'collectionMammals' }),
  connect(mapStateToProps)
)(RecordHistoryEvents)
