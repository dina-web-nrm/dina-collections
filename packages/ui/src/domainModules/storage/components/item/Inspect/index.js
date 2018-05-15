import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'
import { compose } from 'redux'
import { createGetItemById } from 'coreModules/crud/higherOrderComponents'
import { ParentChildTables } from 'coreModules/crudBlocks/components'
import { SET_ITEM_INSPECT } from 'coreModules/crudBlocks/constants'
import TaxonNameTable from '../shared/TaxonNameTable'

const propTypes = {
  acceptedTaxonNames: PropTypes.array,
  children: PropTypes.array,
  item: PropTypes.object,
  onInteraction: PropTypes.func.isRequired,
  parent: PropTypes.object,
}

const defaultProps = {
  acceptedTaxonNames: [],
  children: [],
  item: undefined,
  parent: null,
}

export class Inspect extends PureComponent {
  constructor(props) {
    super(props)
    this.handleRowClick = this.handleRowClick.bind(this)
  }

  handleRowClick(event, itemId) {
    event.preventDefault()
    this.props.onInteraction(SET_ITEM_INSPECT, {
      itemId,
    })
  }

  render() {
    const {
      acceptedTaxonNames,
      children,
      item: storageLocation,
      parent,
    } = this.props
    if (!storageLocation) {
      return null
    }

    const { attributes = {} } = storageLocation
    return (
      <React.Fragment>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Key</Table.HeaderCell>
              <Table.HeaderCell>Value</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {storageLocation && (
            <Table.Body>
              <Table.Row>
                <Table.Cell>Name</Table.Cell>
                <Table.Cell>{attributes.name}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>id</Table.Cell>
                <Table.Cell>{storageLocation.id}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Description</Table.Cell>
                <Table.Cell>{attributes.description}</Table.Cell>
              </Table.Row>
            </Table.Body>
          )}
        </Table>

        <TaxonNameTable
          acceptedTaxonNames={acceptedTaxonNames}
          onTaxonNameInteraction={this.handleTaxonNameInteraction}
          width={16}
        />

        <ParentChildTables
          childrenItems={children}
          onRowClick={this.handleRowClick}
          parentItem={parent}
        />
      </React.Fragment>
    )
  }
}

Inspect.propTypes = propTypes
Inspect.defaultProps = defaultProps

export default compose(
  createGetItemById({
    include: ['parent', 'children', 'acceptedTaxonNames'],
    injectRelationships: ['acceptedTaxonNames', 'parent', 'children'],
    relationships: ['all'],
    resource: 'storageLocation',
  })
)(Inspect)
