import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Table } from 'semantic-ui-react'

import { Field, Input } from 'coreModules/form/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'

import { CATALOG_CARD } from '../../../../constants'

const propTypes = {
  getPath: PropTypes.func.isRequired,

  index: PropTypes.number.isRequired,
  recordHistoryEvent: PropTypes.shape({
    agent: PropTypes.string,
    date: PropTypes.string,
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
            module="collectionMammals"
            name={getPath('system')}
            type="text"
          />
        </Table.Cell>
        <Table.Cell width={3}>
          <Field
            component={Input}
            disabled={!isCatalogCardSystem}
            module="collectionMammals"
            name={getPath('agent')}
            type="text"
          />
        </Table.Cell>
        <Table.Cell width={3}>
          <Field
            component={Input}
            disabled={!isCatalogCardSystem}
            module="collectionMammals"
            name={getPath('date')}
            type="text"
          />
        </Table.Cell>
        <Table.Cell width={7}>
          <Field
            component={Input}
            disabled
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
