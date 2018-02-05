import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import {
  InformationSidebar,
  NavigationSidebar,
  ViewWrap,
} from 'coreModules/commonUi/components'
import { requireLoggedIn } from 'coreModules/user/higherOrderComponents'
import { ShortcutsDisplay } from 'coreModules/keyboardShortcuts/components'

import EditMammal from '../editMammal/Async'
import Home from '../home/Async'
import LookupMammals from '../lookupMammals/Async'
import PageNotFound from '../pageNotFound/Async'
import RegisterMammal from '../registerMammal/Async'
import Settings from '../settings/Async'

const NAVIGATION_SIDEBAR_ITEMS = [
  {
    exact: true,
    icon: 'home',
    name: 'home',
    path: '/app',
  },
  {
    exact: true,
    icon: 'plus',
    name: 'registerMammal',
    path: '/app/mammals/register',
  },
  {
    exact: true,
    icon: 'search',
    name: 'lookupMammals',
    path: '/app/mammals/lookup',
  },
  {
    exact: true,
    icon: 'setting',
    name: 'settings',
    path: '/app/settings',
    push: true,
  },
]

const propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
}

class App extends Component {
  render() {
    const { match } = this.props

    return (
      <div>
        <ViewWrap leftSidebarEnabled>
          <Switch>
            <Route component={Home} exact path={match.url} />
            <Route
              component={LookupMammals}
              exact
              path={`${match.url}/mammals/lookup`}
            />
            <Route
              component={RegisterMammal}
              exact
              path={`${match.url}/mammals/register`}
            />
            <Route
              component={EditMammal}
              path={`${match.url}/mammals/:catalogNumber/edit`}
            />
            <Route component={Settings} exact path={`${match.url}/settings`} />
            <Route component={PageNotFound} />
          </Switch>
        </ViewWrap>
        <NavigationSidebar navItems={NAVIGATION_SIDEBAR_ITEMS} />
        <InformationSidebar />
        <ShortcutsDisplay />
      </div>
    )
  }
}

App.propTypes = propTypes

export default requireLoggedIn(App)
