import rootConfig from 'config'
import 'common/dist/semantic.css' // eslint-disable-line
import 'react-rangeslider/lib/index.css'
import 'react-sortable-tree/style.css'
import 'react-json-inspector/json-inspector.css'
import 'github-markdown-css/github-markdown.css'
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

import { ErrorBoundary } from 'coreModules/error/components'
import { moduleOrder } from './viewModules'
import App from './viewModules/app/Async'
import DataViewer from './viewModules/dataViewer/Async'
import Docs from './viewModules/docs/Async'
import config from './config'
import modules from './initialModules'
import Public from './viewModules/public/Async'

const store = createStore({ config, modules, viewOrder: moduleOrder })

ReactDOM.render(
  <ReduxProvider store={store}>
    <ConnectedRouter history={config.routing}>
      <I18nProvider>
        <ErrorBoundary>
          <React.Fragment>
            <Switch>
              <Route component={DataViewer} path="/dataViewer" />
              <Route component={App} path="/app" />
              <Route component={Docs} path="/docs" />
              <Route component={Public} />
            </Switch>
            <NotificationDisplay displayType="fixed" />
          </React.Fragment>
        </ErrorBoundary>
      </I18nProvider>
    </ConnectedRouter>
  </ReduxProvider>,
  document.getElementById('root')
)

if (rootConfig.enableServiceWorker) {
  registerServiceWorker()
}

// expose store when run in Cypress
if (window.Cypress) {
  window.store = store
}
