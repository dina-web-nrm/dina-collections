import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import ReactList from 'react-list'
import { push } from 'react-router-redux'
import { Table } from 'semantic-ui-react'
import * as actionCreators from 'coreModules/search/actionCreators'
import { globalSelectors } from 'coreModules/search/keyObjectModule'
import { createBatchFetchItems } from 'coreModules/crud/higherOrderComponents'
import { createInjectSearchResult } from 'coreModules/search/higherOrderComponents'
import InfinityTableRow from './InfinityTableRow'
import InfinityTableHead from './InfinityTableHead'

const mapStateToProps = (state, { searchResultResourceType: resource }) => {
  return {
    searchResult: globalSelectors.get[':resource.searchState'](state, {
      resource,
    }),
  }
}

const mapDispatchToProps = {
  push,
  search: actionCreators.search,
  syncSearch: actionCreators.syncSearch,
}

const propTypes = {
  columnHeader: PropTypes.array.isRequired,
  fetchItemById: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  searchResult: PropTypes.object,
}

const defaultProps = {
  searchResult: undefined,
}

export class InfinityTable extends Component {
  constructor(props) {
    super(props)
    this.renderItem = this.renderItem.bind(this)
    this.handleRowClick = this.handleRowClick.bind(this)
  }
  handleRowClick(specimenId) {
    this.props.push(`/app/mammals/${specimenId}/edit`)
  }

  renderTable = (items, ref) => {
    // return <InfinityTableHead items={items} ref={ref} />
    const { columnHeader } = this.props

    return (
      <Table
        compact
        size="small"
        striped
        style={{ tableLayout: 'auto', width: 'auto' }}
      >
        <InfinityTableHead columns={columnHeader} />

        <tbody ref={ref}>{items}</tbody>
      </Table>
    )
  }

  renderItem(index) {
    const itemId = this.props.searchResult.items[index]
    this.props.fetchItemById(itemId)

    return (
      <InfinityTableRow
        itemId={itemId}
        key={itemId}
        onClick={this.handleRowClick}
      />
    )
  }

  render() {
    const { searchResult } = this.props

    if (!(searchResult && searchResult.items)) {
      return <div>Loading</div>
    }
    return (
      <div style={{ height: '100vh', overflow: 'auto', width: '100vw' }}>
        <ReactList
          itemRenderer={this.renderItem}
          itemsRenderer={this.renderTable}
          length={searchResult.items.length}
          type="uniform"
        />
      </div>
    )
  }
}

InfinityTable.propTypes = propTypes
InfinityTable.defaultProps = defaultProps

export default compose(
  createInjectSearchResult({
    resource: 'searchSpecimen',
  }),
  createBatchFetchItems({
    include: [
      'agents',
      'featureTypes',
      'physicalObjects',
      'places',
      'taxonNames',
    ],
    relationships: ['all'],
    resource: 'specimen',
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(InfinityTable)
