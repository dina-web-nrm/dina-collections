---
id: resourceManager
title: Resource manager
sidebar_label: Resource manager
---

The resourceManager is a coreModule used to create user interfaces for managing
specific kinds of resources, e.g. specimens, storage locations or taxa. It
abstracts features that are shared between those interfaces, such as layout,
navigation, data fetching, filtering and form submission, in order to make it
easy to add new managers and simplify maintenance and new feature development.

## Background

These abstractions evolved after starting with building a specific interface for
specimens, after which the first version of the resourceManager was introduced
to share code between the other managers (agents, geography, storage, taxa,
scientific names). Although the specimen manager and the other resource managers
had some differing requirements, e.g. the specimens were indexed in
elasticsearch while the other resources were not and some resources have a
hierarchical structure that could be represented as a tree, which is not
relevant for specimens, it still became apparent that having them separated lead
to a lot of duplicated development and increased maintenance. Therefore the
resourceManager was refactored to accommodate the needs for all current
resources, as well as improving the structure and readability of the code.

## Usage

To create a new resource manager, import the `ResourceManager` component from
[components/ResourceManager](https://github.com/DINA-Web/dina-collections/tree/master/packages/ui/src/coreModules/resourceManager/components/ResourceManager/index.js)
and pass in the props you need to configure it as required. The configuration
props are listed in the
[resourceManagerConfig](https://github.com/DINA-Web/dina-collections/tree/master/packages/ui/src/coreModules/resourceManager/components/ResourceManager/shared/contexts/resourceManagerConfig.js)
context, and in the
[createResourceManagerWrapper](https://github.com/DINA-Web/dina-collections/tree/master/packages/ui/src/coreModules/resourceManager/components/ResourceManager/shared/higherOrderComponents/createResourceManagerWrapper.js),
you can see which default values are used for the configuration props that are
optional. For example it is required to provide a specification of the table
columns and the render methods for the different forms (create, edit, filter).

Then, if you want to use it in a viewModule, you will want to use the query
params in the URL for navigation, so export a version of the ResourceManager
that is enhanced by the
[createQueryState](https://github.com/DINA-Web/dina-collections/tree/master/packages/ui/src/coreModules/resourceManager/higherOrderComponents/createQueryState.js)
and
[createNavigationState](https://github.com/DINA-Web/dina-collections/tree/master/packages/ui/src/coreModules/resourceManager/higherOrderComponents/createNavigationState.js)
higher order components.

If you want to be able to use it in a picker, you need to use a local state for
navigation (since it opens in a modal and should not navigate away from the
underlying view), so export a version that uses
[createLocalState](https://github.com/DINA-Web/dina-collections/tree/master/packages/ui/src/coreModules/resourceManager/higherOrderComponents/createLocalState.js)
instead of createQueryState.

### Example

Inspect the
[LocalityManager](https://github.com/DINA-Web/dina-collections/tree/master/packages/ui/src/serviceModules/locality/components/LocalityManager)
folder for an example of how to use the resourceManager abstractions.

| File/folder                  | Description                                                                                                    |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Base.js                      | Base LocalityManager configured by passing in props                                                            |
| Query.js                     | Enhanced LocalityManager with query state navigation                                                           |
| Local.js                     | Enhanced LocalityManager with local state navigation                                                           |
| ItemTitle.js                 | Component for how to render each item in the tree view (when the DefaultItemTitle is not appropriate)          |
| tableColumnSpecifications.js | Specification of the table column headers, widths and the path to the value that should be shown for each item |
| item                         | Form components used to create and edit places                                                                 |
| filter                       | Form component and function for building filter query from form values                                         |

In the viewModule
[manageLocalities](https://github.com/DINA-Web/dina-collections/tree/master/packages/ui/src/apps/collectionsUi/viewModules/manageLocalities/Component.js)
you can see how the query-based LocalityManager is used and in
[LocalityDropdownPickerSearch](https://github.com/DINA-Web/dina-collections/tree/master/packages/ui/src/serviceModules/locality/components/LocalityDropdownPickerSearch/index.js)
you can see an example of creating a picker the local state-based
LocalityManager.

## Structure

The
[index-file in components/ResourceManager](https://github.com/DINA-Web/dina-collections/tree/master/packages/ui/src/coreModules/resourceManager/components/ResourceManager/index.js)
is the top-level component and it renders the RowLayout. The top and bottom rows
are only rendered if it is a [picker](#picker), whereas the middle row always
renders the [MainColumn](#columns), which in its turn renders different content
depending on the navigation state. The middle row can also render the
[FilterColumn](#columns) and a sidebar for showing contextual help texts.

The ResourceManager component is enhanced by the
[createResourceManagerWrapper](#higherOrderComponents) HOC, which is where the
configuration props are received and validated with PropTypes. Some props are
optional and some of them are assigned default values in the HOC. The
configuration props are then passed into the ResourceManagerConfigProvider,
which makes them available through [context](#contexts) to any child component
that consumes them.

The main views of the ResourceManager are:

- **Table:** Used to filter records and get an overview of the data in those
  records
- **Tree:** Used to get a hierarchical view of tree-like data
- **Create:** Used to register new records
- **Edit:** Used to edit existing records

The code in the ResourceManager folder is divided into folders, listed below,
that may contain components and other functions. The [table](#table) and
[tree](#tree) have their own folders, while create and edit are both in the
[form](#form) folder.

### columns

The columns folder contains the MainColumn and FilterColumn. They each render a
RowLayout with a table, tree, form or settings row with dynamic height,
accompanied by different fixed-height rows/bars for navigation, actions and
options.

### form

The form folder contains the components CreateItemColumn, EditItemColumn and
ActionBar. The ItemColumn components render a RowLayout with an ActionBar
configured by props. Each ItemColumn component is enhanced with a corresponding
HOC that defines and passes on the handlers needed for the ActionBar.

### picker

The picker folder contains the PickerActionBar and PickerHeader, which wrap
around the ResourceManager in the picker. They currently get their props
directly from the ResourceManager index-file.

### shared

The shared folder contains code that may be used in other folders in the
ResourceManager.

#### components

Contains RecordNavigationBar and ResultOptionsBar base components. The
RecordNavigationBar is enhanced with different props in the table and tree, so
the MainColumn renders a different version of it depending on the current view.
The ResultOptionsBar is currently the same for all views, except if it is a
picker or not, so it is imported and configured directly in the MainColumn.

#### contexts

Each [context](https://reactjs.org/docs/context.html) exports a provider
component and a hook to consume the context value. This hook checks that the
context exists so that it cannot be used by mistake outside of a provider. For
convenience when using class components, there are also associated
[HOCs](higherOrderComponents) that use the consumer hook and pass the context
value as a prop to the composed component.

The
[resourceManagerConfig](https://github.com/DINA-Web/dina-collections/tree/master/packages/ui/src/coreModules/resourceManager/contexts/resourceManagerConfig.js)
is used to provide the ResourceManager configuration props. Those will not
(should not!) change during the ResourceManager's component lifecycle, which
means consuming the config context will not cause any unnecessary rerendering.

The
[resourceManagerNavigation](https://github.com/DINA-Web/dina-collections/tree/master/packages/ui/src/coreModules/resourceManager/contexts/resourceManagerNavigation.js)
is used to provide the ResourceManager navigation methods and values. When the
navigation state changes it will usually mean a change of view or a change of
the data that hydrates a view, so consuming this context in the
form/table/tree-wrapper HOCs will generally not lead to unnecessary rerendering.

#### higherOrderComponents

This folder contains the higher order components that are shared inside the
ResourceManager. There are also higherOrderComponents in the root of the
resourceManager module, which are used by other modules, as described in
[Usage](#usage)).

The shared higherOrderComponents are:

| Name                            | Description                                                                                                      |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| createInjectItemTitle           | Injects an itemTitle prop of type node                                                                           |
| createFocusRow                  | Provides functions for changing what row is focused                                                              |
| createResourceManagerWrapper    | Passes values into context providers, sets default props, some keyboard shortcuts and mount/unmount behaviour    |
| injectFocusedItemId             | Injects the focusedItemId and a setter                                                                           |
| injectResourceManagerConfig     | Injects the resourceManagerConfig context value (for class components that cannot use the `useContext` hook)     |
| injectResourceManagerNavigation | Injects the resourceManagerNavigation context value (for class components that cannot use the `useContext` hook) |

#### hooks

Currently there is only one shared
[hook](https://reactjs.org/docs/hooks-reference.htm).

| Name            | Description                                          |
| --------------- | ---------------------------------------------------- |
| useEffectScroll | Used in table and tree to update the scroll position |

#### utilities

The utilities folder is a gathering point for functions that may or may not be
used in more than one place.

### table

The table folder contains the TableView, TableSettings, TableNavigationBar and
FilterActionBar components. They are all enhanced by the createTableWrapper HOC,
which consumes the config and navigation [contexts](#contexts), connects to e.g.
to the table list items and the saved user preferences for table sorting and
what columns to show, and passes on methods to fetch data and update the table
settings.

The table fetches the IDs of all the items that match the current filter and
then fetches the attributes for the items that are currently visible in the
table (which is an infinity-scrolling list) through the `fetchItemById` method
provided by the
[createBatchFetchItems](https://github.com/DINA-Web/dina-collections/tree/master/packages/ui/src/coreModules/crud/higherOrderComponents/createBatchFetchItems.js)
HOC, using the provided `tableBatchFetchOptions`.

### tree

The tree folder contains the TreeView and TreeNavigationBar components. They are
both enhanced by the createTreeWrapper HOC, which consumes the config and
navigation [contexts](#contexts), connects to e.g. the tree list items and
passes on methods to fetch data and expand/collapse tree nodes (to show/hide
their child nodes).

The tree fetches the root node first and when a node is expanded it fetches the
children items to that node through the `fetchItemById` method provided by the
[createBatchFetchItems](https://github.com/DINA-Web/dina-collections/tree/master/packages/ui/src/coreModules/crud/higherOrderComponents/createBatchFetchItems.js)
HOC, using the provided`treeItemFetchOptions`.
