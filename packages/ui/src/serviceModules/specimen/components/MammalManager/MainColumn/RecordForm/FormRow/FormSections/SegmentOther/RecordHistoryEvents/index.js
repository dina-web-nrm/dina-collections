import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import RecordHistoryEventsTable from './RecordHistoryEventsTable'

const mapStateToProps = (state, { formValueSelector }) => {
  return {
    recordHistoryEvents: formValueSelector(
      state,
      'individual.recordHistoryEvents'
    ),
  }
}

const propTypes = {
  recordHistoryEvents: PropTypes.array,
}

const defaultProps = {
  recordHistoryEvents: undefined,
}

class RecordHistoryEvents extends PureComponent {
  render() {
    const { recordHistoryEvents } = this.props
    return (
      <RecordHistoryEventsTable recordHistoryEvents={recordHistoryEvents} />
    )
  }
}

RecordHistoryEvents.propTypes = propTypes
RecordHistoryEvents.defaultProps = defaultProps

export default compose(connect(mapStateToProps))(RecordHistoryEvents)
