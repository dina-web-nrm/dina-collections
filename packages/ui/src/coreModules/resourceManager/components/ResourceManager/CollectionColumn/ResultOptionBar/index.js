import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon, Menu } from 'semantic-ui-react'

const propTypes = {
  onListTabClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  onTreeTabClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  tableActive: PropTypes.bool.isRequired,
  treeActive: PropTypes.bool.isRequired,
  treeEnabled: PropTypes.bool.isRequired,
}

export class ResultOptionsBar extends Component {
  render() {
    const {
      onListTabClick: handleListTabClick,
      onTreeTabClick: handleTreeTabClick,
      tableActive,
      treeActive,
      treeEnabled,
    } = this.props

    return (
      <Menu attached="top" tabular>
        {treeEnabled && (
          <Menu.Item
            active={treeActive}
            disabled={!handleTreeTabClick}
            name="form"
            onClick={event => handleTreeTabClick(event)}
          >
            <Icon name="sitemap" size="large" />
          </Menu.Item>
        )}

        <Menu.Item
          active={tableActive}
          disabled={!handleListTabClick}
          name="table"
          onClick={event => handleListTabClick(event)}
        >
          <Icon name="table" size="large" />
        </Menu.Item>
      </Menu>
    )
  }
}

ResultOptionsBar.propTypes = propTypes

export default ResultOptionsBar
