import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import isEqual from 'fast-deep-equal'
import objectPath from 'object-path'

import crudActionCreators from 'coreModules/crud/actionCreators'
import crudSelectors from 'coreModules/crud/globalSelectors'
import { createBatchFetchItems } from 'coreModules/crud/higherOrderComponents'
import { KeyboardShortcuts } from 'coreModules/keyboardShortcuts/components'
import resourceManagerSelectors from 'coreModules/resourceManager/globalSelectors'
import {
  globalSelectors as keyObjectGlobalSelectors,
  actionCreators as keyObjectActionCreators,
} from 'coreModules/resourceManager/keyObjectModule'
import {
  createFocusRow,
  injectFocusedItemId,
  injectResourceManagerConfig,
} from '../../shared/higherOrderComponents'
import {
  buildList,
  getBottomUpLineage,
  getHighestCollapsedAncestorId,
} from '../../shared/utilities'

const { get } = keyObjectGlobalSelectors

const mapStateToProps = (
  state,
  { managerScope, resource, treeItemFetchOptions }
) => {
  return {
    ...treeItemFetchOptions, // passed into createBatchFetchItems
    currentRowNumber: resourceManagerSelectors.getCurrentTreeRowNumber(state, {
      managerScope,
    }),
    itemsObject: crudSelectors[resource].getItemsObject(state),
    treeBaseItems: get[':managerScope.treeBaseItems'](state, {
      managerScope,
    }),
    treeExpandedIds: get[':managerScope.treeExpandedIds'](state, {
      managerScope,
    }),
    treeListItems: get[':managerScope.treeListItems'](state, {
      managerScope,
    }),
  }
}

const mapDispatchToProps = (dispatch, { resource }) => ({
  getMany: (...args) => dispatch(crudActionCreators[resource].getMany(...args)),
  setTreeBaseItems: (...args) =>
    dispatch(
      keyObjectActionCreators.set[':managerScope.treeBaseItems'](...args)
    ),
  setTreeExpandedIds: (...args) =>
    dispatch(
      keyObjectActionCreators.set[':managerScope.treeExpandedIds'](...args)
    ),
  setTreeListItems: (...args) =>
    dispatch(
      keyObjectActionCreators.set[':managerScope.treeListItems'](...args)
    ),
})

const propTypes = {
  baseTreeFilter: PropTypes.object,
  focusedItemId: PropTypes.string,
  getMany: PropTypes.func.isRequired,
  itemsObject: PropTypes.object.isRequired,
  managerScope: PropTypes.string.isRequired,
  resource: PropTypes.string.isRequired,
  setFocusedItemId: PropTypes.func.isRequired,
  setTreeBaseItems: PropTypes.func.isRequired,
  setTreeExpandedIds: PropTypes.func.isRequired,
  setTreeListItems: PropTypes.func.isRequired,
  sortOrder: PropTypes.array,
  treeBaseItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ),
  treeExpandedIds: PropTypes.objectOf(PropTypes.bool.isRequired),
  treeItemFetchOptions: PropTypes.shape({
    include: PropTypes.array,
    relationships: PropTypes.array,
  }).isRequired,
  treeListItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      isExpandable: PropTypes.bool.isRequired,
      level: PropTypes.number.isRequired,
    }).isRequired
  ),
}
const defaultProps = {
  baseTreeFilter: {},
  focusedItemId: undefined,
  sortOrder: [],
  treeBaseItems: [],
  treeExpandedIds: {},
  treeListItems: [],
}

