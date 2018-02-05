import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import { Footer, ViewWrap } from 'coreModules/commonUi/components'
import Login from '../login/Async'
import PageNotFound from '../pageNotFound/Async'
import Start from '../start/Async'

class Public extends Component {
  render() {
    return (
      <div>
        <ViewWrap>
          <Switch>
            <Route component={Login} exact path="/login" />
            <Route component={Start} exact path="/" />
            <Route component={PageNotFound} />
          </Switch>
          <Footer />
        </ViewWrap>
      </div>
    )
  }
}

export default Public
