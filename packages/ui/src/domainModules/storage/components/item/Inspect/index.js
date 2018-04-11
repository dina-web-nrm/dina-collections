import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import storageServiceSelectors from 'dataModules/storageService/globalSelectors'
import {
  createGetStorageLocationById,
  ensureAllStorageLocationsFetched,
} from 'dataModules/storageService/higherOrderComponents'

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
  parent: PropTypes.object,
  storageLocation: PropTypes.object,
  urlBasePath: PropTypes.string.isRequired,
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
      storageLocation,
      parent,
      urlBasePath,
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
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>id</Table.HeaderCell>
              <Table.HeaderCell>name</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {parent && (
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Link to={`${urlBasePath}/${parent.id}/inspect`}>
                    {parent.id}
                  </Link>
                </Table.Cell>
                <Table.Cell>{parent.name}</Table.Cell>
              </Table.Row>
            </Table.Body>
          )}
        </Table>

        <h2>Contains</h2>
        <Table celled>
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
                  <Table.Row key={child.id}>
                    <Table.Cell>
                      <Link to={`${urlBasePath}/${child.id}/inspect`}>
                        {child.id}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{child.name}</Table.Cell>
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
