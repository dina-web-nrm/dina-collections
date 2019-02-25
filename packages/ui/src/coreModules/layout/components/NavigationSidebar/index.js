import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { Sidebar, Icon, Menu } from 'semantic-ui-react'
import logoutActionCreator from 'coreModules/user/actionCreators/logout'
import { createModuleTranslate } from 'coreModules/i18n/components'

import SidebarNavItem from './SidebarNavItem'
import SidebarNavItemGroup from './SidebarNavItemGroup'

const ModuleTranslate = createModuleTranslate('commonUi')

const mapDispatchToProps = {
  logout: logoutActionCreator,
}

const propTypes = {
  displayHome: PropTypes.bool,
  displayLogout: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  navigationItems: PropTypes.arrayOf(
    PropTypes.shape({
      exact: PropTypes.bool,
      icon: PropTypes.string,
      name: PropTypes.string.isRequired,
      path: PropTypes.string,
      push: PropTypes.bool,
    })
  ),
  nested: PropTypes.bool,
  width: PropTypes.number,
}

const defaultProps = {
  displayHome: false,
  displayLogout: false,
  navigationItems: [],
  nested: false,
  width: 100,
}

export const NavigationSidebar = ({
  displayHome,
  displayLogout,
  nested,
  logout,
  navigationItems,
  width,
}) => {
  return (
    <Sidebar
      animation="overlay"
      as={Menu}
      borderless={nested}
      className="flex"
      icon={nested ? undefined : 'labeled'}
      inverted
      size="large"
      style={{ overflow: 'hidden', width }}
      vertical
      visible
    >
      {navigationItems.map(navItem => {
        if (navItem.items) {
          return (
            <SidebarNavItemGroup key={navItem.name} navGroupItem={navItem} />
          )
        }

        return <SidebarNavItem key={navItem.name} navItem={navItem} />
      })}
      {displayHome && (
        <NavLink
          activeClassName="active"
          className="item push bottom"
          exact
          key="/"
          to="/"
        >
          <Icon name="reply" />
          <ModuleTranslate capitalize textKey="routes.start" />
        </NavLink>
      )}
      {displayLogout && (
        <Menu.Item
          onClick={event => {
            event.preventDefault()
            logout()
          }}
        >
          <Icon name="sign out" />
          <ModuleTranslate capitalize textKey="Navbar.logout" />
        </Menu.Item>
      )}
    </Sidebar>
  )
}

NavigationSidebar.propTypes = propTypes
NavigationSidebar.defaultProps = defaultProps

export default compose(
  withRouter,
  connect(
    undefined,
    mapDispatchToProps
  )
)(NavigationSidebar)
