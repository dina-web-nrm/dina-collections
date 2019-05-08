import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { RowLayout } from 'coreModules/layout/components'
import memoize from 'memoize-one'
import { injectWindowHeight } from 'coreModules/size/higherOrderComponents'
import { emToPixels } from 'coreModules/layout/utilities'
import extractProps from 'utilities/extractProps'
import { getTableWidth } from 'coreModules/resourceManager/utilities'

import RecordNavigationBar from './shared/RecordNavigationBar'
import ResultOptionsBar from './shared/ResultOptionsBar'
import TableSettings from './collection/TableSettings'
import TableView from './collection/TableView'
import TreeView from './collection/TreeView'
import CreateItemColumn from './item/CreateItemColumn'
import EditItemColumn from './item/EditItemColumn'

const getRows = memoize(
  (
    tableActive,
    tableSettingsActive,
    treeActive,
    treeEnabled,
    createItemActive,
    editItemActive,
    recordNavigationHeight,
    recordOptionsHeight,
    isPicker
  ) => {
    const rows = []

    if (!isPicker) {
      rows.push({
        height: `${recordNavigationHeight}px`,
        key: 'recordNavigationBar',
      })
    }

    rows.push({
      height: `${recordOptionsHeight}px`,
      key: 'resultOptionBar',
      style: {
        paddingLeft: '1rem',
        paddingRight: '1rem',
      },
    })

    if (tableActive) {
      rows.push({
        key: 'tableView',
        style: { overflow: 'auto' },
      })
    }

    if (tableSettingsActive) {
      rows.push({
        key: 'tableSettingsView',
        style: { overflow: 'auto' },
      })
    }

    if (treeActive) {
      rows.push({
        key: 'treeView',
        style: { overflow: 'auto' },
      })
    }

    if (createItemActive) {
      rows.push({
        key: 'createItem',
        style: { overflow: 'auto' },
      })
    }
    if (editItemActive) {
      rows.push({
        key: 'editItem',
        style: { overflow: 'auto' },
      })
    }
    return rows
  }
)

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  createGetNestedItemHocInput: PropTypes.object,
  createItemActive: PropTypes.bool.isRequired,
  editItemActive: PropTypes.bool.isRequired,
  fetchRelationshipsBeforeDelete: PropTypes.func,
  isPicker: PropTypes.bool.isRequired,
  onFormTabClick: PropTypes.func.isRequired,
  onInteraction: PropTypes.func.isRequired,
  recordNavigationHeight: PropTypes.number,
  recordOptionsHeight: PropTypes.number,
  resource: PropTypes.string.isRequired,
  tableActive: PropTypes.bool.isRequired,
  tableColumnSpecifications: PropTypes.array.isRequired,
  tableColumnsToShow: PropTypes.arrayOf(PropTypes.string.isRequired),
  tableSettingsActive: PropTypes.bool.isRequired,
  transformOutput: PropTypes.func,
  treeActive: PropTypes.bool.isRequired,
  treeEnabled: PropTypes.bool.isRequired,
}

const defaultProps = {
  createGetNestedItemHocInput: {},
  fetchRelationshipsBeforeDelete: undefined,
  recordNavigationHeight: emToPixels(4.25),
  recordOptionsHeight: emToPixels(3.5625),
  tableColumnsToShow: undefined,
  transformOutput: undefined,
}

class MainColumn extends Component {
  constructor(props) {
    super(props)

    this.renderRow = this.renderRow.bind(this)
  }

