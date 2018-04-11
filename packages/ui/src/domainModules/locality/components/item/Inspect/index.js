import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import localityServiceSelectors from 'dataModules/localityService/globalSelectors'
import {
  createGetPlaceById,
  ensureAllPlacesFetched,
} from 'dataModules/localityService/higherOrderComponents'

const mapStateToProps = (state, ownProps) => {
  const { place } = ownProps
  const parent =
    place &&
    place.parent &&
    localityServiceSelectors.getPlace(state, place.parent.id)
  const children =
    place &&
    place.children &&
    place.children.map(({ id }) => {
      return localityServiceSelectors.getPlace(state, id)
    })
  return {
    children,
    parent,
    place,
  }
}

const propTypes = {
  allLocalitiesFetched: PropTypes.bool.isRequired,
  children: PropTypes.array,
  parent: PropTypes.object,
  place: PropTypes.object,
}

const defaultProps = {
  children: [],
  parent: null,
  place: undefined,
}

export class Inspect extends Component {
  render() {
    const { allLocalitiesFetched, children, place, parent } = this.props
    if (!place || !allLocalitiesFetched) {
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
          {place && (
            <Table.Body>
              <Table.Row>
                <Table.Cell>Namn</Table.Cell>
                <Table.Cell>{place.name}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>id</Table.Cell>
                <Table.Cell>{place.id}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>MaximumElevationInMeters</Table.Cell>
                <Table.Cell>
                  {place.verticalPosition &&
                    place.verticalPosition.maximummElevationInMeters}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>MinimumElevationInMeters</Table.Cell>
                <Table.Cell>
                  {place.verticalPosition &&
                    place.verticalPosition.minimumElevationInMeters}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>MaximumDepthInMeters</Table.Cell>
                <Table.Cell>
                  {place.verticalPosition &&
                    place.verticalPosition.maximumDepthInMeters}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>MinimumDepthInMeters</Table.Cell>
                <Table.Cell>
                  {place.verticalPosition &&
                    place.verticalPosition.minimumDepthInMeters}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Latitude</Table.Cell>
                <Table.Cell>{place.latitude}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Longitude</Table.Cell>
                <Table.Cell>{place.longitude}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>UncertaintyInMeters</Table.Cell>
                <Table.Cell>{place.uncertaintyInMeters}</Table.Cell>
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
                  <Link to={`/app/localities/${parent.id}/inspect`}>
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
                      <Link to={`/app/localities/${child.id}/inspect`}>
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
  ensureAllPlacesFetched(),
  createGetPlaceById(),
  connect(mapStateToProps)
)(Inspect)
