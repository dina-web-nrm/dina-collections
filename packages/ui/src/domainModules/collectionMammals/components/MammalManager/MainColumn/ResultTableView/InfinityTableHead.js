import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'

const propTypes = {
  columns: PropTypes.array.isRequired,
}

export class InfinityTableHead extends Component {
  render() {
    const { columns } = this.props

    return (
      <Table.Header style={{ position: '-webkit-sticky' }}>
        <Table.Row>
          {columns.map(column => (
            <Table.HeaderCell key={column}>{column}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
    )

    // return (
    //   <Table
    //     compact
    //     size="small"
    //     striped
    //     style={{ tableLayout: 'auto', width: 'auto' }}
    //   >
    //     <Table.Header style={{ position: '-webkit-sticky' }}>
    //       <Table.Row style={{ position: '-webkit-sticky', width: '100%' }}>
    //         <Table.HeaderCell>Catalog Number</Table.HeaderCell>
    //         <Table.HeaderCell>Curatorial Name</Table.HeaderCell>
    //         <Table.HeaderCell>Family</Table.HeaderCell>
    //         <Table.HeaderCell>Genus</Table.HeaderCell>
    //         <Table.HeaderCell>Species</Table.HeaderCell>
    //         <Table.HeaderCell>Start Date</Table.HeaderCell>
    //         <Table.HeaderCell>Locality</Table.HeaderCell>
    //         <Table.HeaderCell>Death</Table.HeaderCell>
    //         <Table.HeaderCell>Sex</Table.HeaderCell>
    //         <Table.HeaderCell>Age Stage</Table.HeaderCell>
    //       </Table.Row>
    //     </Table.Header>

    //     <tbody ref={ref}>{items}</tbody>
    //   </Table>
    // )
  }
}

InfinityTableHead.propTypes = propTypes

export default InfinityTableHead
