import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'

import { ACCEPTED, SYNONYM, VERNACULAR } from '../../../../constants'
import TaxonNameRow from './TaxonNameRow'

const propTypes = {
  onChangeFromAcceptedToSynonym: PropTypes.func,
  onChangeFromSynonymToAccepted: PropTypes.func,
  onDisconnect: PropTypes.func,
  onInteraction: PropTypes.func.isRequired,
  taxon: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
}

const defaultProps = {
  onChangeFromAcceptedToSynonym: undefined,
  onChangeFromSynonymToAccepted: undefined,
  onDisconnect: undefined,
  taxon: undefined,
}

const RelatedTaxonNamesTable = ({
  onChangeFromAcceptedToSynonym,
  onChangeFromSynonymToAccepted,
  onDisconnect,
  onInteraction,
  taxon,
}) => {
  const tableHasActions = !!(
    onDisconnect ||
    onChangeFromAcceptedToSynonym ||
    onChangeFromSynonymToAccepted
  )

  const {
    relationships: {
      acceptedTaxonName: { data: acceptedTaxonNameRelation = {} } = {},
      synonyms: { data: synonymRelation = [] } = {},
      vernacularNames: { data: vernacularNameRelation = [] } = {},
    } = {},
  } = taxon

  const taxonId = taxon && taxon.id

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Rank</Table.HeaderCell>
          <Table.HeaderCell>Rubin</Table.HeaderCell>
          <Table.HeaderCell>Type</Table.HeaderCell>
          {tableHasActions && <Table.HeaderCell>Actions</Table.HeaderCell>}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {acceptedTaxonNameRelation && (
          <TaxonNameRow
            itemId={acceptedTaxonNameRelation.id}
            nameType={ACCEPTED}
            onChangeFromAcceptedToSynonym={onChangeFromAcceptedToSynonym}
            onDisconnect={onDisconnect}
            onInteraction={onInteraction}
            tableHasActions={tableHasActions}
            taxonId={taxonId}
          />
        )}
        {synonymRelation &&
          synonymRelation.length > 0 &&
          synonymRelation.map(({ id }) => {
            return (
              <TaxonNameRow
                itemId={id}
                key={id}
                nameType={SYNONYM}
                onChangeFromSynonymToAccepted={
                  (!acceptedTaxonNameRelation.id &&
                    onChangeFromSynonymToAccepted) ||
                  undefined
                }
                onDisconnect={onDisconnect}
                onInteraction={onInteraction}
                tableHasActions={tableHasActions}
                taxonId={taxonId}
              />
            )
          })}
        {vernacularNameRelation &&
          vernacularNameRelation.length > 0 &&
          vernacularNameRelation.map(({ id }) => {
            return (
              <TaxonNameRow
                itemId={id}
                key={id}
                nameType={VERNACULAR}
                onDisconnect={onDisconnect}
                onInteraction={onInteraction}
                tableHasActions={tableHasActions}
                taxonId={taxonId}
              />
            )
          })}
      </Table.Body>
    </Table>
  )
}

RelatedTaxonNamesTable.propTypes = propTypes
RelatedTaxonNamesTable.defaultProps = defaultProps

export default RelatedTaxonNamesTable
