import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createGetItemById } from 'coreModules/crud/higherOrderComponents'
import {
  BlockLoader,
  ParentChildTables,
} from 'coreModules/crudBlocks/components'
import { SET_ITEM_INSPECT } from 'coreModules/crudBlocks/constants'
import { createSortedNameList } from '../../../../utilities'
import TaxonNameTable from '../shared/TaxonNameTable'

const mapStateToProps = (state, ownProps) => {
  const { acceptedTaxonName, synonyms, vernacularNames } = ownProps
  const sortedNameList = createSortedNameList({
    acceptedTaxonName,
    synonyms,
    vernacularNames,
  })
  return {
    sortedNameList,
  }
}

const propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.shape({
      attributes: PropTypes.object.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  item: PropTypes.object,
  onInteraction: PropTypes.func.isRequired,
  parent: PropTypes.shape({
    attributes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
  }),
  sortedNameList: PropTypes.array,
}

const defaultProps = {
  children: [],
  item: null,
  parent: null,
  sortedNameList: [],
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
    const {
      children,
      onInteraction,
      parent,
      sortedNameList,
      item: taxon,
    } = this.props
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

        <TaxonNameTable
          edit={false}
          onInteraction={onInteraction}
          sortedNameList={sortedNameList}
        />
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
    injectRelationships: [
      'acceptedTaxonName',
      'parent',
      'children',
      'synonyms',
      'vernacularNames',
    ],
    relationships: ['all'],
    resource: 'taxon',
  }),
  connect(mapStateToProps)
)(Inspect)
