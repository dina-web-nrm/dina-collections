import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import TaxonNameRow from './TaxonNameRow'
import NewTaxonNameRowWrapper from './NewTaxonNameRowWrapper'

const propTypes = {
  acceptedTaxonNames: PropTypes.array,
  edit: PropTypes.bool.isRequired,
  onInteraction: PropTypes.func,
}

const defaultProps = {
  acceptedTaxonNames: [],
  onInteraction: undefined,
}

export class TaxonNameTable extends Component {
  render() {
    const { acceptedTaxonNames, edit } = this.props
    return (
      <React.Fragment>
        <h2>Taxon names</h2>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Rank</Table.HeaderCell>
              <Table.HeaderCell>Rubin</Table.HeaderCell>
              {edit && <Table.HeaderCell>Actions</Table.HeaderCell>}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {acceptedTaxonNames.map(taxonName => {
              const { id } = taxonName

              return (
                <TaxonNameRow
                  edit={edit}
                  itemId={id}
                  key={id}
                  onInteraction={this.props.onInteraction}
                />
              )
            })}
            {edit && (
              <NewTaxonNameRowWrapper
                onInteraction={this.props.onInteraction}
              />
            )}
          </Table.Body>
        </Table>
      </React.Fragment>
    )
  }
}

TaxonNameTable.propTypes = propTypes
TaxonNameTable.defaultProps = defaultProps

export default TaxonNameTable
