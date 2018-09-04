import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import ReactList from 'react-list'
import { Dimmer, Grid, Loader } from 'semantic-ui-react'
import { buildList } from 'coreModules/resourceManager/utilities'

import crudSelectors from 'coreModules/crud/globalSelectors'
import { createBatchFetchItems } from 'coreModules/crud/higherOrderComponents'

import ListItem from './ListItem'

const mapStateToProps = (state, { resource }) => {
  const itemsObject = crudSelectors[resource].getItemsObject(state)

  return {
    itemsObject,
  }
}

const propTypes = {
  baseItems: PropTypes.array.isRequired,
  currentTableRowNumber: PropTypes.number.isRequired,
  expandedIds: PropTypes.object.isRequired,
  fetchItemById: PropTypes.func.isRequired,
  focusedIndex: PropTypes.number.isRequired,
  itemFetchOptions: PropTypes.object.isRequired,
  itemsObject: PropTypes.object.isRequired,
  ItemTitle: PropTypes.func,
  listItems: PropTypes.array.isRequired,
  onClickRow: PropTypes.func.isRequired,
  onToggleRow: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired,
  setListItems: PropTypes.func.isRequired,
  showAll: PropTypes.bool.isRequired,
}

const defaultProps = {
  ItemTitle: undefined,
}

const itemsRenderer = (items, ref) => {
  return (
    <div className="ui padded grid" ref={ref}>
      {items}
    </div>
  )
}

class TreeView extends Component {
  constructor(props) {
    super(props)
    this.setListRef = element => {
      this.list = element
    }
    this.renderItem = this.renderItem.bind(this)
  }

  componentDidUpdate(prevProps) {
    const {
      baseItems,
      currentTableRowNumber,
      expandedIds,
      fetchItemById,
      itemsObject,
      resource,
      showAll,
    } = this.props

    const {
      baseItems: prevBaseItems,
      expandedIds: prevExpandedIds,
      itemsObject: prevItemsObject,
      showAll: prevShowAll,
      currentTableRowNumber: prevCurrentTableRowNumber,
    } = prevProps

    if (
      baseItems !== prevBaseItems ||
      expandedIds !== prevExpandedIds ||
      itemsObject !== prevItemsObject ||
      showAll !== prevShowAll
    ) {
      const listItems = buildList({
        baseItems,
        expandedIds,
        fetchItemById,
        itemsObject,
        showAll,
      })
      this.props.setListItems(listItems, { resource })
    }

    if (currentTableRowNumber !== prevCurrentTableRowNumber) {
      const [firstVisibleRow] = this.list.getVisibleRange()
      if (currentTableRowNumber <= firstVisibleRow + 1) {
        this.list.scrollTo(currentTableRowNumber - 1)
      } else {
        this.list.scrollAround(currentTableRowNumber)
      }
    }
  }

  renderItem(index) {
    const {
      expandedIds,
      focusedIndex,
      itemFetchOptions,
      ItemTitle,
      listItems,
      resource,
    } = this.props

    const { isExpandable, id: itemId, level } = listItems[index] || {}

    const isExpanded = itemId && !!expandedIds[itemId]
    const isFocused = focusedIndex === index

    if (!(listItems && listItems.length)) {
      return (
        <Grid padded>
          <Grid.Row style={{ height: 43 }}>
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
      <ListItem
        isExpandable={isExpandable}
        isExpanded={isExpanded}
        isFocused={isFocused}
        itemId={itemId}
        ItemTitle={ItemTitle}
        key={itemId}
        level={level}
        onClickRow={this.props.onClickRow}
        onToggleRow={this.props.onToggleRow}
        resource={resource}
        {...itemFetchOptions}
      />
    )
  }

  render() {
    const { listItems } = this.props

    return (
      <ReactList
        itemRenderer={this.renderItem}
        itemsRenderer={itemsRenderer}
        length={listItems.length}
        ref={this.setListRef}
        type="uniform"
      />
    )
  }
}

TreeView.defaultProps = defaultProps
TreeView.propTypes = propTypes

export default compose(
  connect(mapStateToProps),
  createBatchFetchItems({
    relationships: ['parent', 'children'],
  })
)(TreeView)
