import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Table } from 'semantic-ui-react'

import { Field, Input, SingleDate } from 'coreModules/form/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import { AgentDropdownPickerSearch } from 'domainModules/agent/components'
import { ALL } from 'domainModules/agent/constants'
import { CATALOG_CARD } from 'domainModules/collectionMammals/constants'

const propTypes = {
  getPath: PropTypes.func.isRequired,

  index: PropTypes.number.isRequired,
  recordHistoryEvent: PropTypes.shape({
    agent: PropTypes.shape({ id: PropTypes.string }),
    date: PropTypes.shape({ dateText: PropTypes.string }),
    description: PropTypes.string,
    id: PropTypes.string,
    system: PropTypes.string,
  }).isRequired,
}

class RecordHistoryEventsRow extends PureComponent {
  render() {
    const { getPath, index, recordHistoryEvent } = this.props

    const isCatalogCardSystem = recordHistoryEvent.system === CATALOG_CARD

    return (
      <Table.Row key={index}>
        <Table.Cell width={3}>
          <Field
            component={Input}
            disabled
            displayLabel={false}
            module="collectionMammals"
            name={getPath('system')}
            type="text"
          />
        </Table.Cell>
        <Table.Cell width={3}>
          <Field
            autoComplete="off"
            component={AgentDropdownPickerSearch}
            disabled={!isCatalogCardSystem}
            displayLabel={false}
            group={ALL}
            initialText="Choose"
            module="collectionMammals"
            name={getPath('agent.id')}
          />
        </Table.Cell>
        <Table.Cell width={3}>
          <Field
            component={Input}
            disabled={!isCatalogCardSystem}
            displayLabel={false}
            module="collectionMammals"
            name={getPath('agentText')}
            type="text"
          />
        </Table.Cell>
        <Table.Cell width={3}>
          <SingleDate
            disabled={!isCatalogCardSystem}
            displayExact={false}
            displayFlexible
            displayLabel={false}
            displaySubLabels={false}
            displayText={false}
            module="collectionMammals"
            name={getPath('date')}
            stack={false}
          />
        </Table.Cell>
        <Table.Cell width={4}>
          <Field
            component={Input}
            disabled
            displayLabel={false}
            module="collectionMammals"
            name={getPath('description')}
            type="text"
          />
        </Table.Cell>
      </Table.Row>
    )
  }
}

RecordHistoryEventsRow.propTypes = propTypes

export default compose(pathBuilder())(RecordHistoryEventsRow)
