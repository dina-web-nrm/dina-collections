import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import globalCrudSelectors from 'coreModules/crud/globalSelectors'
import { getChildrenIds, getParentId } from 'coreModules/crud/utilities'
import { createGetItemById } from 'coreModules/crud/higherOrderComponents'
import {
  BlockLoader,
  ParentChildTables,
} from 'coreModules/crudBlocks/components'
import { SET_ITEM_INSPECT } from 'coreModules/crudBlocks/constants'

import RelatedTaxonNamesTable from '../RelatedTaxonNamesTable'

const mapStateToProps = (state, ownProps) => {
  const { item: taxon } = ownProps
  const parentId = getParentId(taxon)
  const parent = parentId && globalCrudSelectors.taxon.getOne(state, parentId)
  const children = getChildrenIds(taxon).map(id => {
    return (
      globalCrudSelectors.taxon.getOne(state, id) || {
        id,
      }
    )
  })

  return {
    children,
    parent,
    taxon,
  }
}

const propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.shape({
      attributes: PropTypes.object.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  onInteraction: PropTypes.func.isRequired,
  parent: PropTypes.shape({
    attributes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
  }),
  taxon: PropTypes.object,
}

const defaultProps = {
  children: [],
  parent: undefined,
  taxon: null,
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
    const { children, onInteraction, parent, taxon } = this.props
    if (!taxon) {
      return <BlockLoader />
    }

    return (
      <React.Fragment>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Key</Table.HeaderCell>
              <Table.HeaderCell>Value</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>id</Table.Cell>
              <Table.Cell>{taxon.id}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <h2>Taxon names</h2>
        <RelatedTaxonNamesTable onInteraction={onInteraction} taxon={taxon} />

        <ParentChildTables
          childrenItems={children}
          onRowClick={this.handleRowClick}
          parentItem={parent}
        />
      </React.Fragment>
    )
  }
}

Inspect.propTypes = propTypes
Inspect.defaultProps = defaultProps

export default compose(
  createGetItemById({
    include: [
      'acceptedTaxonName',
      'children',
      'parent',
      'synonyms',
      'vernacularNames',
    ],
    relationships: ['all'],
    resource: 'taxon',
  }),
  connect(mapStateToProps)
)(Inspect)
