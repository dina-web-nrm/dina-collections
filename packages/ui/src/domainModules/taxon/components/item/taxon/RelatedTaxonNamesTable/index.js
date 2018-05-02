import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'

import { ACCEPTED, SYNONYM, VERNACULAR } from '../../../../constants'
import taxonSelectors from '../../../../globalSelectors'
import TaxonNameRow from './TaxonNameRow'

const mapStateToProps = (state, { taxon }) => {
  const { parent, children } =
    (taxon &&
      taxon.id &&
      taxonSelectors.getParentAndChildrenWithNamesForTaxon(state, taxon.id)) ||
    {}

  const { acceptedTaxonName, synonyms, vernacularNames } =
    (taxon &&
      taxon.id &&
      taxonSelectors.getPopulatedTaxonNamesForTaxon(state, taxon.id)) ||
    {}

  return {
    acceptedTaxonName,
    children,
    parent,
    synonyms,
    taxon,
    vernacularNames,
  }
}

const propTypes = {
  acceptedTaxonName: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rank: PropTypes.string,
    rubinNumber: PropTypes.string,
  }),
  onChangeFromAcceptedToSynonym: PropTypes.func,
  onChangeFromSynonymToAccepted: PropTypes.func,
  onDisconnect: PropTypes.func,
  onInteraction: PropTypes.func.isRequired,
  synonyms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      rank: PropTypes.string,
      rubinNumber: PropTypes.string,
    })
  ),
  taxon: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  vernacularNames: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
}

const defaultProps = {
  acceptedTaxonName: undefined,
  onChangeFromAcceptedToSynonym: undefined,
  onChangeFromSynonymToAccepted: undefined,
  onDisconnect: undefined,
  synonyms: undefined,
  taxon: undefined,
  vernacularNames: undefined,
}

const RelatedTaxonNamesTable = ({
  acceptedTaxonName,
  onChangeFromAcceptedToSynonym,
  onChangeFromSynonymToAccepted,
  onDisconnect,
  onInteraction,
  synonyms,
  taxon,
  vernacularNames,
}) => {
  const tableHasActions = !!(
    onDisconnect ||
    onChangeFromAcceptedToSynonym ||
    onChangeFromSynonymToAccepted
  )

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
        {acceptedTaxonName && (
          <TaxonNameRow
            id={acceptedTaxonName.id}
            name={acceptedTaxonName.name}
            nameType={ACCEPTED}
            onChangeFromAcceptedToSynonym={onChangeFromAcceptedToSynonym}
            onDisconnect={onDisconnect}
            onInteraction={onInteraction}
            rank={acceptedTaxonName.rank}
            rubinNumber={acceptedTaxonName.rubinNumber}
            tableHasActions={tableHasActions}
            taxonId={taxonId}
          />
        )}
        {synonyms &&
          synonyms.length > 0 &&
          synonyms.map(({ id, name, rank, rubinNumber }) => {
            return (
              <TaxonNameRow
                id={id}
                key={id}
                name={name}
                nameType={SYNONYM}
                onChangeFromSynonymToAccepted={
                  (!acceptedTaxonName && onChangeFromSynonymToAccepted) ||
                  undefined
                }
                onDisconnect={onDisconnect}
                onInteraction={onInteraction}
                rank={rank}
                rubinNumber={rubinNumber}
                tableHasActions={tableHasActions}
                taxonId={taxonId}
              />
            )
          })}
        {vernacularNames &&
          vernacularNames.length > 0 &&
          vernacularNames.map(({ id, name, rank, rubinNumber }) => {
            return (
              <TaxonNameRow
                id={id}
                key={id}
                name={name}
                nameType={VERNACULAR}
                onDisconnect={onDisconnect}
                onInteraction={onInteraction}
                rank={rank}
                rubinNumber={rubinNumber}
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

export default connect(mapStateToProps)(RelatedTaxonNamesTable)
