import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Icon, Menu, Popup } from 'semantic-ui-react'

const propTypes = {
  mainColumnActiveTab: PropTypes.string.isRequired,
  onExportCsv: PropTypes.func.isRequired,
  onSettingClick: PropTypes.func.isRequired,
  onTabClick: PropTypes.func.isRequired,
}

export class ResultOptionsBar extends Component {
  render() {
    const {
      mainColumnActiveTab: activeItem,
      onExportCsv: handleExportToCsv,
      onTabClick: handleTabClick,
      onSettingClick: handleSettingClick,
    } = this.props

    return (
      <Menu attached="top" tabular>
        <Menu.Item
          active={activeItem === 'newRecord'}
          name="form"
          onClick={event => handleTabClick(event, 'newRecord')}
        >
          <Icon name="wordpress forms" size="large" />
        </Menu.Item>
        <Menu.Item
          active={activeItem === 'table'}
          name="table"
          onClick={event => handleTabClick(event, 'table')}
        >
          <Icon name="table" size="large" />
        </Menu.Item>
        <Menu.Menu position="right">
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
                trigger={<Icon name="share" size="large" />}
              />
            </Grid.Column>
          </Grid>

          <Menu.Item>
            <Icon
              name="setting"
              onClick={event => handleSettingClick(event)}
              size="large"
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

ResultOptionsBar.propTypes = propTypes

export default ResultOptionsBar
