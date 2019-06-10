import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { pick } from 'lodash'

import createLog from 'utilities/log'
import {
  ColumnLayout,
  InformationSidebar,
  RowLayout,
} from 'coreModules/layout/components'
import { emToPixels } from 'coreModules/layout/utilities'

import { createResourceManagerWrapper } from './shared/higherOrderComponents'
import MainColumn from './columns/MainColumn'
import FilterColumn from './columns/FilterColumn'
import PickerHeader from './picker/PickerHeader'
import PickerActionBar from './picker/PickerActionBar'

const log = createLog('resourceManager:ResourceManager')

const TOP_NAVBAR_HEIGHT = emToPixels(3.4375)
const PICKER_MODAL_PADDING = emToPixels(10)
const PICKER_HEADER_HEIGHT = emToPixels(3.5)
const PICKER_ACTION_BAR_HEIGHT = emToPixels(5)

const filterColumnStyle = {
  background: 'white',
  borderLeft: '1px solid #D4D4D5',
  zIndex: 100,
}

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  columnHeight: PropTypes.number.isRequired,
  filterActive: PropTypes.bool.isRequired,
  filterColumnWidth: PropTypes.number.isRequired,
  focusedItemId: PropTypes.string,
  isPicker: PropTypes.bool.isRequired,
  managerScope: PropTypes.string.isRequired,
  pickerHeaderHeight: PropTypes.number.isRequired,
  rightSidebarIsOpen: PropTypes.bool.isRequired,
  rightSidebarWidth: PropTypes.number.isRequired,
  treeItemFetchOptions: PropTypes.object.isRequired,
  windowHeight: PropTypes.number.isRequired,
}
const defaultProps = {
  focusedItemId: undefined,
}

const ResourceManager = props => {
  log.render()
  const {
    focusedItemId,
    filterActive,
    filterColumnWidth,
    isPicker,
    managerScope,
    rightSidebarIsOpen,
    rightSidebarWidth,
    windowHeight,
  } = props

  const availableHeight = isPicker
    ? windowHeight - PICKER_MODAL_PADDING
    : windowHeight - TOP_NAVBAR_HEIGHT

  const columnHeight = isPicker
    ? availableHeight - PICKER_HEADER_HEIGHT - PICKER_ACTION_BAR_HEIGHT
    : availableHeight

  return (
    <RowLayout availableHeight={availableHeight}>
      {isPicker && (
        <RowLayout.Row height={PICKER_HEADER_HEIGHT}>
          <PickerHeader {...pick(props, ['onClose', 'pickerTitle'])} />
        </RowLayout.Row>
      )}
      <RowLayout.Row>
        <ColumnLayout>
          <ColumnLayout.Column>
            <MainColumn
              {...pick(props, [
                'createItemActive',
                'editItemActive',
                'isPicker',
                'itemId',
                'recordNavigationHeight',
                'recordOptionsHeight',
                'sectionId',
                'tableActive',
                'tableSettingsActive',
                'treeActive',
              ])}
              availableHeight={columnHeight}
            />
          </ColumnLayout.Column>
          {filterActive && (
            <ColumnLayout.Column
              style={filterColumnStyle}
              width={filterColumnWidth}
            >
              <FilterColumn availableHeight={columnHeight} />
            </ColumnLayout.Column>
          )}
          {rightSidebarIsOpen && (
            <ColumnLayout.Column
              style={filterColumnStyle}
              width={rightSidebarWidth}
            >
              <InformationSidebar />
            </ColumnLayout.Column>
          )}
        </ColumnLayout>
      </RowLayout.Row>
      {isPicker && (
        <RowLayout.Row height={PICKER_ACTION_BAR_HEIGHT}>
          <PickerActionBar
            {...pick(props, [
              'excludeRootNode',
              'ItemTitle',
              'managerScope',
              'onPickItem',
              'resource',
              'treeItemFetchOptions',
            ])}
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

export default compose(createResourceManagerWrapper())(ResourceManager)
