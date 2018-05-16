import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import PreparationTypeRow from './PreparationTypeRow'
import NewPreparationTypeRowWrapper from './NewPreparationTypeRowWrapper'

const propTypes = {
  edit: PropTypes.bool.isRequired,
  onInteraction: PropTypes.func,
  preparationTypes: PropTypes.array,
}

const defaultProps = {
  onInteraction: undefined,
  preparationTypes: [],
}

export class PreparationTypeTable extends Component {
  render() {
    const { edit, preparationTypes } = this.props
    return (
      <React.Fragment>
        <h2>Preparation types</h2>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Category</Table.HeaderCell>
              {edit && <Table.HeaderCell>Actions</Table.HeaderCell>}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {preparationTypes.map(preparationType => {
              const { id } = preparationType

              return (
                <PreparationTypeRow
                  edit={edit}
                  itemId={id}
                  key={id}
                  onInteraction={this.props.onInteraction}
                />
              )
            })}
            {edit && (
              <NewPreparationTypeRowWrapper
                onInteraction={this.props.onInteraction}
              />
            )}
          </Table.Body>
        </Table>
      </React.Fragment>
    )
  }
}

PreparationTypeTable.propTypes = propTypes
PreparationTypeTable.defaultProps = defaultProps

export default PreparationTypeTable
