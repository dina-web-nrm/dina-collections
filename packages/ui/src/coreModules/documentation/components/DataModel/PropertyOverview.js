import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Segment, Table } from 'semantic-ui-react'

import Type from './Type'
import createParameterLink from '../../utilities/createParameterLink'
import getPropertyIsArray from '../../utilities/getPropertyIsArray'
import getPropertyIsModel from '../../utilities/getPropertyIsModel'
import getPropertyIsAnyOf from '../../utilities/getPropertyIsAnyOf'
import getPropertySummary from '../../utilities/getPropertySummary'

const propTypes = {
  model: PropTypes.object.isRequired,
  properties: PropTypes.array.isRequired,
  specification: PropTypes.object.isRequired,
  version: PropTypes.string.isRequired,
}

const PropertyOverview = ({ properties, model, version, specification }) => {
  return (
    <Segment color="green" style={{ marginTop: '40px' }}>
      <h2>Properties</h2>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Key</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Example</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {properties.map(property => {
            const propertyIsArray = getPropertyIsArray(property)
            const propertyIsModel = getPropertyIsModel(property)
            const propertyIsAnyOf = getPropertyIsAnyOf(property)
            const propertySummary = getPropertySummary({
              property,
              propertyIsAnyOf,
              propertyIsArray,
              propertyIsModel,
              specification,
            })
            return (
              <Table.Row key={property.key}>
                <Table.Cell>
                  {propertyIsArray || propertyIsModel || propertyIsAnyOf ? (
                    property.key
                  ) : (
                    <Link
                      to={createParameterLink({
                        modelName: model.key,
                        parameterName: property.key,
                        version,
                      })}
                    >
                      {property.key}
                    </Link>
                  )}
                </Table.Cell>
                <Table.Cell>{propertySummary}</Table.Cell>
                <Table.Cell>
                  <Type property={property} version={version} />
                </Table.Cell>
                <Table.Cell>{property.example}</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </Segment>
  )
}

PropertyOverview.propTypes = propTypes

export default PropertyOverview
