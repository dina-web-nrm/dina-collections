import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Button, Table } from 'semantic-ui-react'
import { createGetItemById } from 'coreModules/crud/higherOrderComponents'
import PreparationTypeDropdownSearch from 'domainModules/curatedList/components/PreparationTypeDropdownSearch'

import { ADD_NEW_PREPARATION_TYPE } from '../../../../constants'

const propTypes = {
  item: PropTypes.object,
  itemId: PropTypes.string,
  onInteraction: PropTypes.func.isRequired,
  onSetNewPreparationTypeId: PropTypes.func.isRequired,
}
const defaultProps = {
  item: undefined,
  itemId: '',
}

export class NewPreparationTypeRow extends Component {
  render() {
    const {
      item,
      itemId,
      onInteraction,
      onSetNewPreparationTypeId,
    } = this.props
    const { attributes: { category } = {} } = item || {}

    return (
      <Table.Row>
        <Table.Cell>New</Table.Cell>
        <Table.Cell>
          <PreparationTypeDropdownSearch
            enableHelpNotifications={false}
            input={{
              name: 'newPreparationTypeId',
              onBlur: onSetNewPreparationTypeId,
              onChange: onSetNewPreparationTypeId,
              value: itemId,
            }}
            meta={{}}
            module=""
          />
        </Table.Cell>
        <Table.Cell>{category}</Table.Cell>
        <Table.Cell>
          <Button
            disabled={!item}
            onClick={event => {
              event.preventDefault()
              onInteraction(ADD_NEW_PREPARATION_TYPE, {
                itemId,
              })
            }}
          >
            Add preparation type
          </Button>
        </Table.Cell>
      </Table.Row>
    )
  }
}

NewPreparationTypeRow.propTypes = propTypes
NewPreparationTypeRow.defaultProps = defaultProps

export default compose(
  createGetItemById({
    refresh: false,
    resource: 'preparationType',
  })
)(NewPreparationTypeRow)
