import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import ReactList from 'react-list'
import { Dimmer, Grid, Loader } from 'semantic-ui-react'
import objectPath from 'object-path'

import createLog from 'utilities/log'
import { emToPixels } from 'coreModules/layout/utilities'
import { globalSelectors as searchSelectors } from 'coreModules/search/keyObjectModule'
import i18nSelectors from 'coreModules/i18n/globalSelectors'
import { createBatchFetchItems } from 'coreModules/crud/higherOrderComponents'
import { createInjectSearchResult } from 'coreModules/search/higherOrderComponents'
import { NoResultsFound } from 'coreModules/search/components/'
import { actionCreators as keyObjectActionCreators } from '../../../../keyObjectModule'
import InfiniteTableRow from './InfiniteTableRow'

const log = createLog(
  'modules:collectionMammals:MammalManager:ResultTableView:InfiniteTable'
)

const SEARCH_SPECIMEN = 'searchSpecimen'

const handleFirstSearchResult = props => {
  const index = props.currentTableRowNumber - 1
  const specimenId = objectPath.get(props, `searchResult.items.${index}.id`)

  if (specimenId) {
    props.setFocusedSpecimenId(specimenId)
  }
}

const mapStateToProps = state => {
  return {
    language:
      i18nSelectors.getLanguage(state) ||
      i18nSelectors.getDefaultLanguage(state),
    searchResult: searchSelectors.get[':resource.searchState'](state, {
      resource: SEARCH_SPECIMEN,
    }),
  }
}

const mapDispatchToProps = {
  setCurrentTableRowNumber: keyObjectActionCreators.set.currentTableRowNumber,
  setFocusedSpecimenId: keyObjectActionCreators.set.focusedSpecimenId,
}

const propTypes = {
  currentTableRowNumber: PropTypes.number,
  fetchItemById: PropTypes.func.isRequired,
  focusedItemId: PropTypes.string,
  language: PropTypes.string.isRequired,
  searchResult: PropTypes.object,
  setCurrentTableRowNumber: PropTypes.func.isRequired,
  setFocusedSpecimenId: PropTypes.func.isRequired,
  tableColumnsToShow: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  width: PropTypes.number.isRequired,
}

const defaultProps = {
  currentTableRowNumber: 1,
  focusedItemId: undefined,
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

  componentDidMount() {
    this.scroll()
    handleFirstSearchResult(this.props)
  }

  componentDidUpdate(prevProps) {
    this.scroll(prevProps)

    if (
      !objectPath.get(prevProps, 'searchResult.items.length') &&
      objectPath.get(this.props, 'searchResult.items.length')
    ) {
      handleFirstSearchResult(this.props)
    }
  }

  handleRowClick(rowNumber, specimenId) {
    this.props.setFocusedSpecimenId(specimenId)
    this.props.setCurrentTableRowNumber(rowNumber)
  }

  scroll(prevProps = {}) {
    const { currentTableRowNumber, focusedItemId } = this.props

    const {
      currentTableRowNumber: prevCurrentTableRowNumber,
      focusedItemId: prevFocusedItemId,
    } = prevProps

    if (
      this.list &&
      (currentTableRowNumber !== prevCurrentTableRowNumber ||
        (focusedItemId && focusedItemId !== prevFocusedItemId))
    ) {
      const [firstVisibleRow] = this.list.getVisibleRange()

      if (firstVisibleRow === undefined) {
        setTimeout(() => this.scroll())
      }

      // this special case is to avoid that the focused row is hidden behind the
      // table header, which is fixed positioned and therefore seen by
      // react-list as the first row in terms of scroll position
      if (currentTableRowNumber <= firstVisibleRow + 1) {
        this.list.scrollTo(currentTableRowNumber - 1)
      } else {
        this.list.scrollAround(currentTableRowNumber)
      }
    }
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

    const itemId = searchResult.items[index].id
    fetchItemById(itemId)

    const rowNumber = index + 1
    const isFocused = rowNumber === currentTableRowNumber

    const background = isFocused // eslint-disable-line no-nested-ternary
      ? '#b5b5b5'
      : index % 2 === 0
      ? '#e5e7e9'
      : '#fff'

    return (
      <InfiniteTableRow
        background={background}
        itemId={itemId}
        key={itemId}
        language={language}
        onClick={this.handleRowClick}
        resource={SEARCH_SPECIMEN}
        rowNumber={rowNumber}
        tableColumnsToShow={tableColumnsToShow}
        width={width}
      />
    )
  }

  render() {
    log.render()
    const { currentTableRowNumber, searchResult, width } = this.props

    if (!(searchResult && searchResult.items)) {
      return (
        <Grid padded>
          <Grid.Row style={{ height: emToPixels(3.5), width }}>
            <Grid.Column style={{ paddingTop: 60, width: 150 }}>
              <Dimmer active inverted>
                <Loader content="Loading" inverted />
              </Dimmer>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )
    }

    if (searchResult.items.length === 0) {
      return <NoResultsFound />
    }

    return (
      <div data-testid="InfiniteTable" style={{ width }}>
        <ReactList
          initialIndex={currentTableRowNumber - 1}
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
    resource: SEARCH_SPECIMEN,
  }),
  createBatchFetchItems({
    includeFields: ['id', 'attributes'],
    resource: SEARCH_SPECIMEN,
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(InfiniteTable)
