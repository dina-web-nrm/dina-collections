import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Grid, Header, Icon, Menu, Popup } from 'semantic-ui-react'

import { KeyboardShortcuts } from 'coreModules/keyboardShortcuts/components'
import { injectActiveLocationDescription } from 'coreModules/routing/higherOrderComponents'
import { logout as logoutAC } from 'coreModules/user/actionCreators'
import UserMenu from './UserMenu'

const mapDispatchToProps = { logout: logoutAC }

const propTypes = {
  activeLocationSubtitle: PropTypes.string,
  activeLocationTitle: PropTypes.string,
  logout: PropTypes.func.isRequired,
  toggleLeftSidebar: PropTypes.func.isRequired,
}
const defaultProps = {
  activeLocationSubtitle: undefined,
  activeLocationTitle: undefined,
}

class TopMenu extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { isOpen: false }
    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleOpen() {
    this.setState({ isOpen: true })
  }

  handleClose() {
    this.setState({ isOpen: false })
  }

  handleLogout() {
    this.props.logout()
  }

  render() {
    const {
      activeLocationSubtitle,
      activeLocationTitle,
      toggleLeftSidebar,
    } = this.props
    return (
      <React.Fragment>
        <KeyboardShortcuts
          shortcuts={[
            {
              command: 'l o',
              description: 'Log out',
              onPress: this.handleLogout,
            },
          ]}
        />
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
          <Popup
            basic
            content={
              <UserMenu
                onClick={this.handleClose}
                onLogout={this.handleLogout}
              />
            }
            on="click"
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            open={this.state.isOpen}
            position="bottom right"
            trigger={
              <Menu.Item position="right" style={{ cursor: 'pointer' }}>
                <Icon name="user" size="large" />
              </Menu.Item>
            }
          />
        </Menu>
      </React.Fragment>
    )
  }
}

TopMenu.propTypes = propTypes
TopMenu.defaultProps = defaultProps

export default compose(
  connect(
    undefined,
    mapDispatchToProps
  ),
  injectActiveLocationDescription
)(TopMenu)
