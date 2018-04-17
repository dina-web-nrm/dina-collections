import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import storageServiceSelectors from 'dataModules/storageService/globalSelectors'
import {
  createGetStorageLocationById,
  ensureAllStorageLocationsFetched,
} from 'dataModules/storageService/higherOrderComponents'
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

export class Inspect extends Component {
  render() {
    const {
      allStorageLocationsFetched,
      children,
      onInteraction: handleInteraction,
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
        <h2>Belongs to</h2>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>id</Table.HeaderCell>
              <Table.HeaderCell>name</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {parent && (
            <Table.Body>
              <Table.Row
                onClick={event => {
                  event.preventDefault()
                  handleInteraction(SET_ITEM_INSPECT, {
                    itemId: parent.id,
                  })
                }}
              >
                <Table.Cell>
                  <a>{parent.id}</a>
                </Table.Cell>
                <Table.Cell>
                  <a>{parent.name}</a>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          )}
        </Table>

        <h2>Contains</h2>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>id</Table.HeaderCell>
              <Table.HeaderCell>name</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {children &&
              children.map(child => {
                return (
                  <Table.Row
                    key={child.id}
                    onClick={event => {
                      event.preventDefault()
                      handleInteraction(SET_ITEM_INSPECT, {
                        itemId: child.id,
                      })
                    }}
                  >
                    <Table.Cell>
                      <a>{child.id}</a>
                    </Table.Cell>
                    <Table.Cell>
                      <a>{child.name}</a>
                    </Table.Cell>
                  </Table.Row>
                )
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
  ensureAllStorageLocationsFetched(),
  createGetStorageLocationById(),
  connect(mapStateToProps)
)(Inspect)
