/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import createLog from 'utilities/log'

import actionCreators from 'coreModules/crud/actionCreators'
import { emToPixels } from 'coreModules/layout/utilities'
import {
  globalSelectors as keyObjectGlobalSelectors,
  actionCreators as keyObjectActionCreators,
} from 'coreModules/resourceManager/keyObjectModule'

import { createInjectSearch } from 'coreModules/search/higherOrderComponents'

import { reset as resetActionCreator } from 'redux-form'

import {
  CLOSE_ITEM_VIEW,
  CREATE_SUCCESS,
  ITEM_SELECT,
  NAVIGATE_CREATE,
  NAVIGATE_FILTER,
  PICKER_CLOSE,
  PICKER_PICK_ITEM,
} from 'coreModules/resourceManager/constants'

const log = createLog('resourceManager:resourceManagerWrapper')

const createResourceManagerWrapper = (
  { nestedCacheNamespaces = ['', 'title'] } = {}
) => ComposedComponent => {
  const mapStateToProps = (state, { resource }) => {
    const { get } = keyObjectGlobalSelectors
    const baseItems = get[':resource.baseItems'](state, { resource })
    const listItems = get[':resource.listItems'](state, { resource })
    const currentTableRowNumber =
      get[':resource.currentTableRowNumber'](state, { resource }) || 1

    const showAll = get[':resource.showAll'](state, { resource })
    const expandedIds = get[':resource.expandedIds'](state, { resource })
    const focusedIndex = currentTableRowNumber - 1
    const totalNumberOfRecords = (listItems || []).length
    const nextRowAvailable = currentTableRowNumber < totalNumberOfRecords
    const prevRowAvailable = currentTableRowNumber > 1
    const filterValues = get[':resource.listFilterValues'](state, { resource })
    const focusedItemId =
      listItems && listItems[focusedIndex] && listItems[focusedIndex].id

    const focusIdWhenLoaded = get[':resource.focusIdWhenLoaded'](state, {
      resource,
    })

    return {
      baseItems,
      currentTableRowNumber,
      expandedIds,
      filterValues,
      focusedIndex,
      focusedItemId,
      focusIdWhenLoaded,
      listItems,
      nextRowAvailable,
      prevRowAvailable,
      showAll,
      totalNumberOfRecords,
    }
  }

  const mapDispatchToProps = {
    clearNestedCache: actionCreators.clearNestedCache,
    clearResourceState: keyObjectActionCreators.del[':resource'],
    delFocusIdWhenLoaded:
      keyObjectActionCreators.del[':resource.focusIdWhenLoaded'],
    resetForm: resetActionCreator,
    setBaseItems: keyObjectActionCreators.set[':resource.baseItems'],
    setCurrentTableRowNumber:
      keyObjectActionCreators.set[':resource.currentTableRowNumber'],
    setExpandedIds: keyObjectActionCreators.set[':resource.expandedIds'],
    setFilterValues: keyObjectActionCreators.set[':resource.listFilterValues'],
    setFocusIdWhenLoaded:
      keyObjectActionCreators.set[':resource.focusIdWhenLoaded'],
    setListItems: keyObjectActionCreators.set[':resource.listItems'],
    setShowAll: keyObjectActionCreators.set[':resource.showAll'],
  }

  const propTypes = {
    baseItems: PropTypes.array,
    baseTreeFilter: PropTypes.object,
    buildFilterQuery: PropTypes.func.isRequired,
    clearNestedCache: PropTypes.func.isRequired,
    clearResourceState: PropTypes.func.isRequired,
    currentTableRowNumber: PropTypes.number.isRequired,
    delFocusIdWhenLoaded: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    editItemActive: PropTypes.bool.isRequired,
    expandedIds: PropTypes.object,
    filterActive: PropTypes.bool.isRequired,
    filterValues: PropTypes.object,
    focusedIndex: PropTypes.number.isRequired,
    focusedItemId: PropTypes.string,
    focusIdWhenLoaded: PropTypes.string,
    initialFilterValues: PropTypes.object,
    initialItemId: PropTypes.string,
    itemFetchOptions: PropTypes.object,
    itemId: PropTypes.string,
    listItems: PropTypes.array,
    nestedCacheNamespaces: PropTypes.arrayOf(PropTypes.string),
    nextRowAvailable: PropTypes.bool.isRequired,
    onInteraction: PropTypes.func.isRequired,
    prevRowAvailable: PropTypes.bool.isRequired,
    recordNavigationHeight: PropTypes.number,
    recordOptionsHeight: PropTypes.number,
    resetForm: PropTypes.func.isRequired,
    resource: PropTypes.string.isRequired,
    search: PropTypes.func.isRequired,
    setBaseItems: PropTypes.func.isRequired,
    setCurrentTableRowNumber: PropTypes.func.isRequired,
    setExpandedIds: PropTypes.func.isRequired,
    setFilterValues: PropTypes.func.isRequired,
    setFocusIdWhenLoaded: PropTypes.func.isRequired,
    setListItems: PropTypes.func.isRequired,
    setShowAll: PropTypes.func.isRequired,
    showAll: PropTypes.bool,
    tableActive: PropTypes.bool.isRequired,
    tableColumnSpecifications: PropTypes.array.isRequired,
    totalNumberOfRecords: PropTypes.number.isRequired,
    treeActive: PropTypes.bool.isRequired,
  }

  const defaultProps = {
    baseItems: [],
    baseTreeFilter: {},
    expandedIds: {},
    filterValues: undefined,
    focusedItemId: undefined,
    focusIdWhenLoaded: undefined,
    initialFilterValues: undefined,
    initialItemId: undefined,
    itemFetchOptions: { include: [], relationships: ['children', 'parent'] },
    itemId: undefined,
    listItems: [],
    nestedCacheNamespaces: undefined,
    recordNavigationHeight: emToPixels(4.25),
    recordOptionsHeight: emToPixels(3.5625),
    showAll: false,
  }

  class ResourceManagerWrapper extends Component {
    constructor(props) {
      super(props)

      this.expandAncestorsForItemId = this.expandAncestorsForItemId.bind(this)
      this.fetchTreeBase = this.fetchTreeBase.bind(this)
      this.findRowNumberById = this.findRowNumberById.bind(this)
      this.focusRowWithId = this.focusRowWithId.bind(this)
      this.getNestedCacheNamespaces = this.getNestedCacheNamespaces.bind(this)
      this.handleClickRow = this.handleClickRow.bind(this)
      this.handleClosePicker = this.handleClosePicker.bind(this)
      this.handleFormTabClick = this.handleFormTabClick.bind(this)
      this.handleInteraction = this.handleInteraction.bind(this)
      this.handleKeyDown = this.handleKeyDown.bind(this)
      this.handleOpenNewRecordForm = this.handleOpenNewRecordForm.bind(this)
      this.handlePickItem = this.handlePickItem.bind(this)
      this.handleSelectNextRecord = this.handleSelectNextRecord.bind(this)
      this.handleSelectPrev = this.handleSelectPrev.bind(this)
      this.handleSetCurrentTableRow = this.handleSetCurrentTableRow.bind(this)
      this.handleShowAllRecords = this.handleShowAllRecords.bind(this)
      this.handleToggleCurrentRow = this.handleToggleCurrentRow.bind(this)
      this.handleToggleFilters = this.handleToggleFilters.bind(this)
      this.handleToggleRow = this.handleToggleRow.bind(this)
      this.handleUpdateFilterValues = this.handleUpdateFilterValues.bind(this)
      this.selectCurrentRow = this.selectCurrentRow.bind(this)
      this.tableSearch = this.tableSearch.bind(this)
      this.resetFilters = this.resetFilters.bind(this)

      this.viewUpdateTableView = this.viewUpdateTableView.bind(this)
      this.transitionToTableView = this.transitionToTableView.bind(this)
      this.transitionFromTableView = this.transitionFromTableView.bind(this)

      this.viewUpdateTreeView = this.viewUpdateTreeView.bind(this)
      this.transitionToTreeView = this.transitionToTreeView.bind(this)
      this.transitionFromTreeView = this.transitionFromTreeView.bind(this)

      this.viewUpdateEditItemView = this.viewUpdateEditItemView.bind(this)
      this.transitionToEditItemView = this.transitionToEditItemView.bind(this)
      this.transitionFromEditItemView = this.transitionFromEditItemView.bind(
        this
      )
    }

    componentDidMount() {
      const { initialFilterValues, resource } = this.props

      if (initialFilterValues) {
        this.props.setFilterValues(initialFilterValues, { resource })
        this.handleInteraction(NAVIGATE_FILTER)
      }

      this.viewUpdateTableView()
      this.viewUpdateTreeView()
      this.viewUpdateEditItemView()

      document.addEventListener('keydown', this.handleKeyDown)
      this.props.clearNestedCache({
        namespaces: this.getNestedCacheNamespaces(),
      })
    }

    componentDidUpdate(prevProps) {
      const {
        currentTableRowNumber,
        resource,
        totalNumberOfRecords,
      } = this.props

      const activeViews = this.getActiveViews()
      activeViews.forEach(activeView => {
        switch (activeView) {
          case 'table': {
            this.viewUpdateTableView(prevProps)
            break
          }
          case 'tree': {
            this.viewUpdateTreeView(prevProps)
            break
          }
          case 'edit-item': {
            this.viewUpdateEditItemView(prevProps)
            break
          }

          default: {
            throw new Error(`Unknown active view: ${activeView}`)
          }
        }
      })

      const transitions = this.getTransitions(prevProps)

      transitions.forEach(transition => {
        switch (transition) {
          case 'to-table': {
            this.transitionToTableView(prevProps)
            break
          }
          case 'from-table': {
            this.transitionFromTableView(prevProps)
            break
          }
          case 'to-tree': {
            this.transitionToTreeView(prevProps)
            break
          }
          case 'from-tree': {
            this.transitionFromTreeView(prevProps)
            break
          }
          case 'to-edit-item': {
            this.transitionToEditItemView(prevProps)
            break
          }
          case 'from-edit-item': {
            this.transitionFromEditItemView(prevProps)
            break
          }
          default: {
            throw new Error(`Unknown transition: ${transition}`)
          }
        }
      })

      if (totalNumberOfRecords < currentTableRowNumber) {
        this.props.setCurrentTableRowNumber(totalNumberOfRecords, { resource })
      }
    }

    componentWillUnmount() {
      const { resource } = this.props
      this.props.clearNestedCache({
        namespaces: this.getNestedCacheNamespaces(),
      })

      document.removeEventListener('keydown', this.handleKeyDown)
      this.props.clearResourceState({ resource })
    }

    getNestedCacheNamespaces() {
      if (this.props.nestedCacheNamespaces) {
        return this.props.nestedCacheNamespaces
      }

      if (nestedCacheNamespaces) {
        return nestedCacheNamespaces.map(
          namespace => `${this.props.resource}${namespace}`
        )
      }

      return []
    }

    getActiveViews() {
      const keys = ['treeActive', 'tableActive', 'editItemActive']
      const keyNameMap = {
        editItemActive: 'edit-item',
        tableActive: 'table',
        treeActive: 'tree',
      }

      const activeViews = []
      keys.forEach(key => {
        if (this.props[key]) {
          activeViews.push(`${keyNameMap[key]}`)
        }
      })
      return activeViews
    }
    getTransitions(prevProps) {
      const keys = ['treeActive', 'tableActive', 'editItemActive']
      const keyNameMap = {
        editItemActive: 'edit-item',
        tableActive: 'table',
        treeActive: 'tree',
      }
      const transitions = []

      keys.forEach(key => {
        if (!this.props[key] && prevProps[key]) {
          transitions.push(`from-${keyNameMap[key]}`)
        }
        if (this.props[key] && !prevProps[key]) {
          transitions.push(`to-${keyNameMap[key]}`)
        }
      })
      return transitions
    }
    resetFilters() {
      const { resource } = this.props
      const formName = `${resource}Filter`
      this.props.resetForm(formName, { resource })
      this.props.setFilterValues({}, { resource })
    }

    handleKeyDown(event) {
      const { key } = event
      switch (key) {
        case 'ArrowDown': {
          return this.handleSelectNextRecord()
        }
        case 'ArrowUp': {
          return this.handleSelectPrev()
        }
        case 'ArrowLeft': {
          return this.handleToggleCurrentRow('collapse')
        }
        case 'ArrowRight': {
          return this.handleToggleCurrentRow('expand')
        }

        case 'Enter': {
          event.preventDefault()
          return this.selectCurrentRow()
        }

        default: {
          return null
        }
      }
    }

    expandAncestorsForItemId(itemId) {
      const { dispatch, itemFetchOptions, resource } = this.props
      const getManyActionCreator =
        actionCreators[resource] && actionCreators[resource].getMany

      return dispatch(
        getManyActionCreator({
          queryParams: {
            filter: {
              ancestorsToId: itemId,
            },
          },
          storeInState: false,
        })
      ).then((items = []) => {
        if (!items.length) {
          return null
        }

        const ids = items.map(item => {
          return item.id
        })

        return dispatch(
          getManyActionCreator({
            queryParams: {
              filter: {
                ids,
              },
              include: itemFetchOptions.include,
              relationships: itemFetchOptions.relationships,
            },
          })
        ).then(() => {
          const { expandedIds } = this.props
          const updatedExpandedIds = items.reduce((obj, item) => {
            return {
              ...obj,
              [item.id]: true,
            }
          }, expandedIds)

          this.props.setExpandedIds(updatedExpandedIds, { resource })
        })
      })
    }

    fetchTreeBase() {
      const {
        baseTreeFilter,
        dispatch,
        itemFetchOptions,
        resource,
      } = this.props
      const getManyActionCreator =
        actionCreators[resource] && actionCreators[resource].getMany

      return dispatch(
        getManyActionCreator({
          queryParams: {
            filter: baseTreeFilter,
            include: itemFetchOptions.include,
            relationships: itemFetchOptions.relationships,
          },
        })
      ).then(items => {
        this.props.setBaseItems(items, { resource })
      })
    }

    findRowNumberById(itemId) {
      const { focusedItemId, listItems } = this.props

      if (focusedItemId === itemId) {
        return null
      }

      let matchingIndex
      listItems.forEach((listItem, index) => {
        if (listItem.id === itemId) {
          matchingIndex = index
        }
      })
      if (matchingIndex) {
        return matchingIndex + 1
      }
      return null
    }

    focusRowWithId(itemId) {
      const { resource } = this.props
      const rowNumber = this.findRowNumberById(itemId)
      if (rowNumber) {
        this.props.setCurrentTableRowNumber(rowNumber, { resource })
        return rowNumber
      }
      return null
    }

    handleUpdateFilterValues(filters) {
      const { resource } = this.props
      this.props.setFilterValues(filters, { resource })
    }

    handleClosePicker() {
      this.handleInteraction(PICKER_CLOSE)
    }

    handlePickItem(itemId, nestedItem) {
      this.handleInteraction(PICKER_PICK_ITEM, { itemId, nestedItem })
    }

    handleOpenNewRecordForm() {
      this.handleInteraction(NAVIGATE_CREATE)
    }
    handleSelectNextRecord() {
      const { currentTableRowNumber, nextRowAvailable, resource } = this.props
      if (nextRowAvailable) {
        this.props.setCurrentTableRowNumber(currentTableRowNumber + 1, {
          resource,
        })
      }
    }
    handleSelectPrev() {
      const { currentTableRowNumber, prevRowAvailable, resource } = this.props
      if (prevRowAvailable) {
        this.props.setCurrentTableRowNumber(currentTableRowNumber - 1, {
          resource,
        })
      }
    }
    handleShowAllRecords() {
      const { resource, showAll } = this.props
      this.props.setShowAll(!showAll, { resource })
    }

    handleToggleRow(itemId) {
      const { expandedIds, resource } = this.props
      const updatedExpandedIds = {
        ...expandedIds,
        [itemId]: !expandedIds[itemId],
      }
      this.props.setExpandedIds(updatedExpandedIds, { resource })
    }

    handleToggleCurrentRow(mode) {
      const { focusedIndex, expandedIds, listItems, resource } = this.props
      const listItem = listItems[focusedIndex]
      const id = listItem && listItem.id

      const updatedExpandedIds = {
        ...expandedIds,
        [id]: mode === 'expand',
      }
      this.props.setExpandedIds(updatedExpandedIds, { resource })
    }

    handleClickRow(_, itemId) {
      this.focusRowWithId(itemId)
      this.handleInteraction(ITEM_SELECT, { itemId })
    }

    handleFormTabClick() {
      this.selectCurrentRow()
    }

    handleSetCurrentTableRow(event, number) {
      const { resource } = this.props
      this.props.setCurrentTableRowNumber(number, { resource })
    }

    handleToggleFilters() {
      const { filterActive } = this.props
      if (filterActive) {
        this.handleInteraction(CLOSE_ITEM_VIEW)
      } else {
        this.handleInteraction(NAVIGATE_FILTER)
      }
    }

    handleInteraction(type, data) {
      log.debug(`Got interaction: ${type}`, data)
      switch (type) {
        case CREATE_SUCCESS: {
          const { tableActive } = this.props

          if (tableActive) {
            this.tableSearch()
          }

          break
        }
        default: {
          break
        }
      }
      this.props.onInteraction(type, data)
    }
    selectCurrentRow(newFocusedIndex) {
      const { listItems, focusedIndex: currentFocusedIndex } = this.props

      const focusedIndex =
        newFocusedIndex !== undefined ? newFocusedIndex : currentFocusedIndex
      const listItem = listItems[focusedIndex]
      const itemId = listItem && listItem.id
      if (itemId !== undefined) {
        return this.handleInteraction(ITEM_SELECT, { itemId })
      }
      return null
    }

    tableSearch(filterValues) {
      const query = filterValues
        ? this.props.buildFilterQuery({
            values: filterValues,
          })
        : undefined

      const { search, resource } = this.props
      return search({ query }).then(items => {
        this.props.setListItems(items, { resource })
      })
    }

    viewUpdateTableView(prevProps) {
      const {
        filterValues,
        focusIdWhenLoaded,
        initialItemId,
        itemId,
        listItems,
        resource,
        tableActive,
      } = this.props

      if (!tableActive) {
        return
      }
      // assume initialMount
      if (!prevProps) {
        log.debug('initial update view: Table')
        if (
          itemId === undefined &&
          initialItemId !== undefined &&
          initialItemId !== ''
        ) {
          this.handleInteraction(ITEM_SELECT, { itemId: initialItemId })
        }
        this.transitionToTableView()
      }

      const {
        filterValues: prevFilterValues,
        listItems: prevListItems,
      } = prevProps

      if (filterValues !== prevFilterValues) {
        this.tableSearch(filterValues)
      }
      if (itemId && listItems !== prevListItems) {
        this.focusRowWithId(itemId)
      }
      if (focusIdWhenLoaded && prevListItems !== listItems) {
        const rowFocused = this.focusRowWithId(focusIdWhenLoaded)
        if (rowFocused) {
          this.props.delFocusIdWhenLoaded({ resource })
        }
      }
    }

    transitionToTableView() {
      log.debug('transition to view: Table')

      const { filterValues, focusedItemId, resource } = this.props

      if (focusedItemId) {
        this.props.setFocusIdWhenLoaded(focusedItemId, { resource })
        this.expandAncestorsForItemId(focusedItemId)
      }

      this.tableSearch(filterValues)
    }
    transitionFromTableView() {
      log.debug('transition from view: Table')

      this.props.clearNestedCache({
        namespaces: this.getNestedCacheNamespaces(),
      })
      this.resetFilters()
    }

    viewUpdateTreeView(prevProps) {
      const {
        focusIdWhenLoaded,
        listItems,
        resource,
        treeActive,
        itemId,
        initialItemId,
      } = this.props

      if (!treeActive) {
        return
      }

      if (!prevProps) {
        log.debug('initial update view: Tree')
        if (
          itemId === undefined &&
          initialItemId !== undefined &&
          initialItemId !== ''
        ) {
          this.props.setFocusIdWhenLoaded(initialItemId, { resource })
          this.expandAncestorsForItemId(initialItemId)
        }
        this.transitionToTreeView()
        return
      }

      const { listItems: prevListItems } = prevProps

      if (focusIdWhenLoaded && prevListItems !== listItems) {
        const rowFocused = this.focusRowWithId(focusIdWhenLoaded)
        if (rowFocused) {
          this.props.delFocusIdWhenLoaded({ resource })
        }
      }
    }
    transitionToTreeView() {
      log.debug('transition to view: Tree')
      const { focusedItemId, resource } = this.props

      if (focusedItemId) {
        this.props.setFocusIdWhenLoaded(focusedItemId, { resource })
        this.expandAncestorsForItemId(focusedItemId)
      }
      this.fetchTreeBase()
    }
    transitionFromTreeView() {
      log.debug('transition from view: Tree')
      const { resource } = this.props

      this.props.setExpandedIds({}, { resource })
    }

    viewUpdateEditItemView(prevProps) {
      const { editItemActive, focusedIndex, listItems, itemId } = this.props

      if (!editItemActive) {
        return
      }

      if (!prevProps) {
        log.debug('initial update view: EditItem')
        this.transitionToEditItemView()
        return
      }

      const {
        focusedIndex: prevFocusedIndex,
        listItems: prevListItems,
      } = prevProps

      if (itemId && listItems !== prevListItems) {
        this.focusRowWithId(itemId)
      }
      if (editItemActive && focusedIndex !== prevFocusedIndex) {
        this.selectCurrentRow(focusedIndex)
      }
    }
    transitionToEditItemView() {
      log.debug('transition to view: EditItem')
      const { filterValues } = this.props
      this.tableSearch(filterValues)
    }
    transitionFromEditItemView() {
      log.debug('transition from view: EditItem')
      this.props.clearNestedCache({
        namespaces: this.getNestedCacheNamespaces(),
      })
    }

    render() {
      const { nextRowAvailable, prevRowAvailable } = this.props
      return (
        <ComposedComponent
          {...this.props}
          fetchTreeBase={this.fetchTreeBase}
          onClickRow={this.handleClickRow}
          onClosePicker={this.handleClosePicker}
          onFormTabClick={this.handleFormTabClick}
          onInteraction={this.handleInteraction}
          onOpenNewRecordForm={this.handleOpenNewRecordForm}
          onPickItem={this.handlePickItem}
          onSelectNextRecord={nextRowAvailable && this.handleSelectNextRecord}
          onSelectPreviousRecord={prevRowAvailable && this.handleSelectPrev}
          onSetCurrentTableRowNumber={this.handleSetCurrentTableRow}
          onShowAllRecords={this.handleShowAllRecords}
          onToggleCurrentRow={this.handleToggleCurrentRow}
          onToggleFilters={this.handleToggleFilters}
          onToggleRow={this.handleToggleRow}
          onUpdateFilterValues={this.handleUpdateFilterValues}
          tableSearch={this.tableSearch}
        />
      )
    }
  }

  ResourceManagerWrapper.propTypes = propTypes
  ResourceManagerWrapper.defaultProps = defaultProps

  return compose(
    createInjectSearch({
      includeFields: ['id'],
      storeSearchResult: false,
    }),
    connect(mapStateToProps, mapDispatchToProps),
    connect()
  )(ResourceManagerWrapper)
}

export default createResourceManagerWrapper
