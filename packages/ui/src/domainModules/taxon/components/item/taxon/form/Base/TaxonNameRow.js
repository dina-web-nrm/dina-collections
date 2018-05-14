import React from 'react'
import PropTypes from 'prop-types'
import { Button, Table } from 'semantic-ui-react'
import { createGetItemById } from 'coreModules/crud/higherOrderComponents'
import { compose } from 'redux'
import { ACCEPTED, SYNONYM } from '../../../../../constants'
import TaxonNameLabel from '../../../taxonName/Label'

const propTypes = {
  item: PropTypes.object,
  itemId: PropTypes.string.isRequired,
  nameType: PropTypes.string.isRequired,
  onTaxonNameInteraction: PropTypes.func.isRequired,
  stateIndex: PropTypes.number,
}
const defaultProps = {
  item: undefined,
  stateIndex: undefined,
}

const TaxonNameRow = ({
  onTaxonNameInteraction,
  item,
  itemId,
  nameType,
  stateIndex,
}) => {
  const { id, attributes: { name, rank, rubinNumber } = {} } = item || {}

  return (
    <Table.Row>
      <Table.Cell selectable>
        <a className="ui link">{id}</a>
      </Table.Cell>
      <Table.Cell selectable>
        <a className="ui link">{name}</a>
      </Table.Cell>
      <Table.Cell>{rank}</Table.Cell>
      <Table.Cell>{rubinNumber}</Table.Cell>
      <Table.Cell>
        <TaxonNameLabel nameType={nameType} />
      </Table.Cell>

      <Table.Cell>
        {nameType === ACCEPTED && (
          <Button
            onClick={event => {
              event.preventDefault()
              onTaxonNameInteraction({
                interactionType: 'setAsSynonym',
                itemId,
                nameType,
                stateIndex,
              })
            }}
          >
            Set as synonym
          </Button>
        )}
        {nameType === SYNONYM && (
          <Button
            onClick={event => {
              event.preventDefault()
              onTaxonNameInteraction({
                interactionType: 'setAsAccepted',
                itemId,
                nameType,
                stateIndex,
              })
            }}
          >
            Set as accepted
          </Button>
        )}
        <Button
          onClick={event => {
            event.preventDefault()
            onTaxonNameInteraction({
              interactionType: 'disconnect',
              itemId,
              nameType,
              stateIndex,
            })
          }}
        >
          Disconnect
        </Button>
      </Table.Cell>
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
