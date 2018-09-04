import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Button, Table } from 'semantic-ui-react'
import { createGetItemById } from 'coreModules/crud/higherOrderComponents'
import TaxonNameDropdownSearch from 'domainModules/taxon/components/TaxonNameDropdownSearch'

import { ADD_NEW_TAXON_NAME } from '../../../../constants'

const propTypes = {
  item: PropTypes.object,
  itemId: PropTypes.string,
  onInteraction: PropTypes.func.isRequired,
  onSetNewTaxonNameId: PropTypes.func.isRequired,
}
const defaultProps = {
  item: undefined,
  itemId: '',
}

export class NewTaxonNameRow extends Component {
  render() {
    const { item, itemId, onInteraction, onSetNewTaxonNameId } = this.props
    const { attributes: { rank, rubinNumber } = {} } = item || {}

    return (
      <Table.Row>
        <Table.Cell>New</Table.Cell>
        <Table.Cell>
          <TaxonNameDropdownSearch
            enableHelpNotifications={false}
            input={{
              name: 'newTaxonName',
              onBlur: onSetNewTaxonNameId,
              onChange: onSetNewTaxonNameId,
              value: itemId,
            }}
            meta={{}}
            module=""
          />
        </Table.Cell>
        <Table.Cell>{rank}</Table.Cell>
        <Table.Cell>{rubinNumber}</Table.Cell>

        <Table.Cell>
          <Button
            disabled={!item}
            onClick={event => {
              event.preventDefault()
              onInteraction(ADD_NEW_TAXON_NAME, {
                itemId,
              })
            }}
          >
            Add taxon name
          </Button>
        </Table.Cell>
      </Table.Row>
    )
  }
}

NewTaxonNameRow.propTypes = propTypes
NewTaxonNameRow.defaultProps = defaultProps

export default compose(
  createGetItemById({
    refresh: false,
    resource: 'taxonName',
  })
)(NewTaxonNameRow)
