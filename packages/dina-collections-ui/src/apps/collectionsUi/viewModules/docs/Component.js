import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route, Switch } from 'react-router-dom'

import { Footer, ViewWrap } from 'coreModules/commonUi/components'
import PageTemplate from 'coreModules/commonUi/components/PageTemplate'
import GeneralDocs from 'coreModules/documentation/components/GeneralDocs'
import DataModel from 'coreModules/documentation/components/DataModel'
import Nav from 'coreModules/documentation/components/Nav'
import VersionOverview from 'coreModules/documentation/components/VersionOverview'
import getCurrentSchemaVersion from 'coreModules/documentation/utilities/getCurrentSchemaVersion'

const propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
}

class Docs extends Component {
  render() {
    const { match } = this.props
    const currentVersion = getCurrentSchemaVersion()
    return (
      <div>
        <ViewWrap leftSidebarEnabled leftSidebarWidth={180}>
          <PageTemplate hasFixedMenu>
            <Switch>
              <Redirect
                exact
                from={match.url}
                to={`${match.url}/${currentVersion}/general`}
              />

              <Route
                component={VersionOverview}
                exact
                path={`${match.url}/:schemaVersion`}
              />
              <Route component={GeneralDocs} exact path={`${match.url}`} />
              <Route
                component={GeneralDocs}
                exact
                path={`${match.url}/:schemaVersion/:docName`}
              />
              <Route
                component={DataModel}
                exact
                path={`${
                  match.url
                }/:schemaVersion/models/:modelId/:parameterId`}
              />
              <Route
                component={DataModel}
                path={`${match.url}/:schemaVersion/models/:modelId`}
              />
            </Switch>
          </PageTemplate>
          <Footer />
        </ViewWrap>
        <Route component={Nav} path={`${match.url}/:schemaVersion`} />
      </div>
    )
  }
}

Docs.propTypes = propTypes

export default Docs
