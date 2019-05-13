import React, { createContext, useContext, useMemo } from 'react'
import PropTypes from 'prop-types'

const ResourceManagerHandlersContext = createContext()

const useHandlers = () => {
  const context = useContext(ResourceManagerHandlersContext)
  if (!context) {
    throw new Error('must be used within a ResourceManagerHandlersProvider')
  }

  return context
}

const propTypes = {
  clearNestedCache: PropTypes.func.isRequired,
  delFocusIdWhenLoaded: PropTypes.func.isRequired,
  fetchTreeBase: PropTypes.func.isRequired,
  focusRowWithId: PropTypes.func.isRequired,
  getNestedCacheNamespaces: PropTypes.func.isRequired,
  onClickRow: PropTypes.func.isRequired,
  onClosePicker: PropTypes.func.isRequired,
  onFormTabClick: PropTypes.func.isRequired,
  onInteraction: PropTypes.func.isRequired,
  onOpenNewRecordForm: PropTypes.func.isRequired,
  onPickItem: PropTypes.func.isRequired,
  onSelectNextRecord: PropTypes.func.isRequired,
  onSelectPreviousRecord: PropTypes.func.isRequired,
  onSetCurrentTableRowNumber: PropTypes.func.isRequired,
  onShowAllRecords: PropTypes.func.isRequired,
  onTableSettingsClick: PropTypes.func.isRequired,
  onTableTabClick: PropTypes.func.isRequired,
  onToggleCurrentRow: PropTypes.func.isRequired,
  onToggleFilters: PropTypes.func.isRequired,
  onToggleRow: PropTypes.func.isRequired,
  onTreeTabClick: PropTypes.func.isRequired,
  onUpdateFilterValues: PropTypes.func.isRequired,
  selectCurrentRow: PropTypes.func.isRequired,
  setFocusIdWhenLoaded: PropTypes.func.isRequired,
  tableSearch: PropTypes.func.isRequired,
}

const ResourceManagerHandlersProvider = ({
  clearNestedCache,
  delFocusIdWhenLoaded,
  fetchTreeBase,
  focusRowWithId,
  getNestedCacheNamespaces,
  onClickRow,
  onClosePicker,
  onFormTabClick,
  onInteraction,
  onOpenNewRecordForm,
  onPickItem,
  onSelectNextRecord,
  onSelectPreviousRecord,
  onSetCurrentTableRowNumber,
  onShowAllRecords,
  onTableSettingsClick,
  onTableTabClick,
  onToggleCurrentRow,
  onToggleFilters,
  onToggleRow,
  onTreeTabClick,
  onUpdateFilterValues,
  selectCurrentRow,
  setFocusIdWhenLoaded,
  tableSearch,
  ...rest
}) => {
  const contextValue = useMemo(() => {
    return {
      clearNestedCache,
      delFocusIdWhenLoaded,
      fetchTreeBase,
      focusRowWithId,
      getNestedCacheNamespaces,
      onClickRow,
      onClosePicker,
      onFormTabClick,
      onInteraction,
      onOpenNewRecordForm,
      onPickItem,
      onSelectNextRecord,
      onSelectPreviousRecord,
      onSetCurrentTableRowNumber,
      onShowAllRecords,
      onTableSettingsClick,
      onTableTabClick,
      onToggleCurrentRow,
      onToggleFilters,
      onToggleRow,
      onTreeTabClick,
      onUpdateFilterValues,
      selectCurrentRow,
      setFocusIdWhenLoaded,
      tableSearch,
    }
  }, [
    clearNestedCache,
    delFocusIdWhenLoaded,
    fetchTreeBase,
    focusRowWithId,
    getNestedCacheNamespaces,
    onClickRow,
    onClosePicker,
    onFormTabClick,
    onInteraction,
    onOpenNewRecordForm,
    onPickItem,
    onSelectNextRecord,
    onSelectPreviousRecord,
    onSetCurrentTableRowNumber,
    onShowAllRecords,
    onTableSettingsClick,
    onTableTabClick,
    onToggleCurrentRow,
    onToggleFilters,
    onToggleRow,
    onTreeTabClick,
    onUpdateFilterValues,
    selectCurrentRow,
    setFocusIdWhenLoaded,
    tableSearch,
  ])

  return (
    <ResourceManagerHandlersContext.Provider value={contextValue} {...rest} />
  )
}

ResourceManagerHandlersProvider.propTypes = propTypes

export { ResourceManagerHandlersProvider, useHandlers }
