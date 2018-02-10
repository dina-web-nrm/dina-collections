import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

import Type from './Type'
import createParameterLink from '../../utilities/createParameterLink'

const propTypes = {
  model: PropTypes.object.isRequired,
  properties: PropTypes.array.isRequired,
  version: PropTypes.string.isRequired,
}

const PropertyOverview = ({ properties, model, version }) => {
  return (
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
          return (
            <Table.Row key={property.key}>
              <Table.Cell>
                <Link
                  to={createParameterLink({
                    modelName: model.key,
                    parameterName: property.key,
                    version,
                  })}
                >
                  {property.key}
                </Link>
              </Table.Cell>
              <Table.Cell>{property.description}</Table.Cell>
              <Table.Cell>
                <Type property={property} version={version} />
              </Table.Cell>
              <Table.Cell>{property.example}</Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}

PropertyOverview.propTypes = propTypes

export default PropertyOverview
