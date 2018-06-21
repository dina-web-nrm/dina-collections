# Tree for coreModules
## Tree
```bash
├── allModules.js
├── api
│   ├── constants.js
│   ├── index.js
│   └── middleware.js
├── bootstrap
│   ├── actionCreators
│   │   ├── index.js
│   │   ├── registerModules.js
│   │   ├── registerModules.test.js
│   │   ├── unregisterModules.js
│   │   └── unregisterModules.test.js
│   ├── actionTypes.js
│   ├── actionTypes.test.js
│   ├── components
│   │   ├── DefaultLoader.js
│   │   ├── DefaultLoader.stories.js
│   │   ├── DefaultLoader.test.js
│   │   ├── DefaultLoadingError.js
│   │   ├── DefaultWrapper.js
│   │   ├── DefaultWrapper.stories.js
│   │   ├── DefaultWrapper.test.js
│   │   └── index.js
│   ├── constants.js
│   ├── constants.test.js
│   ├── enhancer.js
│   ├── higherOrderComponents
│   │   ├── createAsyncView.js
│   │   ├── createSyncView.js
│   │   └── index.js
│   ├── index.js
│   ├── index.test.js
│   └── utilities
│       ├── createAsyncRegisterModules.js
│       ├── createAsyncUnregisterModules.js
│       ├── createConfigValidation.js
│       ├── createConfigValidation.test.js
│       ├── createEnhancerStateManager.js
│       ├── createEnhancers.js
│       ├── createFilteredConfig.js
│       ├── createListeners.js
│       ├── createMiddlewareArray.js
│       ├── createMiddlewareMap.js
│       ├── createModuleMap.js
│       ├── createRegisterModules.js
│       ├── createRootReducer.js
│       ├── createSerializedModuleMap.js
│       ├── createUnregisterModules.js
│       ├── getModuleConfig.js
│       ├── getModuleConfig.test.js
│       ├── includesModule.js
│       ├── includesModule.test.js
│       ├── index.js
│       ├── registerModuleProperty.js
│       ├── setModuleConfig.js
│       ├── startListeners.js
│       ├── unregisterModuleProperty.js
│       └── updateModuleState.js
├── commonUi
│   ├── components
│   │   ├── Accordion
│   │   │   └── index.js
│   │   ├── DateString
│   │   │   └── index.js
│   │   ├── Footer.js
│   │   ├── Footer.stories.js
│   │   ├── PageTemplate.js
│   │   ├── PageTemplate.stories.js
│   │   ├── ThreeColumnGrid
│   │   │   └── index.js
│   │   ├── TranslatedLabel.js
│   │   ├── TranslatedLabel.stories.js
│   │   └── index.js
│   ├── constants.js
│   ├── index.js
│   ├── sample.md
│   └── translations.json
├── crud
│   ├── actionCreators.js
│   ├── actionTypes.js
│   ├── config.js
│   ├── config.test.js
│   ├── constants.js
│   ├── constants.test.js
│   ├── createCrudModule
│   │   ├── factories
│   │   │   ├── actionCreators
│   │   │   ├── actionHandlers
│   │   │   ├── actionTypes
│   │   │   ├── coreReducer
│   │   │   ├── dux
│   │   │   ├── globalSelectors
│   │   │   ├── resourceReducer
│   │   │   ├── selectors
│   │   │   └── specification
│   │   ├── index.js
│   │   ├── index.test.js
│   │   ├── inputConfigSchema.js
│   │   └── utilities
│   │       ├── validateConfig.js
│   │       └── validateConfig.test.js
│   ├── crudModule.js
│   ├── globalSelectors.js
│   ├── higherOrderComponents
│   │   ├── createBatchFetchItems.js
│   │   ├── createEnsureAllItemsFetched.js
│   │   ├── createGetItemById.js
│   │   ├── createGetNestedItemById.js
│   │   └── index.js
│   ├── index.js
│   ├── keyObjectModule.js
│   ├── reducer.js
│   ├── selectors.js
│   └── utilities.js
├── crudBlocks
│   ├── components
│   │   ├── BlockLoader
│   │   │   └── index.js
│   │   ├── CrudBlocksWrapper
│   │   │   └── index.js
│   │   ├── ParentChildTables
│   │   │   ├── RelationTable.js
│   │   │   └── index.js
│   │   ├── blocks
│   │   │   ├── Collection
│   │   │   └── Item
│   │   └── index.js
│   ├── constants.js
│   ├── index.js
│   └── keyObjectModule.js
├── devToolsExtension
│   └── index.js
├── documentation
│   ├── components
│   │   ├── DataModel
│   │   │   ├── Model.js
│   │   │   ├── Property.js
│   │   │   ├── PropertyOverview.js
│   │   │   ├── Type.js
│   │   │   └── index.js
│   │   ├── GeneralDocs.js
│   │   ├── Nav.js
│   │   ├── VersionOverview.js
│   │   └── index.js
│   ├── constants.js
│   ├── index.js
│   └── utilities
│       ├── createLinkFromRef.js
│       ├── createModelLink.js
│       ├── createParameterLink.js
│       ├── extractModelFromSpecification.js
│       ├── getAnyOfLinksFromProperty.js
│       ├── getArrayLinkFromProperty.js
│       ├── getAvailableSchemaVersions.js
│       ├── getCurrentSchemaVersion.js
│       ├── getModelLinkFromProperty.js
│       ├── getPropertyIsAnyOf.js
│       ├── getPropertyIsArray.js
│       ├── getPropertyIsModel.js
│       └── getPropertySummary.js
├── error
│   ├── components
│   │   ├── ConnectedFormSchemaError.js
│   │   ├── FormFieldError.js
│   │   ├── FormFieldError.stories.js
│   │   ├── FormSchemaError.js
│   │   ├── FormSchemaError.stories.js
│   │   └── index.js
│   ├── constants.js
│   ├── index.js
│   ├── middleware.js
│   ├── notifications
│   │   └── index.js
│   └── translations.json
├── form
│   ├── components
│   │   ├── FieldTemplate
│   │   │   ├── FieldError.js
│   │   │   ├── FieldLabel.js
│   │   │   └── index.js
│   │   ├── FieldWrapper
│   │   │   └── index.js
│   │   ├── fields
│   │   │   ├── Checkbox
│   │   │   ├── CustomData
│   │   │   ├── Date
│   │   │   ├── DropdownSearch
│   │   │   ├── Input
│   │   │   ├── MultipleSearchSelectionDropdown
│   │   │   ├── Search
│   │   │   └── TextArea
│   │   ├── index.js
│   │   ├── inputs
│   │   │   ├── Checkbox
│   │   │   ├── CustomData
│   │   │   ├── Date
│   │   │   ├── DropdownSearch
│   │   │   ├── Input
│   │   │   ├── MultipleSearchSelectionDropdown
│   │   │   ├── Search
│   │   │   └── TextArea
│   │   └── migrate
│   │       ├── ButtonCopyPasteField.js
│   │       ├── DisplaySearchResult.js
│   │       ├── FormTable
│   │       ├── HelpTextNotification.js
│   │       └── InputDatePart
│   ├── constants.js
│   ├── higherOrderComponents
│   │   ├── index.js
│   │   ├── injectErrorKeys.js
│   │   ├── injectHelpNotificationProps.js
│   │   ├── injectLabelKey.js
│   │   ├── injectParameterKey.js
│   │   ├── pathBuilder.js
│   │   └── pathBuilder.spec.js
│   ├── index.js
│   ├── notifications
│   │   └── index.js
│   ├── reducer.js
│   └── utilities
│       ├── createErrorKeys.js
│       ├── createHelpNotificationProps.js
│       ├── createInputTest.js
│       ├── createLabelKey.js
│       ├── createParameterKey.js
│       ├── index.js
│       ├── index.test.js
│       └── radioTransformations.js
├── i18n
│   ├── actionCreators
│   │   ├── index.js
│   │   └── setLanguage.js
│   ├── actionTypes.js
│   ├── actionTypes.test.js
│   ├── components
│   │   ├── I18nProvider.js
│   │   ├── I18nProvider.stories.js
│   │   ├── LanguageSelect.js
│   │   ├── LanguageSelect.stories.js
│   │   ├── Markdown.js
│   │   ├── Markdown.stories.js
│   │   ├── MarkdownToHtmlAsync.js
│   │   ├── MarkdownToHtmlAsync.stories.js
│   │   ├── ModuleTranslate.js
│   │   ├── ModuleTranslate.stories.js
│   │   ├── Translate.js
│   │   ├── Translate.stories.js
│   │   ├── createModuleTranslate.js
│   │   ├── createModuleTranslate.stories.js
│   │   └── index.js
│   ├── constants.js
│   ├── globalSelectors.js
│   ├── globalSelectors.test.js
│   ├── higherOrderComponents
│   │   ├── index.js
│   │   └── withI18n.js
│   ├── index.js
│   ├── index.test.js
│   ├── reducer.js
│   ├── reducer.test.js
│   ├── schemas.js
│   ├── schemas.test.js
│   ├── selectors.js
│   ├── selectors.test.js
│   ├── utilities.js
│   └── utilities.test.js
├── index.js
├── keyboardShortcuts
│   ├── actionCreators
│   │   ├── index.js
│   │   ├── setShortcutsModalHidden.js
│   │   ├── setShortcutsModalVisible.js
│   │   ├── toggleShortcutsModal.js
│   │   └── triggerShortcut.js
│   ├── actionTypes.js
│   ├── components
│   │   ├── ShortcutsDisplay.js
│   │   ├── ShortcutsDisplay.stories.js
│   │   └── index.js
│   ├── constants.js
│   ├── globalSelectors.js
│   ├── index.js
│   ├── listener.js
│   ├── middleware.js
│   ├── middleware.test.js
│   ├── reducer.js
│   ├── reducer.test.js
│   ├── selectors.js
│   ├── selectors.test.js
│   ├── shortcuts.js
│   ├── translations.json
│   └── utilities.js
├── layout
│   ├── components
│   │   ├── Block
│   │   │   ├── Content
│   │   │   ├── Header
│   │   │   └── index.js
│   │   ├── ColumnLayout
│   │   │   ├── index.js
│   │   │   └── index.stories.js
│   │   ├── InformationSidebar
│   │   │   └── index.js
│   │   ├── Layout
│   │   │   ├── index.js
│   │   │   └── views
│   │   ├── NavigationSidebar
│   │   │   ├── SidebarNavItem.js
│   │   │   ├── SidebarNavItemGroup.js
│   │   │   └── index.js
│   │   ├── NavigationSidebar.stories.js
│   │   ├── RowLayout
│   │   │   ├── index.js
│   │   │   └── index.stories.js
│   │   ├── ViewWrap.js
│   │   ├── ViewWrap.stories.js
│   │   └── index.js
│   ├── constants.js
│   ├── globalSelectors.js
│   ├── higherOrderComponents
│   │   ├── index.js
│   │   └── withLayout.js
│   ├── index.js
│   ├── keyObjectModule.js
│   ├── middleware.js
│   └── utilities
│       ├── calculateColumnWidths.js
│       ├── calculateColumnWidths.test.js
│       ├── calculateRowHeights.js
│       └── calculateRowHeights.test.js
├── localStorage
│   └── index.js
├── logger
│   └── index.js
├── notifications
│   ├── actionCreators
│   │   ├── createNotification.js
│   │   ├── index.js
│   │   └── removeNotification.js
│   ├── actionTypes.js
│   ├── components
│   │   ├── Flash.js
│   │   ├── Flash.stories.js
│   │   ├── FormFieldHelpIcon.js
│   │   ├── FormFieldHelpIcon.stories.js
│   │   ├── Inline.js
│   │   ├── Modal.js
│   │   ├── Modal.stories.js
│   │   ├── NotificationDisplay.js
│   │   ├── NotificationDisplay.stories.js
│   │   └── index.js
│   ├── constants.js
│   ├── globalSelectors.js
│   ├── index.js
│   ├── middleware.js
│   ├── reducer.js
│   ├── schemas.js
│   ├── selectors.js
│   └── utilities
│       ├── buildNotification.js
│       ├── index.js
│       └── testNotificationSpecification.js
├── routing
│   └── index.js
├── search
│   ├── actionCreators
│   │   ├── index.js
│   │   ├── localSearch.js
│   │   ├── search.js
│   │   └── syncSearch.js
│   ├── constants.js
│   ├── higherOrderComponents
│   │   ├── createInjectSearch.js
│   │   ├── createInjectSearchResult.js
│   │   └── index.js
│   ├── index.js
│   └── keyObjectModule.js
├── size
│   ├── actionCreators
│   │   ├── index.js
│   │   ├── setBreakpoint.js
│   │   ├── setHeight.js
│   │   └── setWidth.js
│   ├── actionTypes.js
│   ├── constants.js
│   ├── globalSelectors.js
│   ├── index.js
│   ├── listener.js
│   ├── reducer.js
│   ├── schemas.js
│   └── selectors.js
├── tree.md
└── user
    ├── actionCreators
    │   ├── getUser.js
    │   ├── getUserPreferences.js
    │   ├── index.js
    │   ├── login.js
    │   ├── logout.js
    │   ├── updateUserPreference.js
    │   └── updateUserPreferences.js
    ├── actionTypes.js
    ├── components
    │   ├── LoginForm.js
    │   ├── LoginForm.stories.js
    │   └── index.js
    ├── constants.js
    ├── endpoints.js
    ├── globalSelectors.js
    ├── higherOrderComponents
    │   ├── index.js
    │   ├── requireLoggedIn.js
    │   └── requireLoggedOut.js
    ├── index.js
    ├── middleware.js
    ├── notifications.js
    ├── reducer.js
    ├── schemas.js
    ├── selectors.js
    ├── shortcuts.js
    └── translations.json

```

## Links
[root](../../tree.md)
[src](../tree.md)
[apps](../apps/tree.md)
[domainModules](../domainModules/tree.md)
[collectionsUi viewModules](../apps/collectionsUi/viewModules/tree.md)