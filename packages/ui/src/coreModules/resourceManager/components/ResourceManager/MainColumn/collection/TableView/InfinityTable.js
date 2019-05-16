import React, { useEffect, useRef } from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import ReactList from 'react-list'

import { createBatchFetchItems } from 'coreModules/crud/higherOrderComponents'
import { useHandlers } from 'coreModules/resourceManager/contexts/resourceManagerHandlers'
import { useTableState } from 'coreModules/resourceManager/contexts/resourceManagerTableState'
import { useEffectScroll } from 'coreModules/resourceManager/hooks'

import InfinityTableRow from './InfinityTableRow'

const itemsRenderer = (items, ref) => {
  return (
    <div className="ui padded grid" ref={ref}>
      {items}
    </div>
  )
}

const propTypes = {
  fetchItemById: PropTypes.func.isRequired,
  managerScope: PropTypes.string.isRequired,
  resource: PropTypes.string.isRequired,
  tableColumnsToShow: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  width: PropTypes.number.isRequired,
}

const InfinityTable = ({
  fetchItemById,
  managerScope,
  resource,
  tableColumnsToShow,
  width,
}) => {
  const latestListItems = useRef(null)
  const list = useRef(null)

  const {
    clearNestedCache,
    delFocusIdWhenLoaded,
    focusRowWithId,
    getNestedCacheNamespaces,
    onClickRow,
    setFocusIdWhenLoaded,
  } = useHandlers()

  // this context would be better to use in the parent and should include
  // tableColumnsToShow and sort, but this was faster to prototype
  const {
    currentTableRowNumber,
    focusedIndex,
    focusedItemId,
    focusIdWhenLoaded,
    initialItemId,
    itemId,
    listItems,
    tableBatchFetchOptions,
    tableColumnSpecifications,
  } = useTableState()

  const {
    resolveRelationships,
    relationships,
    resource: tableResource,
  } = tableBatchFetchOptions

  useEffect(() => {
    if (listItems !== latestListItems.current) {
      if (itemId) {
        focusRowWithId(itemId)
      } else if (
        itemId === undefined &&
        initialItemId !== undefined &&
        initialItemId !== ''
      ) {
        setFocusIdWhenLoaded(initialItemId, { managerScope })
      } else if (focusedItemId && !focusIdWhenLoaded) {
        setFocusIdWhenLoaded(focusedItemId, { managerScope })
      } else if (focusIdWhenLoaded && listItems.length) {
        const rowFocused = focusRowWithId(focusIdWhenLoaded)
        if (rowFocused) {
          delFocusIdWhenLoaded({ managerScope })
        }
      }
    }

    latestListItems.current = listItems
  }, [
    delFocusIdWhenLoaded,
    focusedItemId,
    focusIdWhenLoaded,
    focusRowWithId,
    initialItemId,
    itemId,
    listItems,
    managerScope,
    setFocusIdWhenLoaded,
  ])

  useEffectScroll({ currentRowNumber: currentTableRowNumber, list })

  // is this really necessary?
  useEffect(() => {
    return () =>
      clearNestedCache({
        namespaces: getNestedCacheNamespaces(),
      })
  }, [clearNestedCache, getNestedCacheNamespaces])

  const itemRenderer = index => {
    return (
      <InfinityTableRow
        fetchItemById={fetchItemById}
        focusedIndex={focusedIndex}
        index={index}
        itemId={listItems[index].id}
        key={listItems[index].id}
        listItems={listItems}
        namespace={tableResource || managerScope}
        onClickRow={onClickRow}
        relationships={relationships}
        resolveRelationships={resolveRelationships}
        resource={tableResource || resource}
        tableColumnSpecifications={tableColumnSpecifications}
        tableColumnsToShow={tableColumnsToShow}
        width={width}
      />
    )
  }

  return (
    <div data-testid="infinityTable" style={{ width }}>
      <ReactList
        itemRenderer={itemRenderer}
        itemsRenderer={itemsRenderer}
        length={listItems.length}
        ref={list}
        type="uniform"
      />
    </div>
  )
}

InfinityTable.propTypes = propTypes

export default compose(
  createBatchFetchItems({
    // refetch: true,
  })
)(InfinityTable)
