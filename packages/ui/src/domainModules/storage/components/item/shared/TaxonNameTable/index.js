import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

import createLog from 'utilities/log'
import TaxonNameRow from './TaxonNameRow'
import NewTaxonName from './NewTaxonName'

export const FORM_NAME = 'storageLocation'

const log = createLog('modules:storage:BaseForm')

const propTypes = {
  acceptedTaxonNames: PropTypes.array,
  onInteraction: PropTypes.func,
}

const defaultProps = {
  acceptedTaxonNames: [],
  onInteraction: undefined,
}

export class TaxonNameTable extends Component {
  render() {
    log.render()
    const editActive = !!this.props.onInteraction
    const { acceptedTaxonNames } = this.props
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
              {editActive && <Table.HeaderCell>Actions</Table.HeaderCell>}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {acceptedTaxonNames.map(taxonName => {
              const { id } = taxonName

              return (
                <TaxonNameRow
                  editActive={editActive}
                  itemId={id}
                  key={id}
                  onInteraction={this.props.onInteraction}
                />
              )
            })}
            {editActive && (
              <NewTaxonName onInteraction={this.props.onInteraction} />
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
