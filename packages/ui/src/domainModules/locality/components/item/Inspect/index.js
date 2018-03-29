import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import localityServiceSelectors from 'domainModules/localityService/globalSelectors'
import {
  createGetCuratedLocalityById,
  ensureAllLocalitiesFetched,
} from 'domainModules/localityService/higherOrderComponents'

const mapStateToProps = (state, ownProps) => {
  const { curatedLocality } = ownProps
  const parent =
    curatedLocality &&
    curatedLocality.parent &&
    localityServiceSelectors.getCuratedLocality(
      state,
      curatedLocality.parent.id
    )
  const children =
    curatedLocality &&
    curatedLocality.children &&
    curatedLocality.children.map(({ id }) => {
      return localityServiceSelectors.getCuratedLocality(state, id)
    })
  return {
    children,
    curatedLocality,
    parent,
  }
}

const propTypes = {
  allLocalitiesFetched: PropTypes.bool.isRequired,
  children: PropTypes.array,
  curatedLocality: PropTypes.object,
  parent: PropTypes.object,
}

const defaultProps = {
  children: [],
  curatedLocality: undefined,
  parent: null,
}

export class Inspect extends Component {
  render() {
    const {
      allLocalitiesFetched,
      children,
      curatedLocality,
      parent,
    } = this.props
    if (!curatedLocality || !allLocalitiesFetched) {
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
          {curatedLocality && (
            <Table.Body>
              <Table.Row>
                <Table.Cell>Namn</Table.Cell>
                <Table.Cell>{curatedLocality.name}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>id</Table.Cell>
                <Table.Cell>{curatedLocality.id}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>MaximumElevationInMeters</Table.Cell>
                <Table.Cell>
                  {curatedLocality.verticalPosition &&
                    curatedLocality.verticalPosition.maximummElevationInMeters}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>MinimumElevationInMeters</Table.Cell>
                <Table.Cell>
                  {curatedLocality.verticalPosition &&
                    curatedLocality.verticalPosition.minimumElevationInMeters}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>MaximumDepthInMeters</Table.Cell>
                <Table.Cell>
                  {curatedLocality.verticalPosition &&
                    curatedLocality.verticalPosition.maximumDepthInMeters}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>MinimumDepthInMeters</Table.Cell>
                <Table.Cell>
                  {curatedLocality.verticalPosition &&
                    curatedLocality.verticalPosition.minimumDepthInMeters}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Latitude</Table.Cell>
                <Table.Cell>{curatedLocality.latitude}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Longitude</Table.Cell>
                <Table.Cell>{curatedLocality.longitude}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>UncertaintyInMeters</Table.Cell>
                <Table.Cell>{curatedLocality.uncertaintyInMeters}</Table.Cell>
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
  ensureAllLocalitiesFetched,
  createGetCuratedLocalityById,
  connect(mapStateToProps)
)(Inspect)
