import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Route, Switch } from 'react-router-dom'

import { requireLoggedIn } from 'coreModules/user/higherOrderComponents'

import PageNotFound from '../pageNotFound/Async'

import SourceData from '../sourceData/Async'

const propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
}

class dataViewer extends Component {
  render() {
    const { match } = this.props

    return (
      <React.Fragment>
        <Switch>
          <Route
            component={SourceData}
            exact
            path={`${match.url}/sourceData/:sourceDataId`}
          />

          <Route component={PageNotFound} />
        </Switch>
      </React.Fragment>
    )
  }
}

dataViewer.propTypes = propTypes

export default compose(requireLoggedIn)(dataViewer)
