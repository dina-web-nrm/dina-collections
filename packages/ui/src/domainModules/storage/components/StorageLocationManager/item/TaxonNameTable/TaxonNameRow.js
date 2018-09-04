import React from 'react'
import PropTypes from 'prop-types'
import { Button, Table } from 'semantic-ui-react'
import { createGetItemById } from 'coreModules/crud/higherOrderComponents'
import { compose } from 'redux'
import { DISCONNECT_TAXON_NAME } from '../../../../constants'

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
  const { id, attributes: { name, rank, rubinNumber } = {} } = item || {}

  return (
    <Table.Row>
      <Table.Cell>{id}</Table.Cell>
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell>{rank}</Table.Cell>
      <Table.Cell>{rubinNumber}</Table.Cell>
      {edit && (
        <Table.Cell>
          <Button
            onClick={event => {
              event.preventDefault()
              onInteraction(DISCONNECT_TAXON_NAME, {
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
    resource: 'taxonName',
  })
)(TaxonNameRow)
