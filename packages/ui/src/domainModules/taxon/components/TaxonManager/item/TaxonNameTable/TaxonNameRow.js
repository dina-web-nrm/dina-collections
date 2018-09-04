import React from 'react'
import PropTypes from 'prop-types'
import { Button, Table } from 'semantic-ui-react'
import { createGetItemById } from 'coreModules/crud/higherOrderComponents'
import { compose } from 'redux'
import {
  ACCEPTED,
  DISCONNECT_TAXON_NAME,
  SET_TAXON_NAME_AS_ACCEPTED,
  SET_TAXON_NAME_AS_SYNONYM,
  SET_TAXON_NAME_INSPECT,
  SYNONYM,
} from '../../../../constants'
import TaxonNameLabel from '../Label'

const propTypes = {
  edit: PropTypes.bool.isRequired,
  item: PropTypes.object,
  itemId: PropTypes.string.isRequired,
  nameType: PropTypes.string.isRequired,
  onInteraction: PropTypes.func.isRequired,
  stateIndex: PropTypes.number,
}
const defaultProps = {
  item: undefined,
  stateIndex: undefined,
}

const TaxonNameRow = ({
  edit,
  item,
  itemId,
  nameType,
  onInteraction,
  stateIndex,
}) => {
  const { id, attributes: { name, rank, rubinNumber } = {} } = item || {}

  return (
    <Table.Row>
      <Table.Cell
        onClick={event => {
          event.preventDefault()
          onInteraction(SET_TAXON_NAME_INSPECT, {
            itemId,
          })
        }}
        selectable
      >
        <a className="ui link">{id}</a>
      </Table.Cell>
      <Table.Cell
        onClick={event => {
          event.preventDefault()
          onInteraction(SET_TAXON_NAME_INSPECT, {
            itemId,
          })
        }}
        selectable
      >
        <a className="ui link">{name}</a>
      </Table.Cell>
      <Table.Cell>{rank}</Table.Cell>
      <Table.Cell>{rubinNumber}</Table.Cell>
      <Table.Cell>
        <TaxonNameLabel nameType={nameType} />
      </Table.Cell>
      {edit && (
        <Table.Cell>
          {nameType === ACCEPTED && (
            <Button
              onClick={event => {
                event.preventDefault()
                onInteraction(SET_TAXON_NAME_AS_SYNONYM, {
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
                onInteraction(SET_TAXON_NAME_AS_ACCEPTED, {
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
              onInteraction(DISCONNECT_TAXON_NAME, {
                itemId,
                nameType,
                stateIndex,
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
