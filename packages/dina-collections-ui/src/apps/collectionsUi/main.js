import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import 'whatwg-fetch'
import createStore from 'store/index'
import { I18nProvider } from 'coreModules/i18n/components'
import { NotificationDisplay } from 'coreModules/notifications/components'

import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { Provider as ReduxProvider } from 'react-redux'
import registerServiceWorker from 'registerServiceWorker'

import { moduleOrder } from './viewModules'
import App from './viewModules/app/Async'
import Docs from './viewModules/docs/Async'
import config from './config'
import modules from './initialModules'
import Public from './viewModules/public/Async'

const store = createStore({ config, modules, viewOrder: moduleOrder })

ReactDOM.render(
  <ReduxProvider store={store}>
    <ConnectedRouter history={config.routing}>
      <I18nProvider>
        <div>
          <Switch>
            <Route component={App} path="/app" />
            <Route component={Docs} path="/docs" />
            <Route component={Public} />
          </Switch>
          <NotificationDisplay displayType="fixed" />
        </div>
      </I18nProvider>
    </ConnectedRouter>
  </ReduxProvider>,
  document.getElementById('root')
)

if (process.env.REACT_APP_ENABLE_SERVICE_WORKER === 'true') {
  registerServiceWorker()
}
