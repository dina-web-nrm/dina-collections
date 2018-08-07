import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import ReactList from 'react-list'
import { push } from 'react-router-redux'
import { Grid } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { globalSelectors as searchSelectors } from 'coreModules/search/keyObjectModule'
import i18nSelectors from 'coreModules/i18n/globalSelectors'
import { createBatchFetchItems } from 'coreModules/crud/higherOrderComponents'
import { createInjectSearchResult } from 'coreModules/search/higherOrderComponents'
import InfiniteTableRow from './InfiniteTableRow'

const log = createLog(
  'modules:collectionMammals:MammalManager:ResultTableView:InfiniteTable'
)

const mapStateToProps = (state, { searchResultResourceType: resource }) => {
  return {
    language:
      i18nSelectors.getLanguage(state) ||
      i18nSelectors.getDefaultLanguage(state),
    searchResult: searchSelectors.get[':resource.searchState'](state, {
      resource,
    }),
  }
}

const mapDispatchToProps = {
  push,
}

const propTypes = {
  currentTableRowNumber: PropTypes.number.isRequired,
  fetchItemById: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
  searchResult: PropTypes.object,
  tableColumnsToShow: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
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
    this.list = null
    this.setListRef = element => {
      this.list = element
    }

    this.renderItem = this.renderItem.bind(this)
    this.handleRowClick = this.handleRowClick.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.currentTableRowNumber &&
      nextProps.currentTableRowNumber &&
      this.props.currentTableRowNumber !== nextProps.currentTableRowNumber
    ) {
      const [firstVisibleRow] = this.list.getVisibleRange()

      // this special case is to avoid that the focused row is hidden behind the
      // table header, which is fixed positioned and therefore seen by
      // react-list as the first row in terms of scroll position
      if (nextProps.currentTableRowNumber <= firstVisibleRow + 1) {
        this.list.scrollTo(nextProps.currentTableRowNumber - 1)
      } else {
        this.list.scrollAround(nextProps.currentTableRowNumber)
      }
    }
  }

  handleRowClick(specimenId) {
    this.props.push(`/app/mammals/${specimenId}/edit`)
  }

  renderItem(index) {
    const {
      currentTableRowNumber,
      fetchItemById,
      language,
      searchResult,
      tableColumnsToShow,
      width,
    } = this.props

    const itemId = searchResult.items[index]
    fetchItemById(itemId)

    const rowNumber = index + 1
    const isFocused = rowNumber === currentTableRowNumber
    const background = isFocused // eslint-disable-line no-nested-ternary
      ? '#b5b5b5'
      : index % 2 === 0 ? '#e5e7e9' : '#fff'

    return (
      <InfiniteTableRow
        background={background}
        itemId={itemId}
        key={itemId}
        language={language}
        onClick={this.handleRowClick}
        rowNumber={rowNumber}
        tableColumnsToShow={tableColumnsToShow}
        width={width}
      />
    )
  }

  render() {
    log.render()
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
          ref={this.setListRef}
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
      'causeOfDeathTypes',
      'establishmentMeansTypes',
      'featureTypes',
      'identifierTypes',
      'physicalObjects.storageLocation.parent',
      'places',
      'preparationTypes',
      'taxonNames',
      'typeSpecimenType',
    ],
    relationships: ['all'],
    resource: 'specimen',
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(InfiniteTable)
