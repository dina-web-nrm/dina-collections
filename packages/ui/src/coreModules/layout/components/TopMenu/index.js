import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Grid, Header, Icon, Menu } from 'semantic-ui-react'

import { injectActiveLocationDescription } from 'coreModules/routing/higherOrderComponents'

const propTypes = {
  activeLocationSubtitle: PropTypes.string,
  activeLocationTitle: PropTypes.string,
  toggleLeftSidebar: PropTypes.func.isRequired,
}
const defaultProps = {
  activeLocationSubtitle: undefined,
  activeLocationTitle: undefined,
}

const TopMenu = ({
  activeLocationSubtitle,
  activeLocationTitle,
  toggleLeftSidebar,
}) => {
  return (
    <Menu inverted style={{ borderRadius: 0, margin: 0 }}>
      <Menu.Item onClick={toggleLeftSidebar}>
        <Icon name="sidebar" size="large" />
      </Menu.Item>
      {activeLocationTitle && (
        <Grid padded textAlign="center" verticalAlign="middle">
          <Grid.Column>
            <Header inverted>
              {activeLocationTitle}
              {activeLocationSubtitle && ' '}
              {activeLocationSubtitle && activeLocationSubtitle}
            </Header>
          </Grid.Column>
        </Grid>
      )}
    </Menu>
  )
}

TopMenu.propTypes = propTypes
TopMenu.defaultProps = defaultProps

export default compose(injectActiveLocationDescription)(TopMenu)
