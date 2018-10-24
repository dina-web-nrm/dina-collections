import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'
import { compose } from 'redux'
import { Icon, Table } from 'semantic-ui-react'
import objectPath from 'object-path'

const propTypes = {
  disconnectName: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  nestedItem: PropTypes.object,
}
const defaultProps = {
  nestedItem: undefined,
}

class TaxonNameRow extends PureComponent {
  constructor(props) {
    super(props)
    this.handleDisconnect = this.handleDisconnect.bind(this)
  }

  handleDisconnect() {
    this.props.disconnectName(this.props.index)
  }

  render() {
    const { nestedItem } = this.props

    const name = objectPath.get(nestedItem, 'acceptedTaxonName.name')
    const rank = objectPath.get(nestedItem, 'acceptedTaxonName.rank')

    return (
      <Table.Row>
        <Table.Cell>{`${name} (${rank})`}</Table.Cell>
        <Table.Cell>
          <Icon
            name="trash"
            onClick={this.handleDisconnect}
            size="large"
            style={{ cursor: 'pointer' }}
          />
        </Table.Cell>
      </Table.Row>
    )
  }
}

TaxonNameRow.propTypes = propTypes
TaxonNameRow.defaultProps = defaultProps

export default compose(
  createGetNestedItemById({
    include: ['acceptedTaxonName'],
    refresh: false,
    relationships: ['acceptedTaxonName'],
    resolveRelationships: ['taxonName'],
    resource: 'taxon',
  })
)(TaxonNameRow)
