import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import {
  BlockLoader,
  ParentChildTables,
} from 'coreModules/crudBlocks/components'
import { SET_ITEM_INSPECT } from 'coreModules/crudBlocks/constants'
import {
  createGetTaxonById,
  ensureAllTaxaFetched,
  ensureAllTaxonNamesFetched,
} from 'dataModules/taxonService/higherOrderComponents'
import taxonSelectors from '../../../../globalSelectors'
import RelatedTaxonNamesTable from '../RelatedTaxonNamesTable'

const mapStateToProps = (state, { taxon }) => {
  const { parent, children } =
    (taxon &&
      taxon.id &&
      taxonSelectors.getParentAndChildrenWithNamesForTaxon(state, taxon.id)) ||
    {}

  return {
    children,
    parent,
    taxon,
  }
}

const propTypes = {
  allTaxaFetched: PropTypes.bool.isRequired,
  allTaxonNamesFetched: PropTypes.bool.isRequired,
  children: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  onInteraction: PropTypes.func.isRequired,
  parent: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
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
    const {
      allTaxaFetched,
      allTaxonNamesFetched,
      children,
      onInteraction,
      parent,
      taxon,
    } = this.props

    if (!taxon || !allTaxaFetched || !allTaxonNamesFetched) {
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
  ensureAllTaxaFetched(),
  ensureAllTaxonNamesFetched(),
  createGetTaxonById(),
  connect(mapStateToProps)
)(Inspect)
