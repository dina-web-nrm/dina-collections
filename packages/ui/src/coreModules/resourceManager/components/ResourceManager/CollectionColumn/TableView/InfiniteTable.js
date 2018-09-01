import React, { Component } from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import ReactList from 'react-list'
import { Dimmer, Grid, Loader } from 'semantic-ui-react'

import { createBatchFetchItems } from 'coreModules/crud/higherOrderComponents'
import InfiniteTableRow from './InfiniteTableRow'

const propTypes = {
  currentTableRowNumber: PropTypes.number.isRequired,
  fetchItemById: PropTypes.func.isRequired,
  focusedIndex: PropTypes.number.isRequired,
  listItems: PropTypes.array,
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
    }

    this.renderItem = this.renderItem.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.currentTableRowNumber &&
      this.props.currentTableRowNumber !== nextProps.currentTableRowNumber
    ) {
      const [firstVisibleRow] = this.list.getVisibleRange()

      if (nextProps.currentTableRowNumber <= firstVisibleRow + 1) {
        this.list.scrollTo(nextProps.currentTableRowNumber - 1)
      } else {
        this.list.scrollAround(nextProps.currentTableRowNumber)
      }
    }
    if (this.props.currentTableRowNumber !== nextProps.currentTableRowNumber) {
      const [firstVisibleRow] = this.list.getVisibleRange()
      if (nextProps.currentTableRowNumber <= firstVisibleRow + 1) {
        this.list.scrollTo(nextProps.currentTableRowNumber - 1)
      } else {
        this.list.scrollAround(nextProps.currentTableRowNumber)
      }
    }
  }

  renderItem(index) {
    const {
      fetchItemById,
      focusedIndex,
      listItems,
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
          <Grid.Row style={{ height: 43, width }}>
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