  renderRow(key) {
    switch (key) {
      case 'recordNavigationBar': {
        const { createItemActive, treeActive } = this.props

        const keys = [
          'createItemActive',
          'currentTableRowNumber',
          'numberOfListItems',
          'onSelectNextRecord',
          'onSelectPreviousRecord',
          'onSetCurrentTableRowNumber',
          'onShowAllRecords',
          'totalNumberOfRecords',
          'treeActive',
        ]

        if (!createItemActive) {
          keys.push('onOpenNewRecordForm')
        }

        const { extractedProps } = extractProps({
          keys,
          props: this.props,
        })

        return (
          <RecordNavigationBar
            {...extractedProps}
            disabled={treeActive || createItemActive}
          />
        )
      }
      case 'treeView': {
        const { extractedProps } = extractProps({
          keys: [
            'baseItems',
            'currentTableRowNumber',
            'expandedIds',
            'fetchTreeBase',
            'focusedIndex',
            'itemFetchOptions',
            'ItemTitle',
            'listItems',
            'managerScope',
            'onClickRow',
            'onToggleRow',
            'resource',
            'setBaseItems',
            'setFocusedIndex',
            'setListItems',
            'showAll',
          ],
          props: this.props,
        })
        const { itemFetchOptions } = extractedProps
        return <TreeView {...extractedProps} {...itemFetchOptions} />
      }

      case 'tableView': {
        const {
          availableHeight,
          recordNavigationHeight,
          recordOptionsHeight,
          tableColumnSpecifications,
          tableColumnsToShow,
        } = this.props

        const width = getTableWidth({
          includeColumns: tableColumnsToShow,
          tableColumnSpecifications,
        })

        const { extractedProps } = extractProps({
          keys: [
            'currentTableRowNumber',
            'enableTableColumnSorting',
            'focusedIndex',
            'focusedItemId',
            'listItems',
            'managerScope',
            'onClickRow',
            'onFormTabClick',
            'onSelectNextRecord',
            'onSelectPreviousRecord',
            'resource',
            'tableBatchFetchOptions',
            'tableColumnSpecifications',
            'tableSearch',
          ],
          props: this.props,
        })

        return (
          <TableView
            {...extractedProps}
            availableHeight={
              availableHeight - recordNavigationHeight - recordOptionsHeight
            }
            width={width}
          />
        )
      }

      case 'tableSettingsView': {
        const { extractedProps } = extractProps({
          keys: ['onTableTabClick', 'resource', 'tableColumnSpecifications'],
          props: this.props,
        })
        return <TableSettings {...extractedProps} />
      }

      case 'editItem': {
        const {
          availableHeight,
          createGetNestedItemHocInput,
          recordNavigationHeight,
          recordOptionsHeight,
        } = this.props

        const { extractedProps } = extractProps({
          keys: [
            'buildEditItemHeaders',
            'fetchRelationshipsBeforeDelete',
            'filterResourceCount',
            'itemId',
            'ItemTitle',
            'onInteraction',
            'relationshipsToCheckBeforeDelete',
            'renderEditForm',
            'resource',
            'itemFetchOptions',
            'sectionId',
            'transformOutput',
          ],
          props: this.props,
        })

        return (
          <EditItemColumn
            {...createGetNestedItemHocInput}
            {...extractedProps}
            availableHeight={
              availableHeight - recordNavigationHeight - recordOptionsHeight
            }
          />
        )
      }

      case 'createItem': {
        const {
          availableHeight,
          recordNavigationHeight,
          recordOptionsHeight,
          transformOutput,
        } = this.props
        const { extractedProps } = extractProps({
          keys: [
            'onInteraction',
            'filterResourceCount',
            'resource',
            'renderCreateForm',
            'sectionId',
          ],
          props: this.props,
        })

        return (
          <CreateItemColumn
            {...extractedProps}
            availableHeight={
              availableHeight - recordNavigationHeight - recordOptionsHeight
            }
            transformOutput={transformOutput}
          />
        )
      }

      case 'resultOptionBar': {
        const { extractedProps } = extractProps({
          keys: [
            'createItemActive',
            'csvExportEnabled',
            'editItemActive',
            'itemEnabled',
            'onFormTabClick',
            'onTableTabClick',
            'onTableSettingsClick',
            'onTreeTabClick',
            'onToggleFilters',
            'resource',
            'tableActive',
            'tableColumnSpecifications',
            'treeActive',
            'treeEnabled',
          ],
          props: this.props,
        })

        return <ResultOptionsBar {...extractedProps} />
      }

      default: {
        throw new Error(`Unknown row: ${key}`)
      }
    }
  }

  render() {
    const {
      availableHeight,
      createItemActive,
      editItemActive,
      isPicker,
      recordNavigationHeight,
      recordOptionsHeight,
      tableActive,
      tableSettingsActive,
      treeActive,
      treeEnabled,
    } = this.props
    const rows = getRows(
      tableActive,
      tableSettingsActive,
      treeActive,
      treeEnabled,
      createItemActive,
      editItemActive,
      recordNavigationHeight,
      recordOptionsHeight,
      isPicker
    )
    const { extractedProps } = extractProps({
      keys: [
        'baseItems',
        'currentTableRowNumber',
        'expandedIds',
        'focusedIndex',
        'isPicker',
        'itemId',
        'listItems',
        'showAll',
        'tableActive',
        'tableSettingsActive',
        'totalNumberOfRecords',
        'treeActive',
      ],
      props: this.props,
    })

    return (
      <RowLayout
        {...extractedProps}
        availableHeight={availableHeight}
        renderRow={this.renderRow}
        rows={rows}
      />
    )
  }
}

MainColumn.defaultProps = defaultProps
MainColumn.propTypes = propTypes

export default compose(injectWindowHeight)(MainColumn)
