# Tree for coreModules
## Tree
```bash
├── allModules.js
├── api
│   ├── actionCreators
│   │   └── downloadFile.js
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
│   │   ├── ColumnRowHeader
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
│   ├── actionCreators
│   │   ├── clearNestedCache.js
│   │   ├── createNestedItem.js
│   │   └── index.js
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
│   │   ├── TogglableField
│   │   │   ├── DefaultRenderEmptyState.js
│   │   │   ├── DefaultRenderResult.js
│   │   │   └── index.js
│   │   ├── fields
│   │   │   ├── Checkbox
│   │   │   ├── CustomData
│   │   │   ├── Date
│   │   │   ├── DropdownSearch
│   │   │   ├── Input
│   │   │   ├── MultipleSearchSelectionDropdown
│   │   │   ├── Remarks
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
│   ├── globalSelectors.js
│   ├── higherOrderComponents
│   │   ├── index.js
│   │   ├── injectErrorKeys.js
│   │   ├── injectFormPartStatus.js
│   │   ├── injectHelpNotificationProps.js
│   │   ├── injectIsLatestActiveField.js
│   │   ├── injectLabelKey.js
│   │   ├── injectParameterKey.js
│   │   ├── injectSearchOptions.js
│   │   ├── pathBuilder.js
│   │   ├── pathBuilder.spec.js
│   │   ├── reportFormFieldStatus.js
│   │   ├── wrapInColumn.js
│   │   └── wrapInFieldTemplate.js
│   ├── index.js
│   ├── notifications
│   │   └── index.js
│   ├── reducer.js
│   ├── selectors.js
│   ├── translations.json
│   └── utilities
│       ├── buildInitialFormPartStatus.js
│       ├── createErrorKeys.js
│       ├── createHelpNotificationProps.js
│       ├── createInputTest.js
│       ├── createLabelKey.js
│       ├── createParameterKey.js
│       ├── createUpdateFormPartStatus.js
│       ├── getHiddenFieldsHaveValue.js
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
│   │   ├── registerKeyboardShortcut.js
│   │   ├── setShortcutsModalHidden.js
│   │   ├── setShortcutsModalVisible.js
│   │   ├── toggleShortcutsModal.js
│   │   └── unregisterKeyboardShortcut.js
│   ├── actionTypes.js
│   ├── components
│   │   ├── KeyboardShortcuts
│   │   │   └── index.js
│   │   ├── ShortcutsDisplay.js
│   │   ├── ShortcutsDisplay.stories.js
│   │   └── index.js
│   ├── constants.js
│   ├── globalSelectors.js
│   ├── index.js
│   ├── reducer.js
│   ├── reducer.test.js
│   ├── selectors.js
│   ├── selectors.test.js
│   └── translations.json
├── layout
│   ├── components
│   │   ├── AppNavigationSidebar
│   │   │   └── index.js
│   │   ├── Block
│   │   │   ├── Content
│   │   │   ├── Header
│   │   │   └── index.js
│   │   ├── ColumnLayout
│   │   │   ├── index.js
│   │   │   └── index.stories.js
│   │   ├── InformationSidebar
│   │   │   └── index.js
│   │   ├── NavigationSidebar
│   │   │   ├── SidebarNavItem.js
│   │   │   ├── SidebarNavItemGroup.js
│   │   │   ├── index.js
│   │   │   └── index.stories.js
│   │   ├── RowLayout
│   │   │   ├── index.js
│   │   │   └── index.stories.js
│   │   ├── TopMenu
│   │   │   ├── UserMenu.js
│   │   │   └── index.js
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
│       ├── emToPixels.js
│       └── index.js
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
│   │   ├── Inline
│   │   │   ├── Body.js
│   │   │   └── index.js
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
├── resourceManager
│   ├── components
│   │   ├── ResourceManager
│   │   │   ├── CollectionColumn
│   │   │   ├── CreateItemColumn
│   │   │   ├── EditItemColumn
│   │   │   ├── FilterColumn
│   │   │   ├── index.js
│   │   │   └── picker
│   │   └── index.js
│   ├── constants.js
│   ├── higherOrderComponents
│   │   ├── createInjectItemTitle
│   │   │   ├── DefaultItemTitle.js
│   │   │   └── index.js
│   │   ├── createLocalState.js
│   │   ├── createNavigationState.js
│   │   ├── createPickerWrapper.js
│   │   ├── createQueryState.js
│   │   ├── createResourceManagerWrapper.js
│   │   └── index.js
│   ├── index.js
│   ├── keyObjectModule.js
│   └── utilities
│       ├── buildList.js
│       ├── getTableWidth.js
│       └── index.js
├── routing
│   ├── constants.js
│   ├── higherOrderComponents
│   │   ├── index.js
│   │   ├── injectActiveLocationDescription.js
│   │   └── injectNavigationItems.js
│   └── index.js
├── search
│   ├── actionCreators
│   │   ├── index.js
│   │   ├── localSearch.js
│   │   ├── search.js
│   │   └── syncSearch.js
│   ├── components
│   │   ├── MultipleChoiceCheckboxes
│   │   │   ├── Field.js
│   │   │   └── Local.js
│   │   ├── MultipleSearchTagsSelect
│   │   │   ├── Field.js
│   │   │   ├── RefineTagSelection.js
│   │   │   ├── TagGroup.js
│   │   │   ├── index.js
│   │   │   ├── index.stories.js
│   │   │   └── selectors.js
│   │   └── index.js
│   ├── constants.js
│   ├── higherOrderComponents
│   │   ├── createInjectSearch.js
│   │   ├── createInjectSearchResult.js
│   │   └── index.js
│   ├── index.js
│   ├── keyObjectModule.js
│   └── translations.json
├── size
│   ├── actionCreators
│   │   ├── index.js
│   │   ├── setBreakpoint.js
│   │   ├── setHeight.js
│   │   └── setWidth.js
│   ├── actionTypes.js
│   ├── constants.js
│   ├── globalSelectors.js
│   ├── higherOrderComponents
│   │   ├── createInjectScrollLeft.js
│   │   ├── index.js
│   │   ├── injectWindowHeight.js
│   │   └── injectWindowWidth.js
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