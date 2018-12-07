import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Route, Switch } from 'react-router-dom'

import { AppNavigationSidebar, ViewWrap } from 'coreModules/layout/components'
import { requireLoggedIn } from 'coreModules/user/higherOrderComponents'
import {
  KeyboardShortcuts,
  ShortcutsDisplay,
} from 'coreModules/keyboardShortcuts/components'

import Start from '../start/Async'
import SpecimensMammals from '../specimensMammals/Async'
import PageNotFound from '../pageNotFound/Async'
import Settings from '../settings/Async'
import ManageAgents from '../manageAgents/Async'
import ManageLocalities from '../manageLocalities/Async'
import ManageStorageLocations from '../manageStorageLocations/Async'
import ManageTaxonomy from '../manageTaxonomy/Async'
import ManageTaxonNames from '../manageTaxonNames/Async'
import SourceData from '../sourceData/Async'

const propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
}

class App extends Component {
  constructor(props) {
    super(props)
    this.shortcuts = [
      {
        command: 'n h',
        description: 'Navigate to home',
        params: { path: '/app' },
        type: 'push',
      },
      {
        command: 'n s',
        description: 'Navigate to specimens',
        params: { path: '/app/specimens/mammals' },
        type: 'push',
      },
    ]
  }

  render() {
    const { match } = this.props

    return (
      <React.Fragment>
        <KeyboardShortcuts shortcuts={this.shortcuts} />
        <ViewWrap leftSidebarEnabled leftSidebarTogglable topMenuEnabled>
          <Switch>
            <Route component={Start} exact path={match.url} />
            <Route
              component={SpecimensMammals}
              exact
              path={`${match.url}/specimens/mammals`}
            />
            <Route
              component={SpecimensMammals}
              exact
              path={`${match.url}/specimens/mammals/create/sections/:sectionId`}
            />
            <Route
              component={SpecimensMammals}
              exact
              path={`${
                match.url
              }/specimens/mammals/:specimenId/edit/sections/:sectionId`}
            />
            <Route
              component={SpecimensMammals}
              exact
              path={`${match.url}/specimens/mammals/search`}
            />
            <Route
              component={SpecimensMammals}
              exact
              path={`${match.url}/specimens/mammals/search/settings`}
            />
            <Route
              component={ManageAgents}
              exact
              path={`${match.url}/agents`}
            />
            <Route
              component={ManageLocalities}
              exact
              path={`${match.url}/localities`}
            />
            <Route
              component={ManageStorageLocations}
              exact
              path={`${match.url}/storageLocations`}
            />
            <Route
              component={ManageTaxonomy}
              exact
              path={`${match.url}/taxa`}
            />
            <Route
              component={ManageTaxonNames}
              exact
              path={`${match.url}/taxonNames`}
            />

            <Route
              component={SourceData}
              exact
              path={`${match.url}/sourceData/:sourceDataId`}
            />

            <Route component={Settings} exact path={`${match.url}/settings`} />
            <Route component={PageNotFound} />
          </Switch>
        </ViewWrap>
        <AppNavigationSidebar />
        <ShortcutsDisplay />
      </React.Fragment>
    )
  }
}

App.propTypes = propTypes

export default compose(requireLoggedIn)(App)
