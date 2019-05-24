import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Icon, Menu } from 'semantic-ui-react'

import {
  injectFocusedItemId,
  injectResourceManagerConfig,
  injectResourceManagerNavigation,
} from 'coreModules/resourceManager/higherOrderComponents'
import CsvExporter from './CsvExporter'

const propTypes = {
  createItemActive: PropTypes.bool.isRequired,
  editItemActive: PropTypes.bool.isRequired,
  focusedItemId: PropTypes.string,
  itemEnabled: PropTypes.bool.isRequired,
  navigateEdit: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  navigateTable: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  navigateTableSettings: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  navigateTree: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  searchResource: PropTypes.string.isRequired,
  tableActive: PropTypes.bool.isRequired,
  tableColumnSpecifications: PropTypes.array.isRequired,
  toggleFilter: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  treeActive: PropTypes.bool.isRequired,
  treeEnabled: PropTypes.bool.isRequired,
}
const defaultProps = {
  focusedItemId: undefined,
}

export class ResultOptionsBar extends Component {
  render() {
    const {
      createItemActive,
      editItemActive,
      focusedItemId,
      itemEnabled,
      navigateEdit: handleFormTabClick,
      navigateTable: handleTableTabClick,
      navigateTableSettings: handleTableSettingsClick,
      toggleFilter: handleToggleFilter,
      navigateTree: handleTreeTabClick,
      searchResource,
      tableActive,
      tableColumnSpecifications,
      treeActive,
      treeEnabled,
    } = this.props

    const hasSecondaryMenu = !createItemActive

    return (
      <Menu attached="top" icon style={{ position: 'relative' }} tabular>
        <Menu.Item
          active={tableActive}
          data-testid="tableTabMenuItem"
          link
          name="table"
          onClick={() => handleTableTabClick()}
        >
          <Icon name="table" />
        </Menu.Item>

        {treeEnabled && (
          <Menu.Item
            active={treeActive}
            link
            name="form"
            onClick={() => handleTreeTabClick()}
          >
            <Icon name="sitemap" />
          </Menu.Item>
        )}

        {itemEnabled && (
          <Menu.Item
            active={createItemActive || editItemActive}
            data-testid="formTabMenuItem"
            link
            name="form"
            onClick={() => {
              if (focusedItemId) {
                handleFormTabClick(focusedItemId)
              }
            }}
          >
            <Icon name="wordpress forms" />
          </Menu.Item>
        )}

        {hasSecondaryMenu && (
          <Menu.Menu className="icon secondary  ui" position="right">
            {tableActive && (
              <CsvExporter
                resource={searchResource}
                tableColumnSpecifications={tableColumnSpecifications}
              />
            )}
            {tableActive && (
              <Menu.Item
                data-testid="settingsMenuItem"
                link
                onClick={() => handleTableSettingsClick()}
              >
                <Icon name="setting" />
              </Menu.Item>
            )}
            {!createItemActive && (
              <Menu.Item
                data-testid="searchMenuItem"
                link
                onClick={() => handleToggleFilter()}
                style={{ marginLeft: '3.125em' }}
              >
                <Icon disabled={!handleToggleFilter} name="search" />
              </Menu.Item>
            )}
          </Menu.Menu>
        )}
      </Menu>
    )
  }
}

ResultOptionsBar.propTypes = propTypes
ResultOptionsBar.defaultProps = defaultProps

export default compose(
  injectResourceManagerConfig,
  injectFocusedItemId,
  injectResourceManagerNavigation
)(ResultOptionsBar)
