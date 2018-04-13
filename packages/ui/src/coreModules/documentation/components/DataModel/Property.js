import React from 'react'
import PropTypes from 'prop-types'
import { Segment, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import MarkdownToHtmlAsync from 'coreModules/i18n/components/MarkdownToHtmlAsync'
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
    <Segment basic id={id}>
      {property.description && (
        <MarkdownToHtmlAsync markdown={property.description} />
      )}
      <Segment color="blue" style={{ marginTop: '40px' }}>
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
      <Link
        className="item"
        to={createModelLink({
          modelName: model.key,
          version,
        })}
      >
        Model: {model.key}
      </Link>
    </Segment>
  )
}

Property.propTypes = propTypes
Property.defaultProps = defaultProps

export default Property
