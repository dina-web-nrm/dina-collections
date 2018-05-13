import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'
import TaxonNameRow from './TaxonNameRow'
import NewTaxonName from './NewTaxonName'

const propTypes = {
  onTaxonNameInteraction: PropTypes.func.isRequired,
  sortedNameList: PropTypes.array.isRequired,
}

const defaultProps = {}

const RelatedTaxonNamesTable = ({ onTaxonNameInteraction, sortedNameList }) => {
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Id</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Rank</Table.HeaderCell>
          <Table.HeaderCell>Rubin</Table.HeaderCell>
          <Table.HeaderCell>Type</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sortedNameList.map(taxonItem => {
          return (
            <TaxonNameRow
              itemId={taxonItem.id}
              key={taxonItem.id}
              nameType={taxonItem.nameType}
              onTaxonNameInteraction={onTaxonNameInteraction}
              stateIndex={taxonItem.stateIndex}
            />
          )
        })}
        <NewTaxonName onTaxonNameInteraction={onTaxonNameInteraction} />
      </Table.Body>
    </Table>
  )
}

RelatedTaxonNamesTable.propTypes = propTypes
RelatedTaxonNamesTable.defaultProps = defaultProps

export default RelatedTaxonNamesTable
