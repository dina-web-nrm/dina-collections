import React from 'react'
import PropTypes from 'prop-types'
import { Button, Table } from 'semantic-ui-react'
import { SET_TAXON_NAME_INSPECT } from '../../../../constants'
import TaxonNameLabel from '../../taxonName/Label'

const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  nameType: PropTypes.string.isRequired,
  onChangeFromAcceptedToSynonym: PropTypes.func,
  onChangeFromSynonymToAccepted: PropTypes.func,
  onDisconnect: PropTypes.func,
  onInteraction: PropTypes.func.isRequired,
  rank: PropTypes.string,
  rubinNumber: PropTypes.string,
  tableHasActions: PropTypes.bool.isRequired,
  taxonId: PropTypes.string,
}
const defaultProps = {
  onChangeFromAcceptedToSynonym: undefined,
  onChangeFromSynonymToAccepted: undefined,
  onDisconnect: undefined,
  rank: undefined,
  rubinNumber: undefined,
  taxonId: undefined,
}

const TaxonNameRow = ({
  id,
  name,
  nameType,
  onChangeFromAcceptedToSynonym: handleChangeFromAcceptedToSynonym,
  onChangeFromSynonymToAccepted: handleChangeFromSynonymToAccepted,
  onDisconnect: handleDisconnect,
  onInteraction: handleInteraction,
  rank,
  rubinNumber,
  tableHasActions,
  taxonId,
}) => {
  return (
    <Table.Row>
      <Table.Cell
        onClick={event => {
          event.preventDefault()
          handleInteraction(SET_TAXON_NAME_INSPECT, {
            itemId: id,
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
                handleDisconnect(event, { nameType, taxonNameId: id })
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
                  taxonNameId: id,
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
                  taxonNameId: id,
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

export default TaxonNameRow
