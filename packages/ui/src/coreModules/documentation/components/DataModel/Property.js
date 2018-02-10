import React from 'react'
import PropTypes from 'prop-types'
import { Segment, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import createModelLink from '../../utilities/createModelLink'

const propTypes = {
  model: PropTypes.object.isRequired,
  property: PropTypes.object.isRequired,
  version: PropTypes.string.isRequired,
}

const defaultProps = {}

const Property = ({ model, property, version }) => {
  const id = `${model.key}.${property.key}`

  return (
    <Segment id={id}>
      <h2>{property.key || 'Property title'}</h2>
      <Link
        className="item"
        to={createModelLink({
          modelName: model.key,
          version,
        })}
      >
        Model: {model.key}
      </Link>
      <p>{property.description || 'Property description'}</p>

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Key</Table.HeaderCell>
            <Table.HeaderCell>Value</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Object.keys(property)
            .filter(key => key !== 'description')
            .map(key => {
              return (
                <Table.Row>
                  <Table.Cell>{key}</Table.Cell>
                  <Table.Cell>{JSON.stringify(property[key])}</Table.Cell>
                </Table.Row>
              )
            })}
        </Table.Body>
      </Table>
    </Segment>
  )
}

Property.propTypes = propTypes
Property.defaultProps = defaultProps

export default Property
