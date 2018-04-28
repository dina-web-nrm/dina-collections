import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import storageServiceSelectors from 'dataModules/storageService/globalSelectors'
import {
  createGetStorageLocationById,
  ensureAllStorageLocationsFetched,
} from 'dataModules/storageService/higherOrderComponents'
import { ParentChildTables } from 'coreModules/crudBlocks/components'
import { SET_ITEM_INSPECT } from 'coreModules/crudBlocks/constants'

const mapStateToProps = (state, ownProps) => {
  const { storageLocation } = ownProps
  const parent =
    storageLocation &&
    storageLocation.parent &&
    storageServiceSelectors.getStorageLocation(state, storageLocation.parent.id)
  const children =
    storageLocation &&
    storageLocation.children &&
    storageLocation.children.map(({ id }) => {
      return storageServiceSelectors.getStorageLocation(state, id)
    })

  return {
    children,
    parent,
    storageLocation,
  }
}

const propTypes = {
  allStorageLocationsFetched: PropTypes.bool,
  children: PropTypes.array,
  onInteraction: PropTypes.func.isRequired,
  parent: PropTypes.object,
  storageLocation: PropTypes.object,
}

const defaultProps = {
  allStorageLocationsFetched: undefined,
  children: [],
  parent: null,
  storageLocation: undefined,
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
      allStorageLocationsFetched,
      children,
      parent,
      storageLocation,
    } = this.props

    if (!storageLocation || !allStorageLocationsFetched) {
      return null
    }

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
                <Table.Cell>{storageLocation.name}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>id</Table.Cell>
                <Table.Cell>{storageLocation.id}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Description</Table.Cell>
                <Table.Cell>{storageLocation.description}</Table.Cell>
              </Table.Row>
            </Table.Body>
          )}
        </Table>

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
  ensureAllStorageLocationsFetched(),
  createGetStorageLocationById(),
  connect(mapStateToProps)
)(Inspect)
