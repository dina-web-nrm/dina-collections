import React, { createContext, useContext, useMemo } from 'react'
import PropTypes from 'prop-types'

const ResourceManagerNavigationContext = createContext()

const useNavigation = () => {
  const context = useContext(ResourceManagerNavigationContext)
  if (!context) {
    throw new Error('must be used within a ResourceManagerNavigationProvider')
  }

  return context
}

const injectResourceManagerNavigation = ComposedComponent => {
  const ResourceManagerNavigationInjector = props => {
    const navigationContext = useNavigation()

    return <ComposedComponent {...props} {...navigationContext} />
  }

  return ResourceManagerNavigationInjector
}

const propTypes = {
  cancelCreate: PropTypes.func.isRequired,
  navigateCreate: PropTypes.func.isRequired,
  navigateEdit: PropTypes.func.isRequired,
  navigateFormSection: PropTypes.func.isRequired,
  navigateTable: PropTypes.func.isRequired,
  navigateTableSettings: PropTypes.func.isRequired,
  navigateTree: PropTypes.func.isRequired,
  onNavigation: PropTypes.func.isRequired,
  toggleFilter: PropTypes.func.isRequired,
}
const defaultProps = {}

const ResourceManagerNavigationProvider = ({
  cancelCreate,
  navigateCreate,
  navigateEdit,
  navigateFormSection,
  navigateTable,
  navigateTableSettings,
  navigateTree,
  onNavigation,
  toggleFilter,
  ...rest
}) => {
  const contextValue = useMemo(() => {
    return {
      cancelCreate,
      navigateCreate,
      navigateEdit,
      navigateFormSection,
      navigateTable,
      navigateTableSettings,
      navigateTree,
      onNavigation,
      toggleFilter,
    }
  }, [
    cancelCreate,
    navigateCreate,
    navigateEdit,
    navigateFormSection,
    navigateTable,
    navigateTableSettings,
    navigateTree,
    onNavigation,
    toggleFilter,
  ])

  return (
    <ResourceManagerNavigationContext.Provider value={contextValue} {...rest} />
  )
}

ResourceManagerNavigationProvider.propTypes = propTypes
ResourceManagerNavigationProvider.defaultProps = defaultProps

export {
  injectResourceManagerNavigation,
  ResourceManagerNavigationProvider,
  useNavigation,
}
