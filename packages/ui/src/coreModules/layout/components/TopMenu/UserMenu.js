import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Divider, Grid, Header, Icon } from 'semantic-ui-react'

import { createModuleTranslate } from 'coreModules/i18n/components'
import { logout as logoutAC } from 'coreModules/user/actionCreators'
import userSelectors from 'coreModules/user/globalSelectors'

const ModuleTranslate = createModuleTranslate('commonUi')

const mapStateToProps = state => {
  return {
    userName: userSelectors.getUserName(state),
  }
}
const mapDispatchToProps = { logout: logoutAC }

const propTypes = {
  logout: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
}

const UserMenu = ({ logout, onClick: handleClick, userName }) => {
  return (
    <Grid padded textAlign="left" verticalAlign="middle">
      <Grid.Row>
        <Header>{userName}</Header>
      </Grid.Row>
      <Divider style={{ margin: 0 }} />
      <Grid.Row>
        <Button
          icon
          labelPosition="left"
          onClick={event => {
            event.preventDefault()
            logout()
            handleClick()
          }}
          size="large"
        >
          <Icon name="sign out" />
          <ModuleTranslate capitalize textKey="Navbar.logout" />
        </Button>
      </Grid.Row>
      <Grid.Row>
        <Link onClick={handleClick} to="/app/settings">
          <Button icon labelPosition="left" size="large">
            <Icon name="setting" />
            <ModuleTranslate capitalize textKey="routes.settings" />
          </Button>
        </Link>
      </Grid.Row>
    </Grid>
  )
}

UserMenu.propTypes = propTypes

export default compose(connect(mapStateToProps, mapDispatchToProps))(UserMenu)
