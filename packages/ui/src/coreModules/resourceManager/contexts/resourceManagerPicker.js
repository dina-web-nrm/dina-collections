import React, { createContext, useContext, useMemo } from 'react'
import PropTypes from 'prop-types'

const ResourceManagerPickerContext = createContext()

const usePicker = () => {
  const context = useContext(ResourceManagerPickerContext)
  if (!context) {
    throw new Error('must be used within a ResourceManagerPickerProvider')
  }

  return context
}

const propTypes = {
  cancelCreate: PropTypes.func.isRequired,
  createItemActive: PropTypes.bool.isRequired,
  editItemActive: PropTypes.bool.isRequired,
  filterActive: PropTypes.bool.isRequired,
  itemId: PropTypes.string,
  navigateCreate: PropTypes.func.isRequired,
  navigateEdit: PropTypes.func.isRequired,
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

const ResourceManagerPickerProvider = ({
  cancelCreate,
  createItemActive,
  editItemActive,
  filterActive,
  itemId,
  navigateCreate,
  navigateEdit,
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
      cancelCreate,
      createItemActive,
      editItemActive,
      filterActive,
      itemId,
      navigateCreate,
      navigateEdit,
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
    cancelCreate,
    createItemActive,
    editItemActive,
    filterActive,
    itemId,
    navigateCreate,
    navigateEdit,
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
    <ResourceManagerPickerContext.Provider value={contextValue} {...rest} />
  )
}

ResourceManagerPickerProvider.propTypes = propTypes
ResourceManagerPickerProvider.defaultProps = defaultProps

export { ResourceManagerPickerProvider, usePicker }
