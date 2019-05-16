import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { pick } from 'lodash'

import { injectWindowHeight } from 'coreModules/size/higherOrderComponents'
import {
  ColumnLayout,
  InformationSidebar,
  RowLayout,
} from 'coreModules/layout/components'
import { createResourceManagerWrapper } from 'coreModules/resourceManager/higherOrderComponents'
import layoutSelectors from 'coreModules/layout/globalSelectors'
import { emToPixels } from 'coreModules/layout/utilities'
import userSelectors from 'coreModules/user/globalSelectors'

import MainColumn from './layout/MainColumn'
import FilterColumn from './layout/FilterColumn'
import PickerHeader from './picker/PickerHeader'
import PickerActionBar from './picker/PickerActionBar'

const TOP_NAVBAR_HEIGHT = emToPixels(3.4375)
const PICKER_MODAL_PADDING = emToPixels(10)
const PICKER_HEADER_HEIGHT = emToPixels(3.5)
const PICKER_ACTION_BAR_HEIGHT = emToPixels(5)

const filterColumnStyle = {
  background: 'white',
  borderLeft: '1px solid #D4D4D5',
  zIndex: 100,
}

const mapStateToProps = (state, { isPicker, resource, windowHeight }) => {
  const availableHeight = isPicker
    ? windowHeight - PICKER_MODAL_PADDING
    : windowHeight - TOP_NAVBAR_HEIGHT

  const columnHeight = isPicker
    ? availableHeight - PICKER_HEADER_HEIGHT - PICKER_ACTION_BAR_HEIGHT
    : availableHeight

  const userPreferences = userSelectors.getUserPreferences(state)

  return {
    availableHeight,
    columnHeight,
    filterColumnWidth: isPicker ? emToPixels(16) : emToPixels(25),
    rightSidebarIsOpen: layoutSelectors.getRightSidebarIsOpen(state),
    tableColumnsToShow:
      (userPreferences && userPreferences[`${resource}TableColumnsToShow`]) ||
      undefined,
  }
}

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  columnHeight: PropTypes.number.isRequired,
  filterActive: PropTypes.bool.isRequired,
  filterColumnWidth: PropTypes.number.isRequired,
  focusedItemId: PropTypes.string,
  isPicker: PropTypes.bool,
  managerScope: PropTypes.string.isRequired,
  rightSidebarIsOpen: PropTypes.bool.isRequired,
  rightSidebarWidth: PropTypes.number,
  treeItemFetchOptions: PropTypes.object.isRequired,
}
const defaultProps = {
  focusedItemId: undefined,
  isPicker: false,
  rightSidebarWidth: emToPixels(25),
}

const ResourceManager = props => {
  const {
    availableHeight,
    columnHeight,
    focusedItemId,
    filterActive,
    filterColumnWidth,
    isPicker,
    treeItemFetchOptions,
    managerScope,
    rightSidebarIsOpen,
    rightSidebarWidth,
  } = props

  return (
    <RowLayout availableHeight={availableHeight}>
      {isPicker && (
        <RowLayout.Row height={`${PICKER_HEADER_HEIGHT}px`}>
          <PickerHeader {...pick(props, ['onClose', 'pickerTitle'])} />
        </RowLayout.Row>
      )}
      <RowLayout.Row>
        <ColumnLayout>
          <ColumnLayout.Column>
            <MainColumn
              {...props}
              availableHeight={columnHeight}
              itemEnabled={!isPicker}
            />
          </ColumnLayout.Column>
          {filterActive && (
            <ColumnLayout.Column
              style={filterColumnStyle}
              width={`${filterColumnWidth}px`}
            >
              <FilterColumn
                {...pick(props, [
                  'filterValues',
                  'isPicker',
                  'onInteraction',
                  'onShowAllRecords',
                  'onUpdateFilterValues',
                  'renderFilterForm',
                  'resource',
                  'tableSearch',
                ])}
                availableHeight={columnHeight}
              />
            </ColumnLayout.Column>
          )}
          {rightSidebarIsOpen && (
            <ColumnLayout.Column
              style={filterColumnStyle}
              width={`${rightSidebarWidth}px`}
            >
              <InformationSidebar />
            </ColumnLayout.Column>
          )}
        </ColumnLayout>
      </RowLayout.Row>
      {isPicker && (
        <RowLayout.Row height={`${PICKER_ACTION_BAR_HEIGHT}px`}>
          <PickerActionBar
            {...pick(props, [
              'excludeRootNode',
              'ItemTitle',
              'managerScope',
              'onPickItem',
              'resource',
            ])}
            {...treeItemFetchOptions}
            itemId={focusedItemId}
            namespace={`${managerScope}Title`}
          />
        </RowLayout.Row>
      )}
    </RowLayout>
  )
}

ResourceManager.propTypes = propTypes
ResourceManager.defaultProps = defaultProps

export default compose(
  createResourceManagerWrapper(),
  injectWindowHeight,
  connect(mapStateToProps)
)(ResourceManager)
