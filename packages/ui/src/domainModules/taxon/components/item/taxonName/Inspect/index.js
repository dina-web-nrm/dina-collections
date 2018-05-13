import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'
import { compose } from 'redux'

import { BlockLoader } from 'coreModules/crudBlocks/components'
import { createGetItemById } from 'coreModules/crud/higherOrderComponents'

import { SET_TAXON_INSPECT } from '../../../../constants'
import TaxonNameLabel from '../Label'

const propTypes = {
  onInteraction: PropTypes.func.isRequired,
  taxonName: PropTypes.object,
}

const defaultProps = {
  taxonName: null,
}

export class Inspect extends PureComponent {
  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
  }

  renderRow({ id, nameType }) {
    return (
      <Table.Row
        key={id}
        onClick={event => {
          event.preventDefault()
          this.props.onInteraction(SET_TAXON_INSPECT, {
            itemId: id,
          })
        }}
      >
        <Table.Cell>
          <TaxonNameLabel nameType={nameType} />
        </Table.Cell>
        <Table.Cell>
          <a>{id}</a>
        </Table.Cell>
      </Table.Row>
    )
  }

  render() {
    const { taxonName } = this.props

    if (!taxonName) {
      return <BlockLoader />
    }

    const {
      id,
      attributes: { name, taxonNameType, rank, rubinNumber },
      relationships: {
        acceptedToTaxon,
        synonymToTaxon,
        vernacularToTaxon,
      } = {},
    } = taxonName

    return (
      <React.Fragment>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Key</Table.HeaderCell>
              <Table.HeaderCell>Value</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>id</Table.Cell>
              <Table.Cell>{id}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>name</Table.Cell>
              <Table.Cell>{name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>taxonNameType</Table.Cell>
              <Table.Cell>{taxonNameType}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>rank</Table.Cell>
              <Table.Cell>{rank}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>rubinNumber</Table.Cell>
              <Table.Cell>{rubinNumber}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <h2>Taxon</h2>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name relation</Table.HeaderCell>
              <Table.HeaderCell>Taxon id</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {acceptedToTaxon &&
              this.renderRow({ id: acceptedToTaxon.id, nameType: 'accepted' })}
            {synonymToTaxon &&
              this.renderRow({ id: synonymToTaxon.id, nameType: 'synonym' })}
            {vernacularToTaxon &&
              this.renderRow({
                id: vernacularToTaxon.id,
                nameType: 'vernacular',
              })}
          </Table.Body>
        </Table>
      </React.Fragment>
    )
  }
}

Inspect.propTypes = propTypes
Inspect.defaultProps = defaultProps

export default compose(
  createGetItemById({
    itemKey: 'taxonName',
    relationships: ['all'],
    resource: 'taxonName',
  })
)(Inspect)
