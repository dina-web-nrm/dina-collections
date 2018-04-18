import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import { Footer } from 'coreModules/commonUi/components'
import { ViewWrap } from 'coreModules/layout/components'
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
