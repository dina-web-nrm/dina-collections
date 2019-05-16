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
  initialItemId: PropTypes.string,
  itemFetchOptions: PropTypes.object,
  managerScope: PropTypes.string.isRequired,
  resource: PropTypes.string.isRequired,
  searchResource: PropTypes.string.isRequired,
  sortOrder: PropTypes.array,
}
const defaultProps = {
  baseTreeFilter: undefined,
  initialItemId: undefined,
  itemFetchOptions: undefined,
  sortOrder: undefined,
}

const ResourceManagerConfigProvider = ({
  baseTreeFilter,
  initialItemId,
  itemFetchOptions,
  managerScope,
  resource,
  searchResource,
  sortOrder,
  ...rest
}) => {
  const contextValue = useMemo(() => {
    return {
      baseTreeFilter,
      initialItemId,
      itemFetchOptions,
      managerScope,
      resource,
      searchResource,
      sortOrder,
    }
  }, [
    baseTreeFilter,
    initialItemId,
    itemFetchOptions,
    managerScope,
    resource,
    searchResource,
    sortOrder,
  ])

  return (
    <ResourceManagerConfigContext.Provider value={contextValue} {...rest} />
  )
}

ResourceManagerConfigProvider.propTypes = propTypes
ResourceManagerConfigProvider.defaultProps = defaultProps

export { ResourceManagerConfigProvider, useConfig }
