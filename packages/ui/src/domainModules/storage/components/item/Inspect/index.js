import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import globalCrudSelectors from 'coreModules/crud/globalSelectors'
import { getChildrenIds, getParentId } from 'coreModules/crud/utilities'

import { createGetItemById } from 'coreModules/crud/higherOrderComponents'

import { ParentChildTables } from 'coreModules/crudBlocks/components'
import { SET_ITEM_INSPECT } from 'coreModules/crudBlocks/constants'

const mapStateToProps = (state, ownProps) => {
  const { item: storageLocation } = ownProps
  const parentId = getParentId(storageLocation)
  const parent =
    parentId && globalCrudSelectors.storageLocation.getOne(state, parentId)
  const children = getChildrenIds(storageLocation).map(id => {
    return globalCrudSelectors.storageLocation.getOne(state, id) || { id }
  })

  return {
    children,
    parent,
    storageLocation,
  }
}

const propTypes = {
  children: PropTypes.array,
  onInteraction: PropTypes.func.isRequired,
  parent: PropTypes.object,
  storageLocation: PropTypes.object,
}

const defaultProps = {
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
    const { children, parent, storageLocation } = this.props
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
    include: ['parent', 'children'],
    relationships: ['all'],
    resource: 'storageLocation',
  }),
  connect(mapStateToProps)
)(Inspect)
