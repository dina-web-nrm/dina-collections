---
id: index
title: Overview
sidebar_label: Overview
---

The ui package contains the code necessary for running the UI. As described in the
[Setup](../../setup/setup-locally-for-development) section, it can be run
directly through Node or through Docker. When running the development server
`yarn start`, it automatically recompiles the code and reloads the browser on
changes to the code. For production, the UI is built (`yarn build`) into static
files and an index.html which is served by nginx in the Docker container.

This package is based on
[Create React App](https://facebook.github.io/create-react-app/), so their
documentation is the go-to place for most things that are not application code.

## Main dependencies

The main dependencies for the UI package are:

- [react](https://github.com/facebook/react): Library to build interactive,
  component-based UIs
- [react-router-dom](https://github.com/ReactTraining/react-router): Routing
- [react-scripts](https://github.com/facebook/create-react-app): Build
  configuration and tooling
- [redux](https://github.com/reduxjs/redux): Centralised state management
- [redux-form](https://redux-form.com): Form framework
- [semantic-ui-react](https://github.com/Semantic-Org/Semantic-UI-React): UI
  components

As always, refer to `package.json` and `yarn.lock` for all dependencies and the
exact versions used.

## Architecture

The package has been structured to support building several **apps** with a high
degree of shared code. Most of the frontend code is organised in modules of
different kinds:

- **coreModules:** Code that is expected to be used by most apps and is not
  related to a specific type of data resource, e.g. to API communication, error
  handling, forms, layout, internationalisation, search and user management.
- **serviceModules:** Components related to interacting with data of the kind
  that the corresponding backend service (API) is handling, e.g. agent,
  specimen, storage
- **viewModules:** Specification of component and modules to be loaded for a
  given route or routes. A viewModule can contain subroutes that specify other
  viewModules.

When a route is visited the specified `view` (normally the index-file of the
viewModule) and `modules` will be dynamically imported. Any Redux reducer or
middleware will also be registered when the module is loaded and unregistered
when it is unloaded (i.e. when the user moves to a route that does not specify a
loaded module). The dynamic import serves two purposes: to enable code-splitting
so that the first load of the application is not unnecessarily heavy, and to
minimize the amount of functions that state update events (called actions) have
to pass through at any given time, so that the UI is not unnecessarily slow to
update.

Since some modules will always, or almost always, be needed, an app can define
[`initialModules`](https://github.com/dina-web-nrm/dina-collections/tree/master/packages/ui/src/apps/collectionsUi/initialModules.js)
that will always be included in the initial load for any route.

An app is essentially a nested list of routes with corresponding `viewModules`.
Each app is defined in `src/apps` and must render the React UI to an element in
the
[`index.html`](https://github.com/dina-web-nrm/dina-collections/tree/master/packages/ui/public/index.html).

## `apps`

Currently there is only one app, called `collectionsUi`. The rendering of
`collectionsUi` is done in its
[`main.js`](https://github.com/dina-web-nrm/dina-collections/tree/master/packages/ui/src/apps/collectionsUi/main.js),
where the top-level routes are defined:

```jsx
import App from './viewModules/app/Async'
import DataViewer from './viewModules/dataViewer/Async'
import Docs from './viewModules/docs/Async'
import Public from './viewModules/public/Async'
// ...
ReactDOM.render(
  <ReduxProvider store={store}>
    <ConnectedRouter history={config.routing}>
      <I18nProvider>
        <ErrorBoundary>
          <React.Fragment>
            <Switch>
              <Route component={DataViewer} path="/dataViewer" />
              <Route component={App} path="/app" />
              <Route component={Docs} path="/dataModelDocs" />
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
```

Each `<Route>` gets the `Async` export of a viewModule as its `component`. These
viewModules can then specify further nested routes, as for example `App` does.

> NOTE: In the future when there are several apps, the code in `src/index.js`
> would need to contain logic to decide which interface to render, e.g. by
> looking at an environment variable.

## `coreModules`

A coreModule can have the following
[exports](https://github.com/dina-web-nrm/dina-collections/tree/master/packages/ui/src/test/testModules/moduleSchema.json).
Currently we have the following coreModules.

| Name              | Description                                                                                                                                                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| api               | Initializes an API-client and makes it available to Redux actions through a middleware.                                                                                                                                  |
| bootstrap         | Supports dynamically loading components and registering modules.                                                                                                                                                         |
| commonUi          | Contains shared, custom UI components which do not belong naturally in another coreModule.                                                                                                                               |
| crud              | Abstracts the creation of Redux boilerplate (action creators, reducers, selectors) for doing CRUD for each resource specified in a config. Also contains various higher order components to simplify data fetching.      |
| devToolsExtension | Exports the Redux devToolsExtension enhancer.                                                                                                                                                                            |
| documentation     | Contains components for the data model documentation.                                                                                                                                                                    |
| error             | Checks for errors among Redux actions and creates error notifications. Also contains components to display errors in different contexts.                                                                                 |
| form              | Provides components used to build form fields and an abstraction layer (including the building blocks `Form`, `Section`, `Unit` and `parts`) to generate a form from a specification. Tightly coupled with `redux-form`. |
| formSupport       | Supports our form-building abstraction. Separated from the form module partly because the `redux-form` reducer expects to be mounted on `form`.                                                                          |
| i18n              | Makes translations specified in either JSON or markdown available throughout the application.                                                                                                                            |
| keyboardShortcuts | Enables binding and unbinding keyboard shortcuts in different views and layers.                                                                                                                                          |
| layout            | Handles changing between layouts and contains layout components.                                                                                                                                                         |
| localStorage      | Exports a middleware for working with local storage.                                                                                                                                                                     |
| logger            | Exports the `redux-logger` middleware.                                                                                                                                                                                   |
| notifications     | Handles creation, prioritisation and removal of notifications and contains notification components.                                                                                                                      |
| resourceManager   | Contains a shared UI to manage data of a certain resource, e.g. providing a table view with filters and a form view to create, edit or remove data.                                                                      |
| routing           | Exports routing middleware and reducer (TODO: Get rid of `react-router-redux` dependency) and route-dependent higher order components.                                                                                   |
| search            | Provides components and utilities used to build UI for searching based on `elasticsearch`.                                                                                                                               |
| size              | Tracks window size and the current breakpoint for the UI responsive grid.                                                                                                                                                |
| user              | Handles user log in/out and fetching of user information and preferences.                                                                                                                                                |

Some of the modules have additional documentation below.

## `serviceModules`

A serviceModule can have the following
[exports](https://github.com/dina-web-nrm/dina-collections/tree/master/packages/ui/src/test/testModules/moduleSchema.json).
Currently we have the following serviceModules.

| Name        | Related resources                                                                                                             |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------- |
| agent       | agent                                                                                                                         |
| curatedList | causeOfDeathType, customTaxonNameType, establishmentMeansType, featureType, identifierType, preparationType, typeSpecimenType |
| locality    | place                                                                                                                         |
| specimen    | specimen                                                                                                                      |
| storage     | physicalObject, storageLocation                                                                                               |
| taxon       | taxon, taxonName                                                                                                              |

## `viewModules`

A viewModule can have the following
[exports](https://github.com/dina-web-nrm/dina-collections/tree/master/packages/ui/src/test/testModules/viewModuleSchema.json).

The current viewModules in collectionsUi are:

```txt
├── app (route: /app)
│   ├── manageAgents
│   ├── manageLocalities
│   ├── manageStorageLocations
│   ├── manageTaxonNames
│   ├── manageTaxonomy
│   ├── specimensMammals
│   ├── settings
│   ├── start
├── dataViewer (route: /dataViewer)
│   ├──sourceData
│   └──pageNotFound
├── docs (route: /dataModelDocs)
├── public (route: /)
│   ├── login
│   ├── home
│   └── pageNotFound
```

## `cypress`

The `cypress` folder contains the end-to-end tests and configuration. More
information about e2e-testing is available [here](#e2e).

## `build`, `public`, `setupProxy`, `setupTests` and more

Since the UI is based on
[Create React App](https://facebook.github.io/create-react-app/), those parts,
and more, are based on the configuration and constraints it provides.

`build` contains the production build of the ui, i.e. the minified static files
that are served by the web server. `public` contains the `index.html` and other
static assets and manifest. `setupProxy` and `setupTests` are configuration
files for development proxy and test runner, as described in their
documentation.
