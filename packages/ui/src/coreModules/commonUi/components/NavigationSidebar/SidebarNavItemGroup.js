import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Menu, Icon } from 'semantic-ui-react'

import { createModuleTranslate } from 'coreModules/i18n/components'

import SidebarNavItem from './SidebarNavItem'

const ModuleTranslate = createModuleTranslate('commonUi')

const propTypes = {
  navGroupItem: PropTypes.shape({
    exact: PropTypes.bool,
    icon: PropTypes.string,
    items: PropTypes.array,
    name: PropTypes.string.isRequired,
    path: PropTypes.string,
    push: PropTypes.bool,
    translate: PropTypes.bool,
  }).isRequired,
}

const SidebarNavItemGroup = ({ navGroupItem }) => {
  const {
    exact,
    icon,
    items,
    name,
    path,
    push,
    translate = true,
  } = navGroupItem
  if (path) {
    return (
      <NavLink
        activeClassName="active"
        className={push ? 'item push bottom' : 'item'}
        exact={exact}
        key={path}
        to={path}
      >
        {icon && <Icon name={icon} size="large" />}
        {translate ? (
          <ModuleTranslate capitalize textKey={`routes.${name}`} />
        ) : (
          name
        )}
        <Menu.Menu>
          {items.map(navItem => {
            return <SidebarNavItem key={navItem.name} navItem={navItem} />
          })}
        </Menu.Menu>
      </NavLink>
    )
  }

  return (
    <Menu.Item
      className={push ? 'push bottom' : 'item'}
      exact={exact}
      key={name}
    >
      {icon && <Icon name={icon} size="large" />}
      {translate ? (
        <ModuleTranslate capitalize textKey={`routes.${name}`} />
      ) : (
        name
      )}
      <Menu.Menu>
        {items.map(navItem => {
          return <SidebarNavItem navItem={navItem} />
        })}
      </Menu.Menu>
    </Menu.Item>
  )
}

SidebarNavItemGroup.propTypes = propTypes

export default SidebarNavItemGroup
