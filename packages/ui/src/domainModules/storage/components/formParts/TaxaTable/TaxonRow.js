import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Table } from 'semantic-ui-react'
import objectPath from 'object-path'

import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'
import { ConfirmationPopup } from 'coreModules/form/components'
import { ModuleTranslate } from 'coreModules/i18n/components'

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
        <Table.Cell width={14}>{`${name} (${rank})`}</Table.Cell>
        <Table.Cell>
          <ConfirmationPopup
            cancelButtonText={
              <ModuleTranslate capitalize module="storage" textKey="cancel" />
            }
            confirmButtonText={
              <ModuleTranslate capitalize module="storage" textKey="remove" />
            }
            header={
              <ModuleTranslate
                capitalize
                module="storage"
                textKey="removeThisConnectedTaxa"
              />
            }
            hideOnScroll
            iconName="trash"
            onConfirm={this.handleDisconnect}
            size="large"
            type="icon"
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
    refresh: true,
    relationships: ['acceptedTaxonName'],
    resolveRelationships: ['taxonName'],
    resource: 'taxon',
  })
)(TaxonNameRow)
