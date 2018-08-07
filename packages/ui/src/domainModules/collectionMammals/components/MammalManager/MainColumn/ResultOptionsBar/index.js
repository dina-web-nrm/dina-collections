import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Icon, Menu, Popup } from 'semantic-ui-react'

const propTypes = {
  isItemView: PropTypes.bool.isRequired,
  isTableView: PropTypes.bool.isRequired,
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
      isItemView,
      isTableView,
      onExportCsv: handleExportToCsv,
      onFormTabClick: handleFormTabClick,
      onSettingClick: handleSettingClick,
      onTableTabClick: handleTableTabClick,
    } = this.props

    return (
      <Menu attached="top" tabular>
        <Menu.Item
          active={isItemView}
          disabled={!handleFormTabClick}
          name="form"
          onClick={event => handleFormTabClick(event)}
        >
          <Icon name="wordpress forms" size="large" />
        </Menu.Item>
        <Menu.Item
          active={isTableView}
          disabled={!handleTableTabClick}
          name="table"
          onClick={event => handleTableTabClick(event)}
        >
          <Icon name="table" size="large" />
        </Menu.Item>
        <Menu.Menu position="right">
          {handleExportToCsv && (
            <Grid textAlign="center" verticalAlign="middle">
              <Grid.Column>
                <Popup
                  content={
                    <Button
                      content="Export result to CSV"
                      onClick={event => handleExportToCsv(event)}
                    />
                  }
                  on="click"
                  position="bottom right"
                  trigger={
                    <Icon
                      name="share"
                      size="large"
                      style={{ cursor: 'pointer' }}
                    />
                  }
                />
              </Grid.Column>
            </Grid>
          )}

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
