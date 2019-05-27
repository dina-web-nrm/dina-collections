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
  createGetNestedItemHocInput: PropTypes.object.isRequired,
  enableTableColumnSorting: PropTypes.bool.isRequired,
  excludeRootNode: PropTypes.bool.isRequired,
  fetchResourceCount: PropTypes.func.isRequired,
  initialFilterValues: PropTypes.object.isRequired,
  initialItemId: PropTypes.string,
  managerScope: PropTypes.string.isRequired,
  renderCreateForm: PropTypes.func.isRequired,
  renderEditForm: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired,
  searchResource: PropTypes.string.isRequired,
  sortOrder: PropTypes.array,
  tableBatchFetchOptions: PropTypes.object,
  tableColumnSpecifications: PropTypes.array.isRequired,
  transformOutput: PropTypes.func,
  treeEnabled: PropTypes.bool.isRequired,
  treeItemFetchOptions: PropTypes.object,
}
const defaultProps = {
  baseTreeFilter: undefined,
  buildEditItemHeaders: undefined,
  initialItemId: undefined,
  sortOrder: undefined,
  tableBatchFetchOptions: undefined,
  transformOutput: undefined,
  treeItemFetchOptions: undefined,
}

const ResourceManagerConfigProvider = ({
  baseTreeFilter,
  buildEditItemHeaders,
  buildFilterQuery,
  createGetNestedItemHocInput,
  enableTableColumnSorting,
  excludeRootNode,
  fetchResourceCount,
  initialFilterValues,
  initialItemId,
  managerScope,
  renderCreateForm,
  renderEditForm,
  resource,
  searchResource,
  sortOrder,
  tableBatchFetchOptions,
  tableColumnSpecifications,
  transformOutput,
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
      createGetNestedItemHocInput,
      enableTableColumnSorting,
      excludeRootNode,
      fetchResourceCount,
      initialFilterValues,
      initialItemId,
      managerScope,
      renderCreateForm,
      renderEditForm,
      resource,
      searchResource,
      sortOrder,
      tableBatchFetchOptions,
      tableColumnSpecifications,
      transformOutput,
      treeEnabled,
      treeItemFetchOptions,
    }
  }, [
    allTableColumnFieldPaths,
    baseTreeFilter,
    buildEditItemHeaders,
    buildFilterQuery,
    createGetNestedItemHocInput,
    enableTableColumnSorting,
    excludeRootNode,
    fetchResourceCount,
    initialFilterValues,
    initialItemId,
    managerScope,
    renderCreateForm,
    renderEditForm,
    resource,
    searchResource,
    sortOrder,
    tableBatchFetchOptions,
    tableColumnSpecifications,
    transformOutput,
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
