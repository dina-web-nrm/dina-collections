import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { pick } from 'lodash'

import { RowLayout } from 'coreModules/layout/components'
import { injectWindowHeight } from 'coreModules/size/higherOrderComponents'
import { emToPixels } from 'coreModules/layout/utilities'

import TreeView from '../../tree/components/TreeView'
import TableSettings from '../../table/components/TableSettings'
import TableView from '../../table/components/TableView'
import RecordNavigationBar from './shared/RecordNavigationBar'
import ResultOptionsBar from './shared/ResultOptionsBar'
import CreateItemColumn from '../../form/components/CreateItemColumn'
import EditItemColumn from '../../form/components/EditItemColumn'

const recordOptionsBarRowStyle = {
  paddingLeft: '1rem',
  paddingRight: '1rem',
}
const overflowAuto = { overflow: 'auto' }

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  createGetNestedItemHocInput: PropTypes.object,
  createItemActive: PropTypes.bool.isRequired,
  editItemActive: PropTypes.bool.isRequired,
  isPicker: PropTypes.bool.isRequired,
  treeItemFetchOptions: PropTypes.object.isRequired,
  onInteraction: PropTypes.func.isRequired,
  onOpenNewRecordForm: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  recordNavigationHeight: PropTypes.number,
  recordOptionsHeight: PropTypes.number,
  tableActive: PropTypes.bool.isRequired,
  tableSettingsActive: PropTypes.bool.isRequired,
  treeActive: PropTypes.bool.isRequired,
}

const defaultProps = {
  createGetNestedItemHocInput: {},
  onOpenNewRecordForm: undefined,
  recordNavigationHeight: emToPixels(4.25),
  recordOptionsHeight: emToPixels(3.5625),
}

const MainColumn = props => {
  const {
    availableHeight,
    createGetNestedItemHocInput,
    createItemActive,
    editItemActive,
    isPicker,
    treeItemFetchOptions,
    onOpenNewRecordForm,
    recordNavigationHeight,
    recordOptionsHeight,
    tableActive,
    tableSettingsActive,
    treeActive,
  } = props
  console.log('maincolumn')
  return (
    <RowLayout availableHeight={availableHeight}>
      {!isPicker && (
        <RowLayout.Row height={`${recordNavigationHeight}px`}>
          <RecordNavigationBar
            {...pick(props, [
              'createItemActive',
              'numberOfListItems',
              'onSelectNextRecord',
              'onSelectPreviousRecord',
              'onSetCurrentTableRowNumber',
              'onShowAllRecords',
              'totalNumberOfRecords',
              'treeActive',
            ])}
            disabled={treeActive || createItemActive}
            onOpenNewRecordForm={
              createItemActive ? undefined : onOpenNewRecordForm
            }
          />
        </RowLayout.Row>
      )}
      <RowLayout.Row
        height={`${recordOptionsHeight}px`}
        style={recordOptionsBarRowStyle}
      >
        <ResultOptionsBar
          {...pick(props, [
            'createItemActive',
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
          ])}
        />
      </RowLayout.Row>
      {tableActive && (
        <RowLayout.Row style={overflowAuto}>
          <TableView
            availableHeight={
              availableHeight - recordNavigationHeight - recordOptionsHeight
            }
          />
        </RowLayout.Row>
      )}
      {tableSettingsActive && (
        <RowLayout.Row style={overflowAuto}>
          <TableSettings
            {...pick(props, [
              'onTableTabClick',
              'resource',
              'tableColumnSpecifications',
            ])}
          />
        </RowLayout.Row>
      )}
      {treeActive && (
        <RowLayout.Row style={overflowAuto}>
          <TreeView {...props} {...treeItemFetchOptions} />
        </RowLayout.Row>
      )}
      {createItemActive && (
        <RowLayout.Row style={overflowAuto}>
          <CreateItemColumn
            {...pick(props, [
              'onInteraction',
              'filterResourceCount',
              'resource',
              'renderCreateForm',
              'sectionId',
              'transformOutput',
            ])}
            availableHeight={
              availableHeight - recordNavigationHeight - recordOptionsHeight
            }
          />
        </RowLayout.Row>
      )}
      {editItemActive && (
        <RowLayout.Row style={overflowAuto}>
          <EditItemColumn
            {...createGetNestedItemHocInput}
            {...pick(props, [
              'buildEditItemHeaders',
              'fetchRelationshipsBeforeDelete',
              'filterResourceCount',
              'itemId',
              'ItemTitle',
              'onInteraction',
              'relationshipsToCheckBeforeDelete',
              'renderEditForm',
              'resource',
              'treeItemFetchOptions',
              'sectionId',
              'transformOutput',
            ])}
            availableHeight={
              availableHeight - recordNavigationHeight - recordOptionsHeight
            }
          />
        </RowLayout.Row>
      )}
    </RowLayout>
  )
}

MainColumn.defaultProps = defaultProps
MainColumn.propTypes = propTypes

export default compose(injectWindowHeight)(MainColumn)
