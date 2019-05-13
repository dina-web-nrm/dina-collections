import React, { useEffect, useRef } from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import ReactList from 'react-list'

import { createBatchFetchItems } from 'coreModules/crud/higherOrderComponents'
import { useHandlers } from 'coreModules/resourceManager/contexts/resourceManagerHandlers'
import { useTableState } from 'coreModules/resourceManager/contexts/resourceManagerTableState'

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

  useEffect(() => {
    const scroll = () => {
      const [firstVisibleRow, lastVisibleRow] = list.current.getVisibleRange()

      // this special case is to avoid that the focused row is hidden behind the
      // table header, which is fixed positioned and therefore seen by
      // react-list as the first row in terms of scroll position
      if (currentTableRowNumber <= firstVisibleRow + 1) {
        list.current.scrollTo(currentTableRowNumber - 1)
      } else if (currentTableRowNumber > lastVisibleRow) {
        list.current.scrollAround(currentTableRowNumber)
      }
    }

    if (list.current && currentTableRowNumber) {
      const [firstVisibleRow] = list.current.getVisibleRange()

      if (firstVisibleRow === undefined) {
        setTimeout(() => scroll())
      } else {
        scroll()
      }
    }
  }, [currentTableRowNumber])

  // is this really necessary?
  useEffect(() => {
    return () =>
      clearNestedCache({
        namespaces: getNestedCacheNamespaces(),
      })
  }, [clearNestedCache, getNestedCacheNamespaces])

  const itemRenderer = (index, key) => {
    return (
      <InfinityTableRow
        fetchItemById={fetchItemById}
        focusedIndex={focusedIndex}
        index={index}
        itemId={listItems[index].id}
        key={key}
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
    refetch: true,
  })
)(InfinityTable)
