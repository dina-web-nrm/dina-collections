import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import RecordHistoryEventsTable from './RecordHistoryEventsTable'

const mapStateToProps = (state, { formValueSelector }) => {
  return {
    recordHistoryEvents: formValueSelector(state, 'recordHistoryEvents'),
  }
}

const propTypes = {
  recordHistoryEvents: PropTypes.array,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
}

const defaultProps = {
  readOnly: undefined,
  recordHistoryEvents: undefined,
}

class RecordHistoryEvents extends PureComponent {
  render() {
    const { recordHistoryEvents, removeArrayFieldByIndex } = this.props
    return (
      <RecordHistoryEventsTable
        recordHistoryEvents={recordHistoryEvents}
        removeArrayFieldByIndex={removeArrayFieldByIndex}
      />
    )
  }
}

RecordHistoryEvents.propTypes = propTypes
RecordHistoryEvents.defaultProps = defaultProps

export default compose(connect(mapStateToProps))(RecordHistoryEvents)
