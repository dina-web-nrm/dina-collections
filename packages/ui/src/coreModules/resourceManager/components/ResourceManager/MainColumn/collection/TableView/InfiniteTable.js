import React, { Component } from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import ReactList from 'react-list'
import { Dimmer, Grid, Loader } from 'semantic-ui-react'

import { createBatchFetchItems } from 'coreModules/crud/higherOrderComponents'
import { emToPixels } from 'coreModules/layout/utilities'
import InfiniteTableRow from './InfiniteTableRow'

const propTypes = {
  currentTableRowNumber: PropTypes.number.isRequired,
  fetchItemById: PropTypes.func.isRequired,
  focusedIndex: PropTypes.number.isRequired,
  listItems: PropTypes.array,
  managerScope: PropTypes.string.isRequired,
  onClickRow: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired,
  tableBatchFetchOptions: PropTypes.object,
  tableColumnSpecifications: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
}

const defaultProps = {
  focusedIndex: 0,
  listItems: [],
  tableBatchFetchOptions: {},
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
      this.scroll()
    }

    this.renderItem = this.renderItem.bind(this)
    this.scroll = this.scroll.bind(this)
  }

  componentDidMount() {
    this.scroll()
  }

  componentDidUpdate(prevProps) {
    this.scroll(prevProps)
  }

  scroll(prevProps = {}) {
    const { currentTableRowNumber } = this.props

    const { currentTableRowNumber: prevCurrentTableRowNumber } = prevProps

    if (this.list && currentTableRowNumber !== prevCurrentTableRowNumber) {
      const [firstVisibleRow] = this.list.getVisibleRange()

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
      fetchItemById,
      focusedIndex,
      listItems,
      managerScope,
      resource,
      tableBatchFetchOptions,
      tableColumnSpecifications,
      width,
    } = this.props
    const { id } = listItems[index] || {}
    const isFocused = focusedIndex === index
    const background = isFocused // eslint-disable-line no-nested-ternary
      ? '#b5b5b5'
      : index % 2 === 0 ? '#e5e7e9' : '#fff'
    if (id !== undefined) {
      fetchItemById(id)
    }

    const { resolveRelationships, relationships } = tableBatchFetchOptions

    return (
      <InfiniteTableRow
        background={background}
        itemId={id}
        key={id}
        namespace={managerScope}
        onClickRow={this.props.onClickRow}
        relationships={relationships}
        resolveRelationships={resolveRelationships}
        resource={resource}
        rowNumber={index + 1}
        tableColumnSpecifications={tableColumnSpecifications}
        width={width}
      />
    )
  }

  render() {
    const { listItems, width } = this.props

    if (!(listItems && listItems)) {
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

    return (
      <div style={{ width }}>
        <ReactList
          itemRenderer={this.renderItem}
          itemsRenderer={itemsRenderer}
          length={listItems.length}
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
  createBatchFetchItems({
    includeFields: ['id', 'attributes'],
  })
)(InfiniteTable)
