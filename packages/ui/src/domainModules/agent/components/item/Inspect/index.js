import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'
import { compose } from 'redux'
import { CustomData } from 'coreModules/form/components'

import { createGetItemById } from 'coreModules/crud/higherOrderComponents'
import { SET_ITEM_INSPECT } from 'coreModules/crudBlocks/constants'
import RolesTable from '../../shared/RolesTable'

const propTypes = {
  agent: PropTypes.object,
  onInteraction: PropTypes.func.isRequired,
  user: PropTypes.object,
}

const defaultProps = {
  agent: undefined,
  user: undefined,
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
    const { agent, user } = this.props
    if (!agent) {
      return null
    }

    const { attributes: agentAttributes } = agent
    const { attributes: userAttributes } = user || {}

    return (
      <React.Fragment>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Key</Table.HeaderCell>
              <Table.HeaderCell>Value</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {agentAttributes && (
            <Table.Body>
              <Table.Row>
                <Table.Cell>Agent type</Table.Cell>
                <Table.Cell>{agentAttributes.agentType}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>id</Table.Cell>
                <Table.Cell>{agent.id}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Full name</Table.Cell>
                <Table.Cell>{agentAttributes.fullName}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Given name</Table.Cell>
                <Table.Cell>{agentAttributes.givenName}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Family name</Table.Cell>
                <Table.Cell>{agentAttributes.familyName}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Additional name</Table.Cell>
                <Table.Cell>{agentAttributes.additionalName}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Abbreviation</Table.Cell>
                <Table.Cell>{agentAttributes.abbreviation}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Also known as</Table.Cell>
                <Table.Cell>{agentAttributes.alsoKnownAs}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Disambiguating description</Table.Cell>
                <Table.Cell>
                  {agentAttributes.disambiguatingDescription}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Remarks</Table.Cell>
                <Table.Cell>{agentAttributes.remarks}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Postal address</Table.Cell>
                <Table.Cell>{agentAttributes.postalAddress}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Telephone</Table.Cell>
                <Table.Cell>{agentAttributes.telephone}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Email</Table.Cell>
                <Table.Cell>{agentAttributes.email}</Table.Cell>
              </Table.Row>
            </Table.Body>
          )}
        </Table>

        <CustomData
          autoComplete="off"
          displayLabel={false}
          input={{ name: 'readOnly', value: agentAttributes.readOnly }}
          meta={{}}
          model="agent"
          module="agent"
          name="readOnly"
          type="read-only"
        />

        <h2>User</h2>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Username</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                {userAttributes && userAttributes.username}
              </Table.Cell>
              <Table.Cell>{userAttributes && userAttributes.email}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <RolesTable roles={agentAttributes.roles} />
      </React.Fragment>
    )
  }
}

Inspect.propTypes = propTypes
Inspect.defaultProps = defaultProps

export default compose(
  createGetItemById({
    itemKey: 'agent',
    relationships: ['user'],
    resource: 'agent',
  }),
  createGetItemById({
    idPath: 'item.relationships.user.data.id',
    itemKey: 'user',
    relationships: [],
    resource: 'user',
  })
)(Inspect)
