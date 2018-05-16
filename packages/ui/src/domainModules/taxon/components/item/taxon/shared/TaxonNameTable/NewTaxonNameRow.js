import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Button, Table } from 'semantic-ui-react'
import { createGetItemById } from 'coreModules/crud/higherOrderComponents'
import TaxonNameSearchInputWithResults from 'domainModules/taxon/components/TaxonNameSearchInputWithResults'

import {
  ADD_SYNONYM,
  SET_TAXON_NAME_AS_ACCEPTED,
  ADD_VERNACULAR_NAME,
} from '../../../../../constants'

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
    const { onInteraction, item, itemId, onSetNewTaxonNameId } = this.props
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
              onInteraction(ADD_SYNONYM, {
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
              onInteraction(SET_TAXON_NAME_AS_ACCEPTED, {
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
              onInteraction(ADD_VERNACULAR_NAME, {
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
