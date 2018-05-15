import React from 'react'
import PropTypes from 'prop-types'
import { Button, Table } from 'semantic-ui-react'
import { createGetItemById } from 'coreModules/crud/higherOrderComponents'
import { compose } from 'redux'
import { DISCONNECT_PREPARATION_TYPE } from '../../../../constants'

const propTypes = {
  edit: PropTypes.bool.isRequired,
  item: PropTypes.object,
  itemId: PropTypes.string.isRequired,
  onInteraction: PropTypes.func,
}
const defaultProps = {
  item: undefined,
  onInteraction: undefined,
}

const TaxonNameRow = ({ edit, item, itemId, onInteraction }) => {
  const { id, attributes: { category, name } = {} } = item || {}

  return (
    <Table.Row>
      <Table.Cell>
        <a className="ui link">{id}</a>
      </Table.Cell>
      <Table.Cell>
        <a className="ui link">{name}</a>
      </Table.Cell>
      <Table.Cell>{category}</Table.Cell>
      {edit && (
        <Table.Cell>
          <Button
            onClick={event => {
              event.preventDefault()
              onInteraction(DISCONNECT_PREPARATION_TYPE, {
                itemId,
              })
            }}
          >
            Disconnect
          </Button>
        </Table.Cell>
      )}
    </Table.Row>
  )
}

TaxonNameRow.propTypes = propTypes
TaxonNameRow.defaultProps = defaultProps

export default compose(
  createGetItemById({
    refresh: false,
    resource: 'preparationType',
  })
)(TaxonNameRow)
