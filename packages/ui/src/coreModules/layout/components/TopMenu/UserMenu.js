import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Button, Divider, Grid, Header, Icon } from 'semantic-ui-react'

import { createModuleTranslate } from 'coreModules/i18n/components'
import userSelectors from 'coreModules/user/globalSelectors'

const ModuleTranslate = createModuleTranslate('commonUi')

const mapStateToProps = state => {
  return {
    username: userSelectors.getUsername(state),
  }
}

const propTypes = {
  onClick: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
}

const UserMenu = ({
  onLogout: handleLogout,
  onClick: handleClick,
  username,
}) => {
  return (
    <Grid padded textAlign="left" verticalAlign="middle">
      <Grid.Row>
        <Header>{username}</Header>
      </Grid.Row>
      <Divider style={{ margin: 0 }} />
      <Grid.Row>
        <Button
          icon
          labelPosition="left"
          onClick={event => {
            event.preventDefault()
            handleLogout()
            handleClick()
          }}
          size="large"
        >
          <Icon name="sign out" />
          <ModuleTranslate capitalize textKey="Navbar.logout" />
        </Button>
      </Grid.Row>
    </Grid>
  )
}

UserMenu.propTypes = propTypes

export default compose(connect(mapStateToProps))(UserMenu)

// <Grid.Row>
//   <Link onClick={handleClick} to="/app/settings">
//     <Button icon labelPosition="left" size="large">
//       <Icon name="setting" />
//       <ModuleTranslate capitalize textKey="routes.settings" />
//     </Button>
//   </Link>
// </Grid.Row>
