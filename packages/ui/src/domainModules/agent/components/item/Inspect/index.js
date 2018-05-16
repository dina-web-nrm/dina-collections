import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { CustomData } from 'coreModules/form/components'

import { createGetItemById } from 'coreModules/crud/higherOrderComponents'
import { SET_ITEM_INSPECT } from 'coreModules/crudBlocks/constants'
import RolesTable from '../../shared/RolesTable'

const mapStateToProps = (state, { item: agent }) => {
  return {
    agent,
  }
}

const propTypes = {
  agent: PropTypes.object,
  onInteraction: PropTypes.func.isRequired,
}

const defaultProps = {
  agent: undefined,
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
    const { agent } = this.props
    if (!agent) {
      return null
    }

    const { attributes } = agent
    return (
      <React.Fragment>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Key</Table.HeaderCell>
              <Table.HeaderCell>Value</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {attributes && (
            <Table.Body>
              <Table.Row>
                <Table.Cell>Agent type</Table.Cell>
                <Table.Cell>{attributes.agentType}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>id</Table.Cell>
                <Table.Cell>{agent.id}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Full name</Table.Cell>
                <Table.Cell>{attributes.fullName}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Given name</Table.Cell>
                <Table.Cell>{attributes.givenName}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Family name</Table.Cell>
                <Table.Cell>{attributes.familyName}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Additional name</Table.Cell>
                <Table.Cell>{attributes.additionalName}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Abbreviation</Table.Cell>
                <Table.Cell>{attributes.abbreviation}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Also known as</Table.Cell>
                <Table.Cell>{attributes.alsoKnownAs}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Disambiguating description</Table.Cell>
                <Table.Cell>{attributes.disambiguatingDescription}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Remarks</Table.Cell>
                <Table.Cell>{attributes.remarks}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Postal address</Table.Cell>
                <Table.Cell>{attributes.postalAddress}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Telephone</Table.Cell>
                <Table.Cell>{attributes.telephone}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Email</Table.Cell>
                <Table.Cell>{attributes.email}</Table.Cell>
              </Table.Row>
            </Table.Body>
          )}
        </Table>

        <RolesTable roles={attributes.roles} />

        <h2>Read only</h2>
        <CustomData
          autoComplete="off"
          input={{ name: 'readOnly', value: attributes.readOnly }}
          meta={{}}
          module="agent"
          name="readOnly"
          type="read-only"
        />
      </React.Fragment>
    )
  }
}

Inspect.propTypes = propTypes
Inspect.defaultProps = defaultProps

export default compose(
  createGetItemById({
    relationships: [],
    resource: 'agent',
  }),
  connect(mapStateToProps)
)(Inspect)
