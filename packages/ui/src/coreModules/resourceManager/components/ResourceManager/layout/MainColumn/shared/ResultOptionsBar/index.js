import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Icon, Menu } from 'semantic-ui-react'

import { globalSelectors as keyObjectGlobalSelectors } from 'coreModules/resourceManager/keyObjectModule'
import {
  injectResourceManagerConfig,
  injectResourceManagerNavigation,
} from 'coreModules/resourceManager/higherOrderComponents'
import CsvExporter from './CsvExporter'

const mapStateToProps = (state, { managerScope }) => {
  return {
    focusedItemId: keyObjectGlobalSelectors.get[':managerScope.focusedItemId'](
      state,
      {
        managerScope,
      }
    ),
  }
}

const propTypes = {
  createItemActive: PropTypes.bool.isRequired,
  csvExportEnabled: PropTypes.bool.isRequired,
  editItemActive: PropTypes.bool.isRequired,
  focusedItemId: PropTypes.string,
  itemEnabled: PropTypes.bool.isRequired,
  navigateEdit: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  navigateTableSettings: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  navigateTable: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  toggleFilter: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  navigateTree: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  resource: PropTypes.string.isRequired,
  tableActive: PropTypes.bool.isRequired,
  tableColumnSpecifications: PropTypes.array.isRequired,
  treeActive: PropTypes.bool.isRequired,
  treeEnabled: PropTypes.bool.isRequired,
}

export class ResultOptionsBar extends Component {
  render() {
    const {
      createItemActive,
      csvExportEnabled,
      editItemActive,
      focusedItemId,
      itemEnabled,
      navigateEdit: handleFormTabClick,
      navigateTable: handleTableTabClick,
      navigateTableSettings: handleTableSettingsClick,
      toggleFilter: handleToggleFilters,
      navigateTree: handleTreeTabClick,
      resource,
      tableActive,
      tableColumnSpecifications,
      treeActive,
      treeEnabled,
    } = this.props

    const hasSecondaryMenu =
      csvExportEnabled || tableActive || !(createItemActive || treeActive)

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
            {csvExportEnabled && (
              <CsvExporter
                resource={resource}
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
            {!(createItemActive || treeActive) && (
              <Menu.Item
                data-testid="searchMenuItem"
                link
                onClick={() => handleToggleFilters()}
                style={{ marginLeft: '3.125em' }}
              >
                <Icon disabled={!handleToggleFilters} name="search" />
              </Menu.Item>
            )}
          </Menu.Menu>
        )}
      </Menu>
    )
  }
}

ResultOptionsBar.propTypes = propTypes

export default compose(
  injectResourceManagerConfig,
  injectResourceManagerNavigation,
  connect(mapStateToProps)
)(ResultOptionsBar)
