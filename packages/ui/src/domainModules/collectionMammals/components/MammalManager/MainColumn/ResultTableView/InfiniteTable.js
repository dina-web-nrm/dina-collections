import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import ReactList from 'react-list'
import { push } from 'react-router-redux'
import { Grid } from 'semantic-ui-react'

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
  currentRecordNumber: PropTypes.number.isRequired,
  fetchItemById: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  searchResult: PropTypes.object,
  width: PropTypes.number.isRequired,
}

const defaultProps = {
  searchResult: undefined,
}

const itemsRenderer = (items, ref) => {
  return (
    <div className="ui padded grid" ref={ref}>
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
    const {
      currentRecordNumber,
      fetchItemById,
      searchResult,
      width,
    } = this.props

    const itemId = searchResult.items[index]
    fetchItemById(itemId)

    const isFocused = index + 1 === currentRecordNumber
    const background = isFocused // eslint-disable-line no-nested-ternary
      ? '#b5b5b5'
      : index % 2 === 0 ? '#e5e7e9' : '#fff'

    return (
      <InfiniteTableRow
        background={background}
        itemId={itemId}
        key={itemId}
        onClick={this.handleRowClick}
        width={width}
      />
    )
  }

  render() {
    const { searchResult, width } = this.props

    if (!(searchResult && searchResult.items)) {
      return (
        <Grid padded>
          <Grid.Row style={{ height: 43, width }}>
            <Grid.Column>Loading...</Grid.Column>
          </Grid.Row>
        </Grid>
      )
    }

    return (
      <div style={{ width }}>
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
