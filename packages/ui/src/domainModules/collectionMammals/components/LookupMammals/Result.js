import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import * as actionCreators from 'coreModules/search/actionCreators'
import { globalSelectors } from 'coreModules/search/keyObjectModule'
import ReactList from 'react-list'
import { createBatchFetchItems } from 'coreModules/crud/higherOrderComponents'
import { createInjectSearchResult } from 'coreModules/search/higherOrderComponents'
import { push } from 'react-router-redux'
import Row from './Row'

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
  fetchItemById: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  searchResult: PropTypes.object,
}
const defaultProps = {
  searchResult: undefined,
}

const itemsRenderer = (items, ref) => {
  return (
    <div className="ui divided list" ref={ref}>
      {items}
    </div>
  )
}

class Result extends Component {
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
    return <Row itemId={itemId} key={itemId} onClick={this.handleRowClick} />
  }

  render() {
    if (!(this.props.searchResult && this.props.searchResult.items)) {
      return <div>Loading</div>
    }
    return (
      <React.Fragment>
        <h2>Result</h2>
        <div style={{ height: '100vh', overflow: 'auto' }}>
          <ReactList
            itemRenderer={this.renderItem}
            itemsRenderer={itemsRenderer}
            length={this.props.searchResult.items.length}
            type="uniform"
          />
        </div>
      </React.Fragment>
    )
  }
}

Result.propTypes = propTypes
Result.defaultProps = defaultProps

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
)(Result)
