import React, { createContext, useContext, useMemo } from 'react'
import PropTypes from 'prop-types'

const ResourceManagerConfigContext = createContext()

const useConfig = () => {
  const context = useContext(ResourceManagerConfigContext)
  if (!context) {
    throw new Error('must be used within a ResourceManagerConfigProvider')
  }

  return context
}

const propTypes = {
  baseTreeFilter: PropTypes.object,
  buildEditItemHeaders: PropTypes.func,
  buildFilterQuery: PropTypes.func.isRequired,
  enableTableColumnSorting: PropTypes.bool.isRequired,
  excludeRootNode: PropTypes.bool.isRequired,
  initialFilterValues: PropTypes.object,
  initialItemId: PropTypes.string,
  managerScope: PropTypes.string.isRequired,
  onSubmitCreateForm: PropTypes.func,
  resource: PropTypes.string.isRequired,
  searchResource: PropTypes.string.isRequired,
  sortOrder: PropTypes.array,
  tableBatchFetchOptions: PropTypes.object,
  tableColumnSpecifications: PropTypes.array.isRequired,
  treeEnabled: PropTypes.bool.isRequired,
  treeItemFetchOptions: PropTypes.object,
}
const defaultProps = {
  baseTreeFilter: undefined,
  buildEditItemHeaders: undefined,
  initialFilterValues: undefined,
  initialItemId: undefined,
  onSubmitCreateForm: undefined,
  sortOrder: undefined,
  tableBatchFetchOptions: undefined,
  treeItemFetchOptions: undefined,
}

const ResourceManagerConfigProvider = ({
  baseTreeFilter,
  buildEditItemHeaders,
  buildFilterQuery,
  enableTableColumnSorting,
  excludeRootNode,
  initialFilterValues,
  initialItemId,
  managerScope,
  onSubmitCreateForm,
  resource,
  searchResource,
  sortOrder,
  tableBatchFetchOptions,
  tableColumnSpecifications,
  treeEnabled,
  treeItemFetchOptions,
  ...rest
}) => {
  const allTableColumnFieldPaths = useMemo(() => {
    return tableColumnSpecifications.map(({ fieldPath }) => fieldPath)
  }, [tableColumnSpecifications])

  const contextValue = useMemo(() => {
    return {
      allTableColumnFieldPaths,
      baseTreeFilter,
      buildEditItemHeaders,
      buildFilterQuery,
      enableTableColumnSorting,
      excludeRootNode,
      initialFilterValues,
      initialItemId,
      managerScope,
      onSubmitCreateForm,
      resource,
      searchResource,
      sortOrder,
      tableBatchFetchOptions,
      tableColumnSpecifications,
      treeEnabled,
      treeItemFetchOptions,
    }
  }, [
    allTableColumnFieldPaths,
    baseTreeFilter,
    buildEditItemHeaders,
    buildFilterQuery,
    enableTableColumnSorting,
    excludeRootNode,
    initialFilterValues,
    initialItemId,
    managerScope,
    onSubmitCreateForm,
    resource,
    searchResource,
    sortOrder,
    tableBatchFetchOptions,
    tableColumnSpecifications,
    treeEnabled,
    treeItemFetchOptions,
  ])

  return (
    <ResourceManagerConfigContext.Provider value={contextValue} {...rest} />
  )
}

ResourceManagerConfigProvider.propTypes = propTypes
ResourceManagerConfigProvider.defaultProps = defaultProps

export { ResourceManagerConfigProvider, useConfig }
