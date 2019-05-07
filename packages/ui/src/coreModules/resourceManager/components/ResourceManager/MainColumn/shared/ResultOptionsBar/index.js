import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon, Menu } from 'semantic-ui-react'

import CsvExporter from './CsvExporter'

const propTypes = {
  createItemActive: PropTypes.bool.isRequired,
  csvExportEnabled: PropTypes.bool.isRequired,
  editItemActive: PropTypes.bool.isRequired,
  itemEnabled: PropTypes.bool.isRequired,
  onFormTabClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  onListTabClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  onSettingClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  onToggleFilters: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  onTreeTabClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  resource: PropTypes.string.isRequired,
  tableActive: PropTypes.bool.isRequired,
  tableColumnSpecifications: PropTypes.arrayOf().isRequired,
  treeActive: PropTypes.bool.isRequired,
  treeEnabled: PropTypes.bool.isRequired,
}

export class ResultOptionsBar extends Component {
  render() {
    const {
      createItemActive,
      csvExportEnabled,
      editItemActive,
      itemEnabled,
      onFormTabClick: handleFormTabClick,
      onListTabClick: handleListTabClick,
      onSettingClick: handleSettingClick,
      onToggleFilters: handleToggleFilters,
      onTreeTabClick: handleTreeTabClick,
      resource,
      tableActive,
      tableColumnSpecifications,
      treeActive,
      treeEnabled,
    } = this.props
    console.log('this.props', this.props)
    const hasSecondaryMenu =
      !(createItemActive || treeActive) ||
      csvExportEnabled ||
      handleSettingClick

    return (
      <Menu attached="top" icon style={{ position: 'relative' }} tabular>
        <Menu.Item
          active={tableActive}
          data-testid="tableTabMenuItem"
          link
          name="table"
          onClick={event => handleListTabClick(event)}
        >
          <Icon name="table" />
        </Menu.Item>

        {treeEnabled && (
          <Menu.Item
            active={treeActive}
            link
            name="form"
            onClick={event => handleTreeTabClick(event)}
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
            onClick={event => handleFormTabClick(event)}
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
            {handleSettingClick && (
              <Menu.Item
                data-testid="settingsMenuItem"
                link
                onClick={event => handleSettingClick(event)}
              >
                <Icon name="setting" />
              </Menu.Item>
            )}
            {!(createItemActive || treeActive) && (
              <Menu.Item
                data-testid="searchMenuItem"
                link
                onClick={event => handleToggleFilters(event)}
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

export default ResultOptionsBar
