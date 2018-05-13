import React from 'react'
import PropTypes from 'prop-types'
import { Button, Table } from 'semantic-ui-react'
import { createGetItemById } from 'coreModules/crud/higherOrderComponents'
import { compose } from 'redux'
import { SET_TAXON_NAME_INSPECT } from '../../../../constants'
import TaxonNameLabel from '../../taxonName/Label'

const propTypes = {
  item: PropTypes.object,
  itemId: PropTypes.string.isRequired,
  nameType: PropTypes.string.isRequired,
  onChangeFromAcceptedToSynonym: PropTypes.func,
  onChangeFromSynonymToAccepted: PropTypes.func,
  onDisconnect: PropTypes.func,
  onInteraction: PropTypes.func.isRequired,
  tableHasActions: PropTypes.bool.isRequired,
  taxonId: PropTypes.string,
}
const defaultProps = {
  item: undefined,
  onChangeFromAcceptedToSynonym: undefined,
  onChangeFromSynonymToAccepted: undefined,
  onDisconnect: undefined,
  taxonId: undefined,
}

const TaxonNameRow = ({
  itemId,
  nameType,
  onChangeFromAcceptedToSynonym: handleChangeFromAcceptedToSynonym,
  onChangeFromSynonymToAccepted: handleChangeFromSynonymToAccepted,
  onDisconnect: handleDisconnect,
  onInteraction: handleInteraction,
  tableHasActions,
  taxonId,
  item,
}) => {
  const { attributes: { name, rank, rubinNumber } = {} } = item || {}

  return (
    <Table.Row>
      <Table.Cell
        onClick={event => {
          event.preventDefault()
          handleInteraction(SET_TAXON_NAME_INSPECT, {
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
      {tableHasActions && (
        <Table.Cell>
          {handleDisconnect && (
            <Button
              onClick={event =>
                handleDisconnect(event, { nameType, taxonNameId: itemId })
              }
            >
              Disconnect
            </Button>
          )}
          {handleChangeFromAcceptedToSynonym && (
            <Button
              onClick={event =>
                handleChangeFromAcceptedToSynonym(event, {
                  taxonId,
                  taxonNameId: itemId,
                })
              }
            >
              Set as synonym
            </Button>
          )}
          {handleChangeFromSynonymToAccepted && (
            <Button
              onClick={event =>
                handleChangeFromSynonymToAccepted(event, {
                  taxonId,
                  taxonNameId: itemId,
                })
              }
            >
              Set as accepted
            </Button>
          )}
        </Table.Cell>
      )}
    </Table.Row>
  )
}

TaxonNameRow.propTypes = propTypes
TaxonNameRow.defaultProps = defaultProps

export default compose(
  createGetItemById({
    resource: 'taxonName',
  })
)(TaxonNameRow)
