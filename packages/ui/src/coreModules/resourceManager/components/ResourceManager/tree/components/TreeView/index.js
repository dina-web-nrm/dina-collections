import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import ReactList from 'react-list'
import { Dimmer, Grid, Loader } from 'semantic-ui-react'

import { useEffectScroll } from 'coreModules/resourceManager/hooks'
import { emToPixels } from 'coreModules/layout/utilities'

import ListItem from './ListItem'
import createTreeModuleWrapper from '../../higherOrderComponents/createTreeModuleWrapper'

const propTypes = {
  buildList: PropTypes.func.isRequired,
  currentRowNumber: PropTypes.number.isRequired,
  expandAncestorsForItemId: PropTypes.func.isRequired,
  fetchItemById: PropTypes.func.isRequired,
  fetchTreeBase: PropTypes.func.isRequired,
  focusedItemId: PropTypes.string,
  itemFetchOptions: PropTypes.object.isRequired,
  itemsObject: PropTypes.object.isRequired,
  ItemTitle: PropTypes.func,
  managerScope: PropTypes.string.isRequired,
  onClickRow: PropTypes.func.isRequired,
  onToggleRow: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired,
  setTreeListItems: PropTypes.func.isRequired,
  showAll: PropTypes.bool.isRequired,
  treeBaseItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    }).isRequired
  ).isRequired,
  treeExpandedIds: PropTypes.objectOf(PropTypes.bool.isRequired).isRequired,
  treeListItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      isExpandable: PropTypes.bool.isRequired,
      level: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
}

const defaultProps = {
  focusedItemId: undefined,
  ItemTitle: undefined,
  treeListItems: [],
}

const itemsRenderer = (items, ref) => {
  return (
    <div className="ui padded grid" ref={ref}>
      {items}
    </div>
  )
}

const TreeView = ({
  buildList,
  currentRowNumber,
  expandAncestorsForItemId,
  fetchItemById,
  fetchTreeBase,
  focusedItemId,
  itemFetchOptions,
  itemsObject,
  ItemTitle,
  managerScope,
  onClickRow,
  onToggleRow,
  resource,
  setTreeListItems,
  showAll,
  treeBaseItems,
  treeExpandedIds,
  treeListItems,
}) => {
  const list = useRef(null)

  const itemsObjectRef = useRef(null)
  const showAllRef = useRef(null)
  const treeBaseItemsRef = useRef(null)
  const treeExpandedIdsRef = useRef(null)

  useEffect(() => {
    fetchTreeBase()
  }, [fetchTreeBase])

  useEffect(() => {
    if (focusedItemId) {
      expandAncestorsForItemId(focusedItemId)
    }
  }, [expandAncestorsForItemId, focusedItemId])

  useEffectScroll({ currentRowNumber, list })

  useEffect(() => {
    if (
      treeBaseItems &&
      treeBaseItems.length &&
      (itemsObjectRef.current !== itemsObject ||
        showAllRef.current !== showAll ||
        treeBaseItemsRef.current !== treeBaseItems ||
        treeExpandedIdsRef.current !== treeExpandedIds)
    ) {
      const newTreeListItems = buildList({
        allItemsObject: itemsObject,
        baseItems: treeBaseItems,
        expandedIds: treeExpandedIds,
        fetchItemById,
        showAll,
      })

      setTreeListItems(newTreeListItems, { managerScope })
    }

    itemsObjectRef.current = itemsObject
    showAllRef.current = showAll
    treeBaseItemsRef.current = treeBaseItems
    treeExpandedIdsRef.current = treeExpandedIds
  }, [
    buildList,
    fetchItemById,
    itemsObject,
    managerScope,
    setTreeListItems,
    showAll,
    treeBaseItems,
    treeExpandedIds,
  ])

  const itemRenderer = index => {
    if (!(treeListItems && treeListItems.length)) {
      return (
        <Grid key={`index-${index}`} padded>
          <Grid.Row style={{ height: emToPixels(3.5) }}>
            <Grid.Column style={{ paddingTop: 60, width: 150 }}>
              <Dimmer active inverted>
                <Loader content="Loading" inverted />
              </Dimmer>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )
    }

    const focusedIndex = currentRowNumber - 1
    const { isExpandable, id: itemId, level } = treeListItems[index] || {}
    const isExpanded = itemId && !!treeExpandedIds[itemId]
    const isFocused = index === focusedIndex

    return (
      <ListItem
        isExpandable={isExpandable}
        isExpanded={isExpanded}
        isFocused={isFocused}
        itemId={itemId}
        ItemTitle={ItemTitle}
        key={itemId || `index-${index}`}
        level={level}
        namespace={managerScope}
        onClickRow={onClickRow}
        onToggleRow={onToggleRow}
        resource={resource}
        {...itemFetchOptions}
      />
    )
  }

  return (
    <ReactList
      itemRenderer={itemRenderer}
      itemsRenderer={itemsRenderer}
      length={treeListItems.length}
      ref={list}
      type="uniform"
    />
  )
}

TreeView.defaultProps = defaultProps
TreeView.propTypes = propTypes

export default compose(createTreeModuleWrapper())(TreeView)
