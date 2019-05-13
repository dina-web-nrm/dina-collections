import React, { createContext, useContext, useMemo } from 'react'
import PropTypes from 'prop-types'

const ResourceManagerTableStateContext = createContext()

const useTableState = () => {
  const context = useContext(ResourceManagerTableStateContext)
  if (!context) {
    throw new Error('must be used within a ResourceManagerTableStateProvider')
  }

  return context
}

const propTypes = {
  currentTableRowNumber: PropTypes.number.isRequired,
  focusedIndex: PropTypes.number.isRequired,
  focusedItemId: PropTypes.string,
  focusIdWhenLoaded: PropTypes.string,
  initialItemId: PropTypes.string,
  itemId: PropTypes.string,
  listItems: PropTypes.array.isRequired,
  nextRowAvailable: PropTypes.bool.isRequired,
  prevRowAvailable: PropTypes.bool.isRequired,
  tableBatchFetchOptions: PropTypes.shape({
    include: PropTypes.array,
    relationships: PropTypes.array,
    resolveRelationships: PropTypes.array,
    resource: PropTypes.string,
  }).isRequired,
  tableColumnSpecifications: PropTypes.array.isRequired,
  tableColumnsToSort: PropTypes.array.isRequired,
}
const defaultProps = {
  focusedItemId: undefined,
  focusIdWhenLoaded: undefined,
  initialItemId: undefined,
  itemId: undefined,
}

const ResourceManagerTableStateProvider = ({
  currentTableRowNumber,
  focusedIndex,
  focusedItemId,
  focusIdWhenLoaded,
  initialItemId,
  itemId,
  listItems,
  nextRowAvailable,
  prevRowAvailable,
  tableBatchFetchOptions,
  tableColumnSpecifications,
  tableColumnsToSort,
  ...rest
}) => {
  const contextValue = useMemo(() => {
    return {
      currentTableRowNumber,
      focusedIndex,
      focusedItemId,
      focusIdWhenLoaded,
      initialItemId,
      itemId,
      listItems,
      nextRowAvailable,
      prevRowAvailable,
      tableBatchFetchOptions,
      tableColumnSpecifications,
      tableColumnsToSort,
    }
  }, [
    currentTableRowNumber,
    focusedIndex,
    focusedItemId,
    focusIdWhenLoaded,
    initialItemId,
    itemId,
    listItems,
    nextRowAvailable,
    prevRowAvailable,
    tableBatchFetchOptions,
    tableColumnSpecifications,
    tableColumnsToSort,
  ])

  return (
    <ResourceManagerTableStateContext.Provider value={contextValue} {...rest} />
  )
}

ResourceManagerTableStateProvider.propTypes = propTypes
ResourceManagerTableStateProvider.defaultProps = defaultProps

export { ResourceManagerTableStateProvider, useTableState }
