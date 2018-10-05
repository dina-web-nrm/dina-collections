import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { RowLayout } from 'coreModules/layout/components'
import memoize from 'memoize-one'
import { injectWindowHeight } from 'coreModules/size/higherOrderComponents'
import { emToPixels } from 'coreModules/layout/utilities'
import extractProps from 'utilities/extractProps'
import { getTableWidth } from 'coreModules/resourceManager/utilities'

import {
  NAVIGATE_LIST,
  NAVIGATE_TREE,
} from 'coreModules/resourceManager/constants'

import RecordNavigationBar from './RecordNavigationBar'
import TableView from './TableView'
import TreeView from './TreeView'
import ResultOptionsBar from './ResultOptionsBar'
import EditItemColumn from '../EditItemColumn'
import CreateItemColumn from '../CreateItemColumn'

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  createItemActive: PropTypes.bool.isRequired,
  editItemActive: PropTypes.bool.isRequired,
  isPicker: PropTypes.bool.isRequired,
  onFormTabClick: PropTypes.func.isRequired,
  onInteraction: PropTypes.func.isRequired,
  recordNavigationHeight: PropTypes.number,
  recordOptionsHeight: PropTypes.number,
  resource: PropTypes.string.isRequired,
  tableActive: PropTypes.bool.isRequired,
  tableColumnSpecifications: PropTypes.array.isRequired,
  treeActive: PropTypes.bool.isRequired,
  treeEnabled: PropTypes.bool.isRequired,
}

const defaultProps = {
  recordNavigationHeight: emToPixels(4.25),
  recordOptionsHeight: emToPixels(3.5625),
}

class MainColumn extends Component {
  constructor(props) {
    super(props)

    this.renderRow = this.renderRow.bind(this)
  }

  getRows = memoize(
    (
      tableActive,
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
      })

      if (tableActive) {
        rows.push({
          key: 'tableView',
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

  renderRow(key) {
    switch (key) {
      case 'recordNavigationBar': {
        const { isPicker, treeActive } = this.props
        const { extractedProps } = extractProps({
          keys: [
            'currentTableRowNumber',
            'onOpenNewRecordForm',
            'onSelectNextRecord',
            'onSelectPreviousRecord',
            'onSetCurrentTableRowNumber',
            'onShowAllRecords',
            'totalNumberOfRecords',
          ],
          props: this.props,
        })

        return (
          <RecordNavigationBar
            {...extractedProps}
            showNewRecordButton={!isPicker}
            showRecordInput={!isPicker}
            showShowAllButton={!isPicker}
            showSlider={!isPicker}
            showTotalRecords={!(isPicker && treeActive)}
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
          recordNavigationHeight,
          recordOptionsHeight,
          tableColumnSpecifications,
          availableHeight,
        } = this.props
        const width = getTableWidth({ tableColumnSpecifications })
        const { extractedProps } = extractProps({
          keys: [
            'currentTableRowNumber',
            'focusedIndex',
            'tableBatchFetchOptions',
            'listItems',
            'onClickRow',
            'resource',
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

      case 'editItem': {
        const {
          recordNavigationHeight,
          recordOptionsHeight,
          availableHeight,
        } = this.props
        const { extractedProps } = extractProps({
          keys: [
            'itemId',
            'ItemTitle',
            'onInteraction',
            'renderEditForm',
            'resource',
            'itemFetchOptions',
          ],
          props: this.props,
        })

        return (
          <EditItemColumn
            {...extractedProps}
            availableHeight={
              availableHeight - recordNavigationHeight - recordOptionsHeight
            }
          />
        )
      }

      case 'createItem': {
        const {
          recordNavigationHeight,
          recordOptionsHeight,
          availableHeight,
        } = this.props
        const { extractedProps } = extractProps({
          keys: ['onInteraction', 'resource', 'renderCreateForm'],
          props: this.props,
        })

        return (
          <CreateItemColumn
            {...extractedProps}
            availableHeight={
              availableHeight - recordNavigationHeight - recordOptionsHeight
            }
          />
        )
      }

      case 'resultOptionBar': {
        const { extractedProps } = extractProps({
          keys: [
            'createItemActive',
            'editItemActive',
            'itemEnabled',
            'onToggleFilters',
            'tableActive',
            'treeActive',
            'treeEnabled',
          ],
          props: this.props,
        })

        return (
          <ResultOptionsBar
            {...extractedProps}
            onFormTabClick={this.props.onFormTabClick}
            onListTabClick={() => {
              this.props.onInteraction(NAVIGATE_LIST)
            }}
            onTreeTabClick={() => {
              this.props.onInteraction(NAVIGATE_TREE)
            }}
          />
        )
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
      treeActive,
      treeEnabled,
    } = this.props
    const rows = this.getRows(
      tableActive,
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
        'itemId',
        'listItems',
        'showAll',
        'tableActive',
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
