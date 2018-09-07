import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon, Menu } from 'semantic-ui-react'
import CsvExporter from './CsvExporter'

const propTypes = {
  isItemViewOrSettings: PropTypes.bool.isRequired,
  isTableViewOrSettings: PropTypes.bool.isRequired,
  onExportCsv: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired,
  onFormTabClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  onSettingClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  onTableTabClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
}

export class ResultOptionsBar extends Component {
  render() {
    const {
      isItemViewOrSettings,
      isTableViewOrSettings,
      onExportCsv: handleExportToCsv,
      onFormTabClick: handleFormTabClick,
      onSettingClick: handleSettingClick,
      onTableTabClick: handleTableTabClick,
    } = this.props

    return (
      <Menu attached="top" tabular>
        <Menu.Item
          active={isItemViewOrSettings}
          disabled={!handleFormTabClick}
          name="form"
          onClick={event => handleFormTabClick(event)}
        >
          <Icon name="wordpress forms" size="large" />
        </Menu.Item>
        <Menu.Item
          active={isTableViewOrSettings}
          disabled={!handleTableTabClick}
          name="table"
          onClick={event => handleTableTabClick(event)}
        >
          <Icon name="table" size="large" />
        </Menu.Item>
        <Menu.Menu position="right">
          {handleExportToCsv && <CsvExporter />}

          {handleSettingClick && (
            <Menu.Item>
              <Icon
                name="setting"
                onClick={event => handleSettingClick(event)}
                size="large"
                style={{ cursor: 'pointer' }}
              />
            </Menu.Item>
          )}
        </Menu.Menu>
      </Menu>
    )
  }
}

ResultOptionsBar.propTypes = propTypes

export default ResultOptionsBar
