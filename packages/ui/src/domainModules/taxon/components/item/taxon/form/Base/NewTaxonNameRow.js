import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Button, Table } from 'semantic-ui-react'
import { createGetItemById } from 'coreModules/crud/higherOrderComponents'
import TaxonNameSearchInputWithResults from 'domainModules/taxon/components/TaxonNameSearchInputWithResults'

const propTypes = {
  item: PropTypes.object,
  itemId: PropTypes.string,
  onSetNewTaxonNameId: PropTypes.func.isRequired,
  onTaxonNameInteraction: PropTypes.func.isRequired,
}
const defaultProps = {
  item: undefined,
  itemId: '',
}

export class NewTaxonNameRow extends Component {
  render() {
    const {
      onTaxonNameInteraction,
      item,
      itemId,
      onSetNewTaxonNameId,
    } = this.props
    const { attributes: { rank, rubinNumber } = {} } = item || {}

    return (
      <Table.Row>
        <Table.Cell />
        <Table.Cell>
          <TaxonNameSearchInputWithResults
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
        <Table.Cell />

        <Table.Cell>
          <Button
            disabled={!item}
            onClick={event => {
              event.preventDefault()
              onTaxonNameInteraction({
                interactionType: 'addSynonym',
                itemId,
              })
            }}
          >
            Add as synonym
          </Button>
          <Button
            disabled={!item}
            onClick={event => {
              event.preventDefault()
              onTaxonNameInteraction({
                interactionType: 'setAsAccepted',
                itemId,
              })
            }}
          >
            Add as accepted
          </Button>
          <Button
            disabled={!item}
            onClick={event => {
              event.preventDefault()
              onTaxonNameInteraction({
                interactionType: 'addVernacularName',
                itemId,
              })
            }}
          >
            Add as vernacular
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
