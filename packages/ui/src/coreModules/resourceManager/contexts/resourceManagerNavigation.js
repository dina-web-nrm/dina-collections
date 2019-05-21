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

const propTypes = {
  createItemActive: PropTypes.bool.isRequired,
  editItemActive: PropTypes.bool.isRequired,
  filterActive: PropTypes.bool.isRequired,
  itemId: PropTypes.string,
  navigateCreate: PropTypes.func.isRequired,
  navigateEdit: PropTypes.func.isRequired,
  navigateFilter: PropTypes.func.isRequired,
  navigateFormSection: PropTypes.func.isRequired,
  navigateTable: PropTypes.func.isRequired,
  navigateTableSettings: PropTypes.func.isRequired,
  navigateTree: PropTypes.func.isRequired,
  onNavigation: PropTypes.func.isRequired,
  sectionId: PropTypes.string,
  tableActive: PropTypes.bool.isRequired,
  tableSettingsActive: PropTypes.bool.isRequired,
  toggleFilter: PropTypes.func.isRequired,
  treeActive: PropTypes.bool.isRequired,
}
const defaultProps = {
  itemId: undefined,
  sectionId: undefined,
}

const ResourceManagerNavigationProvider = ({
  createItemActive,
  editItemActive,
  filterActive,
  itemId,
  navigateCreate,
  navigateEdit,
  navigateFilter,
  navigateFormSection,
  navigateTable,
  navigateTableSettings,
  navigateTree,
  onNavigation,
  sectionId,
  tableActive,
  tableSettingsActive,
  toggleFilter,
  treeActive,
  ...rest
}) => {
  const contextValue = useMemo(() => {
    return {
      createItemActive,
      editItemActive,
      filterActive,
      itemId,
      navigateCreate,
      navigateEdit,
      navigateFilter,
      navigateFormSection,
      navigateTable,
      navigateTableSettings,
      navigateTree,
      onNavigation,
      sectionId,
      tableActive,
      tableSettingsActive,
      toggleFilter,
      treeActive,
    }
  }, [
    createItemActive,
    editItemActive,
    filterActive,
    itemId,
    navigateCreate,
    navigateEdit,
    navigateFilter,
    navigateFormSection,
    navigateTable,
    navigateTableSettings,
    navigateTree,
    onNavigation,
    sectionId,
    tableActive,
    tableSettingsActive,
    toggleFilter,
    treeActive,
  ])

  return (
    <ResourceManagerNavigationContext.Provider value={contextValue} {...rest} />
  )
}

ResourceManagerNavigationProvider.propTypes = propTypes
ResourceManagerNavigationProvider.defaultProps = defaultProps

export { ResourceManagerNavigationProvider, useNavigation }
