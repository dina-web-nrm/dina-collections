import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'

const propTypes = {
  onRowClick: PropTypes.func.isRequired,
  rowItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
    }).isRequired
  ),
}
const defaultProps = {
  rowItems: [],
}

const RelationTable = ({ onRowClick: handleRowClick, rowItems }) => {
  return (
    <Table celled selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Id</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rowItems.length > 0 &&
          rowItems.map(item => {
            const { id, attributes = {} } = item || {}

            return (
              <Table.Row key={id} onClick={event => handleRowClick(event, id)}>
                <Table.Cell>
                  <a>{id}</a>
                </Table.Cell>
                <Table.Cell>
                  <a>{attributes.name}</a>
                </Table.Cell>
              </Table.Row>
            )
          })}
      </Table.Body>
    </Table>
  )
}

RelationTable.propTypes = propTypes
RelationTable.defaultProps = defaultProps

export default RelationTable
