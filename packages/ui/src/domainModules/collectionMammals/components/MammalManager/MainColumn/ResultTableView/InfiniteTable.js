import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import ReactList from 'react-list'
import { push } from 'react-router-redux'
// import * as actionCreators from 'coreModules/search/actionCreators'
import { globalSelectors } from 'coreModules/search/keyObjectModule'
import { createBatchFetchItems } from 'coreModules/crud/higherOrderComponents'
import { createInjectSearchResult } from 'coreModules/search/higherOrderComponents'
import InfiniteTableRow from './InfiniteTableRow'

const mapStateToProps = (state, { searchResultResourceType: resource }) => {
  return {
    searchResult: globalSelectors.get[':resource.searchState'](state, {
      resource,
    }),
  }
}

const mapDispatchToProps = {
  push,
}

const propTypes = {
  fetchItemById: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  searchResult: PropTypes.object,
}

const defaultProps = {
  searchResult: undefined,
}

const itemsRenderer = (items, ref) => {
  return (
    <div className="ui grid" ref={ref}>
      {items}
    </div>
  )
}

export class InfiniteTable extends Component {
  constructor(props) {
    super(props)
    this.renderItem = this.renderItem.bind(this)
    this.handleRowClick = this.handleRowClick.bind(this)
  }

  handleRowClick(specimenId) {
    this.props.push(`/app/mammals/${specimenId}/edit`)
  }

  renderItem(index) {
    const itemId = this.props.searchResult.items[index]
    this.props.fetchItemById(itemId)
    const style = index % 2 === 0 ? '#fff' : '#e5e7e9'

    return (
      <InfiniteTableRow
        itemId={itemId}
        key={itemId}
        onClick={this.handleRowClick}
        style={style}
      />
    )
  }

  render() {
    const { searchResult } = this.props

    if (!(searchResult && searchResult.items)) {
      return <div>Loading</div>
    }

    return (
      <div
        style={{
          height: '100vh',
          overflow: 'auto',
          width: 1700,
        }}
      >
        <ReactList
          itemRenderer={this.renderItem}
          itemsRenderer={itemsRenderer}
          length={searchResult.items.length}
          type="uniform"
        />
      </div>
    )
  }
}

InfiniteTable.propTypes = propTypes
InfiniteTable.defaultProps = defaultProps

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
)(InfiniteTable)
