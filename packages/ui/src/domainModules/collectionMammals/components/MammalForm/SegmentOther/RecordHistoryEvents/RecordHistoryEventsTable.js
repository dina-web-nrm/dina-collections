import React from 'react'
import PropTypes from 'prop-types'
import { Header, Table } from 'semantic-ui-react'
import { compose } from 'redux'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import RecordHistoryEventsRow from './RecordHistoryEventsRow'

const TABLE_COLUMNS = ['System', 'Agent', 'Agent text', 'Date', 'Description']

const propTypes = {
  recordHistoryEvents: PropTypes.arrayOf(PropTypes.object).isRequired,
}

function RecordHistoryEventsTable({ recordHistoryEvents }) {
  if (!(recordHistoryEvents && recordHistoryEvents.length)) {
    return null
  }
  return (
    <React.Fragment>
      <Header size="small">RecordHistory</Header>
      <Table celled compact striped style={{ marginBottom: '1em' }}>
        <Table.Header>
          <Table.Row>
            {TABLE_COLUMNS.map(textKey => {
              return (
                <Table.HeaderCell key={textKey}>{textKey}</Table.HeaderCell>
              )
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {recordHistoryEvents
            .map((recordHistoryEvent, index) => {
              return (
                <RecordHistoryEventsRow
                  index={index}
                  key={index} // eslint-disable-line react/no-array-index-key
                  recordHistoryEvent={recordHistoryEvent}
                />
              )
            })
            .filter(item => !!item)}
        </Table.Body>
      </Table>
    </React.Fragment>
  )
}

RecordHistoryEventsTable.propTypes = propTypes

export default compose(pathBuilder({ name: 'individual.recordHistoryEvents' }))(
  RecordHistoryEventsTable
)
