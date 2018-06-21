import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Route, Switch, withRouter } from 'react-router-dom'

import {
  InformationSidebar,
  NavigationSidebar,
  ViewWrap,
} from 'coreModules/layout/components'
import { requireLoggedIn } from 'coreModules/user/higherOrderComponents'
import { ShortcutsDisplay } from 'coreModules/keyboardShortcuts/components'
import { createModuleTranslate } from 'coreModules/i18n/components'

import EditMammal from '../editMammal/Async'
import Home from '../home/Async'
import SpecimensMammals from '../specimensMammals/Async'
import LookupMammals from '../lookupMammals/Async'
import PageNotFound from '../pageNotFound/Async'
import RegisterMammal from '../registerMammal/Async'
import Settings from '../settings/Async'
import ManageAgents from '../manageAgents/Async'
import ManageLocalities from '../manageLocalities/Async'
import ManageStorageLocations from '../manageStorageLocations/Async'
import ManageTaxonomy from '../manageTaxonomy/Async'

const ModuleTranslate = createModuleTranslate('commonUi', { scope: 'routes' })

const NAVIGATION_SIDEBAR_ITEMS = [
  {
    exact: true,
    name: 'start',
    path: '/app',
  },
  {
    exact: true,
    name: 'specimens',
    path: '/app/specimens/mammals',
  },
  {
    exact: false,
    name: 'agents',
    path: '/app/agents',
  },
  {
    exact: false,
    name: 'localities',
    path: '/app/localities',
  },
  {
    exact: false,
    name: 'storage',
    path: '/app/storageLocations',
  },
  {
    exact: false,
    name: 'taxon',
    path: '/app/taxa',
  },
  {
    exact: false,
    name: 'scientificNames',
    path: '/app/taxonNames',
  },
  {
    exact: true,
    name: 'registerMammal',
    path: '/app/mammals/register',
  },
  {
    exact: true,
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

const getActiveLocation = (path = '') => {
  const exactMatch = NAVIGATION_SIDEBAR_ITEMS.find(item => {
    return path === item.path
  })

  if (exactMatch) {
    return exactMatch.name
  }

  return NAVIGATION_SIDEBAR_ITEMS.reduce((bestMatch, item) => {
    if (path.startsWith(item.path)) {
      return item.name
    }
    return bestMatch
  }, undefined)
}

const getActiveLocationContext = (path = '') => {
  if (path.includes('/specimens/mammals')) {
    return 'mammals'
  }
  return undefined
}

const propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
}

class App extends Component {
  render() {
    const { location, match } = this.props

    const activeLocationTextKey = getActiveLocation(location.pathname)
    const activeLocationContextTextKey = getActiveLocationContext(
      location.pathname
    )

    return (
      <React.Fragment>
        <ViewWrap
          activeLocation={
            activeLocationTextKey && (
              <ModuleTranslate
                capitalize
                fallback={activeLocationTextKey}
                textKey={activeLocationTextKey}
              />
            )
          }
          activeLocationContext={
            activeLocationContextTextKey && (
              <ModuleTranslate
                capitalize
                fallback={activeLocationContextTextKey}
                textKey={activeLocationContextTextKey}
              />
            )
          }
          leftSidebarEnabled
          leftSidebarTogglable
        >
          <Switch>
            <Route component={Home} exact path={match.url} />
            <Route
              component={SpecimensMammals}
              exact
              path={`${match.url}/specimens/mammals`}
            />
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
              path={`${match.url}/mammals/:specimenId/edit`}
            />
            <Route
              component={ManageAgents}
              exact
              path={`${match.url}/agents`}
            />
            <Route
              component={ManageAgents}
              path={`${match.url}/agents/create`}
            />
            <Route
              component={ManageAgents}
              path={`${match.url}/agents/:agentId/edit`}
            />
            <Route
              component={ManageAgents}
              path={`${match.url}/agents/:agentId/inspect`}
            />
            <Route
              component={ManageLocalities}
              exact
              path={`${match.url}/localities`}
            />
            <Route
              component={ManageLocalities}
              path={`${match.url}/localities/create`}
            />
            <Route
              component={ManageLocalities}
              path={`${match.url}/localities/:localityId/createChild`}
            />
            <Route
              component={ManageLocalities}
              path={`${match.url}/localities/:localityId/edit`}
            />
            <Route
              component={ManageLocalities}
              path={`${match.url}/localities/:localityId/inspect`}
            />
            <Route
              component={ManageStorageLocations}
              exact
              path={`${match.url}/storageLocations`}
            />
            <Route
              component={ManageStorageLocations}
              path={`${match.url}/storageLocations/create`}
            />
            <Route
              component={ManageStorageLocations}
              path={`${
                match.url
              }/storageLocations/:storageLocationId/createChild`}
            />
            <Route
              component={ManageStorageLocations}
              path={`${match.url}/storageLocations/:storageLocationId/edit`}
            />
            <Route
              component={ManageStorageLocations}
              path={`${match.url}/storageLocations/:storageLocationId/inspect`}
            />
            <Route
              component={ManageTaxonomy}
              exact
              path={`${match.url}/taxa`}
            />
            <Route
              component={ManageTaxonomy}
              path={`${match.url}/taxa/create`}
            />
            <Route
              component={ManageTaxonomy}
              path={`${match.url}/taxa/:taxonId/createChild`}
            />
            <Route
              component={ManageTaxonomy}
              path={`${match.url}/taxa/:taxonId/edit`}
            />
            <Route
              component={ManageTaxonomy}
              path={`${match.url}/taxa/:taxonId/inspect`}
            />
            <Route
              component={ManageTaxonomy}
              exact
              path={`${match.url}/taxonNames`}
            />
            <Route
              component={ManageTaxonomy}
              path={`${match.url}/taxonNames/create`}
            />
            <Route
              component={ManageTaxonomy}
              path={`${match.url}/taxonNames/:taxonNameId/createChild`}
            />
            <Route
              component={ManageTaxonomy}
              path={`${match.url}/taxonNames/:taxonNameId/edit`}
            />
            <Route
              component={ManageTaxonomy}
              path={`${match.url}/taxonNames/:taxonNameId/inspect`}
            />
            <Route component={Settings} exact path={`${match.url}/settings`} />
            <Route component={PageNotFound} />
          </Switch>
        </ViewWrap>
        <NavigationSidebar navItems={NAVIGATION_SIDEBAR_ITEMS} />
        <InformationSidebar />
        <ShortcutsDisplay />
      </React.Fragment>
    )
  }
}

App.propTypes = propTypes

export default compose(withRouter, requireLoggedIn)(App)
