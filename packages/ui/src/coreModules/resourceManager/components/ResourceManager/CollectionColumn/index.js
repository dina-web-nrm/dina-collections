import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { RowLayout } from 'coreModules/layout/components'
import memoize from 'memoize-one'
import { injectWindowHeight } from 'coreModules/size/higherOrderComponents'
import RecordNavigationBar from 'domainModules/collectionMammals/components/MammalManager/MainColumn/RecordNavigationBar'
import extractProps from 'utilities/extractProps'
import { getTableWidth } from 'coreModules/resourceManager/utilities'

import {
  NAVIGATE_LIST,
  NAVIGATE_TREE,
} from 'coreModules/resourceManager/constants'

import TableView from './TableView'
import TreeView from './TreeView'
import ResultOptionBar from './ResultOptionBar'

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
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
  recordNavigationHeight: 58,
  recordOptionsHeight: 43,
}

class CollectionColumn extends Component {
  constructor(props) {
    super(props)

    this.renderRow = this.renderRow.bind(this)
  }

  getRows = memoize(
    (
      tableActive,
      treeActive,
      treeEnabled,
      recordNavigationHeight,
      recordOptionsHeight
    ) => {
      const rows = [
        {
          height: `${recordNavigationHeight}px`,
          key: 'recordNavigationBar',
        },
        {
          height: `${recordOptionsHeight}px`,
          key: 'resultOptionBar',
        },
      ]
      if (tableActive) {
        rows.push({
          key: 'tableView',
          style: { overflow: 'auto' },
        })
      }

      if (treeActive && treeEnabled) {
        rows.push({
          key: 'treeView',
          style: { overflow: 'auto' },
        })
      }
      return rows
    }
  )

  renderRow(key) {
    switch (key) {
      case 'recordNavigationBar': {
        const { extractedProps } = extractProps({
          keys: [
            'currentTableRowNumber',
            'onOpenNewRecordForm',
            'onSelectNextRecord',
            'onSelectPreviousRecord',
            'onSetCurrentTableRowNumber',
            'onShowAllRecords',
            'onToggleFilters',
            'totalNumberOfRecords',
          ],
          props: this.props,
        })
        return <RecordNavigationBar {...extractedProps} />
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

      case 'resultOptionBar': {
        const { extractedProps } = extractProps({
          keys: ['tableActive', 'treeActive', 'treeEnabled'],
          props: this.props,
        })

        return (
          <ResultOptionBar
            {...extractedProps}
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
      recordNavigationHeight,
      recordOptionsHeight
    )
    const { extractedProps } = extractProps({
      keys: [
        'baseItems',
        'currentTableRowNumber',
        'expandedIds',
        'focusedIndex',
        'tableActive',
        'listItems',
        'showAll',
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

CollectionColumn.defaultProps = defaultProps
CollectionColumn.propTypes = propTypes

export default compose(injectWindowHeight)(CollectionColumn)