const createTreeWrapper = () => ComposedComponent => {
  class TreeModuleWrapper extends Component {
    constructor(props) {
      super(props)
      this.fetchAncestorIds = this.fetchAncestorIds.bind(this)
      this.fetchTreeBase = this.fetchTreeBase.bind(this)
      this.expandAncestorsForItemId = this.expandAncestorsForItemId.bind(this)
      this.handleToggleRow = this.handleToggleRow.bind(this)
      this.handleCollapseCurrentRow = this.handleCollapseCurrentRow.bind(this)
      this.handleExpandCurrentRow = this.handleExpandCurrentRow.bind(this)
      this.setCurrentRowIsExpanded = this.setCurrentRowIsExpanded.bind(this)

      this.shortcuts = [
        {
          command: 'left',
          description: 'Collapse tree node',
          onPress: this.handleCollapseCurrentRow,
        },
        {
          command: 'right',
          description: 'Expand tree node',
          onPress: this.handleExpandCurrentRow,
        },
      ]
    }

    setCurrentRowIsExpanded(isExpanded) {
      const {
        focusedItemId,
        treeExpandedIds,
        managerScope,
        setTreeExpandedIds,
      } = this.props

      const updatedExpandedIds = {
        ...treeExpandedIds,
        [focusedItemId]: isExpanded,
      }

      setTreeExpandedIds(updatedExpandedIds, { managerScope })
    }

    expandAncestorsForItemId(itemId) {
      const {
        getMany,
        managerScope,
        setTreeExpandedIds,
        sortOrder,
        treeItemFetchOptions,
      } = this.props

      return this.fetchAncestorIds(itemId).then(ancestorIds => {
        const anyNewToExpand = ancestorIds.reduce((newToExpand, id) => {
          if (newToExpand) {
            return newToExpand
          }

          return this.props.treeExpandedIds[id] !== true
        }, false)

        if (anyNewToExpand) {
          return getMany({
            queryParams: {
              filter: {
                ids: ancestorIds,
              },
              include: treeItemFetchOptions.include,
              relationships: treeItemFetchOptions.relationships,
              sort: sortOrder,
            },
          }).then(() => {
            const updatedExpandedIds = ancestorIds.reduce(
              (obj, id) => {
                return {
                  ...obj,
                  [id]: true,
                }
              },
              { ...this.props.treeExpandedIds }
            )

            setTreeExpandedIds(updatedExpandedIds, { managerScope })
          })
        }

        return null
      })
    }

    fetchAncestorIds(itemId) {
      const { getMany, sortOrder } = this.props

      return getMany({
        queryParams: {
          filter: {
            ancestorsToId: itemId,
          },
          sort: sortOrder,
        },
        storeInState: false,
      }).then((items = []) => {
        return items.map(({ id }) => id)
      })
    }

    fetchTreeBase() {
      const {
        baseTreeFilter,
        focusedItemId,
        getMany,
        treeItemFetchOptions,
        managerScope,
        setFocusedItemId,
        setTreeBaseItems,
        sortOrder,
        treeBaseItems,
      } = this.props

      return getMany({
        queryParams: {
          filter: baseTreeFilter,
          include: treeItemFetchOptions.include,
          relationships: treeItemFetchOptions.relationships,
          sort: sortOrder,
        },
      }).then(items => {
        const cleanedItems = items.map(({ attributes, ...rest }) => rest)

        if (!isEqual(cleanedItems, treeBaseItems)) {
          setTreeBaseItems(cleanedItems, { managerScope })
        }

        const firstItemId = objectPath.get(cleanedItems, '0.id')

        if (!focusedItemId && firstItemId) {
          setFocusedItemId(firstItemId)
        }
      })
    }

    handleToggleRow(itemId) {
      const {
        focusedItemId,
        itemsObject,
        managerScope,
        setFocusedItemId,
        setTreeExpandedIds,
        treeExpandedIds,
      } = this.props

      const updatedExpandedIds = {
        ...treeExpandedIds,
        [itemId]: !treeExpandedIds[itemId],
      }

      const focusedItemLineage = getBottomUpLineage({
        id: focusedItemId,
        itemsObject,
        lineage: [focusedItemId],
      }).reverse()

      const highestCollapsedAncestorId = getHighestCollapsedAncestorId({
        expandedIds: updatedExpandedIds,
        lineage: focusedItemLineage,
      })

      setTreeExpandedIds(updatedExpandedIds, { managerScope })

      if (
        highestCollapsedAncestorId &&
        highestCollapsedAncestorId !== focusedItemId
      ) {
        setFocusedItemId(highestCollapsedAncestorId)
      }
    }

    handleCollapseCurrentRow() {
      this.setCurrentRowIsExpanded(false)
    }

    handleExpandCurrentRow() {
      this.setCurrentRowIsExpanded(true)
    }

    render() {
      const { managerScope } = this.props

      return (
        <React.Fragment>
          <KeyboardShortcuts
            activeInLayer={managerScope}
            shortcuts={this.shortcuts}
          />
          <ComposedComponent
            {...this.props}
            buildList={buildList}
            expandAncestorsForItemId={this.expandAncestorsForItemId}
            fetchTreeBase={this.fetchTreeBase}
            onShowAllRecords={this.handleShowAllRecords}
            onToggleRow={this.handleToggleRow}
          />
        </React.Fragment>
      )
    }
  }

  TreeModuleWrapper.propTypes = propTypes
  TreeModuleWrapper.defaultProps = defaultProps

  return compose(
    injectResourceManagerConfig,
    injectFocusedItemId,
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    createFocusRow({
      itemsSelector: get[':managerScope.treeListItems'],
      rowSelector: resourceManagerSelectors.getCurrentTreeRowNumber,
    }),
    createBatchFetchItems({
      relationships: ['parent', 'children'],
    })
  )(TreeModuleWrapper)
}

export default createTreeWrapper
