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
  buildFilterQuery: PropTypes.func.isRequired,
  enableTableColumnSorting: PropTypes.bool.isRequired,
  excludeRootNode: PropTypes.bool.isRequired,
  initialItemId: PropTypes.string,
  itemFetchOptions: PropTypes.object,
  managerScope: PropTypes.string.isRequired,
  resource: PropTypes.string.isRequired,
  searchResource: PropTypes.string.isRequired,
  sortOrder: PropTypes.array,
  tableColumnSpecifications: PropTypes.array.isRequired,
}
const defaultProps = {
  baseTreeFilter: undefined,
  initialItemId: undefined,
  itemFetchOptions: undefined,
  sortOrder: undefined,
}

const ResourceManagerConfigProvider = ({
  baseTreeFilter,
  buildFilterQuery,
  enableTableColumnSorting,
  excludeRootNode,
  initialItemId,
  itemFetchOptions,
  managerScope,
  resource,
  searchResource,
  sortOrder,
  tableColumnSpecifications,
  ...rest
}) => {
  const allTableColumnFieldPaths = useMemo(() => {
    return tableColumnSpecifications.map(({ fieldPath }) => fieldPath)
  }, [tableColumnSpecifications])

  const contextValue = useMemo(() => {
    return {
      allTableColumnFieldPaths,
      baseTreeFilter,
      buildFilterQuery,
      enableTableColumnSorting,
      excludeRootNode,
      initialItemId,
      itemFetchOptions,
      managerScope,
      resource,
      searchResource,
      sortOrder,
      tableColumnSpecifications,
    }
  }, [
    allTableColumnFieldPaths,
    baseTreeFilter,
    buildFilterQuery,
    enableTableColumnSorting,
    excludeRootNode,
    initialItemId,
    itemFetchOptions,
    managerScope,
    resource,
    searchResource,
    sortOrder,
    tableColumnSpecifications,
  ])

  return (
    <ResourceManagerConfigContext.Provider value={contextValue} {...rest} />
  )
}

ResourceManagerConfigProvider.propTypes = propTypes
ResourceManagerConfigProvider.defaultProps = defaultProps

export { ResourceManagerConfigProvider, useConfig }
