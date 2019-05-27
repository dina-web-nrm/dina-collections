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

const injectResourceManagerConfig = ComposedComponent => {
  const ResourceManagerConfigInjector = props => {
    const configContext = useConfig()

    return <ComposedComponent {...props} {...configContext} />
  }

  return ResourceManagerConfigInjector
}

const propTypes = {
  baseTreeFilter: PropTypes.object.isRequired,
  buildEditItemHeaders: PropTypes.func.isRequired,
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
  renderFilterForm: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired,
  searchResource: PropTypes.string.isRequired,
  sortOrder: PropTypes.array.isRequired,
  tableBatchFetchOptions: PropTypes.object.isRequired,
  tableColumnSpecifications: PropTypes.array.isRequired,
  transformOutput: PropTypes.func.isRequired,
  treeEnabled: PropTypes.bool.isRequired,
  treeItemFetchOptions: PropTypes.object.isRequired,
}
const defaultProps = {
  initialItemId: undefined,
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
  renderFilterForm,
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
      renderFilterForm,
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
    renderFilterForm,
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

export { injectResourceManagerConfig, ResourceManagerConfigProvider, useConfig }
