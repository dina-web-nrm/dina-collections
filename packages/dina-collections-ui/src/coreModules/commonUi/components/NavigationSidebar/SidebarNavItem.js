import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

import { createModuleTranslate } from 'coreModules/i18n/components'

const ModuleTranslate = createModuleTranslate('commonUi')

const propTypes = {
  navItem: PropTypes.shape({
    exact: PropTypes.bool.isRequired,
    icon: PropTypes.string,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    push: PropTypes.bool,
  }).isRequired,
}

const SidebarNavItem = ({ navItem }) => {
  const { exact, icon, name, path, push, translate = true } = navItem
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
    </NavLink>
  )
}

SidebarNavItem.propTypes = propTypes

export default SidebarNavItem
