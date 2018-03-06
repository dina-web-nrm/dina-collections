# Tree for coreModules
Generated at commit: d581a4efc37f21fddd6ad6cb04e5cb9d360877c2
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
│   ├── actionCreators
│   │   ├── closeLeftSidebar.js
│   │   ├── index.js
│   │   ├── openLeftSidebar.js
│   │   └── toggleLeftSidebar.js
│   ├── actionTypes.js
│   ├── components
│   │   ├── Footer.js
│   │   ├── Footer.stories.js
│   │   ├── InformationSidebar
│   │   │   └── index.js
│   │   ├── NavigationSidebar
│   │   │   ├── SidebarNavItem.js
│   │   │   ├── SidebarNavItemGroup.js
│   │   │   └── index.js
│   │   ├── NavigationSidebar.stories.js
│   │   ├── PageTemplate.js
│   │   ├── PageTemplate.stories.js
│   │   ├── TranslatedLabel.js
│   │   ├── TranslatedLabel.stories.js
│   │   ├── ViewWrap.js
│   │   ├── ViewWrap.stories.js
│   │   └── index.js
│   ├── constants.js
│   ├── globalSelectors.js
│   ├── index.js
│   ├── middleware.js
│   ├── reducer.js
│   ├── sample.md
│   ├── selectors.js
│   └── translations.json
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
│   ├── translations.json
│   └── utilities
│       ├── createLinkFromRef.js
│       ├── createModelLink.js
│       ├── createParameterLink.js
│       ├── getAnyOfLinksFromProperty.js
│       ├── getArrayLinkFromProperty.js
│       ├── getAvailableSchemaVersions.js
│       ├── getCurrentSchemaVersion.js
│       ├── getModelLinkFromProperty.js
│       ├── getPropertyIsAnyOf.js
│       ├── getPropertyIsArray.js
│       └── getPropertyIsModel.js
├── error
│   ├── components
│   │   ├── FormFieldError.js
│   │   ├── FormFieldError.stories.js
│   │   ├── FormSchemaError.js
│   │   ├── FormSchemaError.stories.js
│   │   └── index.js
│   ├── constants.js
│   ├── index.js
│   ├── middleware.js
│   └── translations.json
├── form
│   ├── components
│   │   ├── ButtonCopyPasteField.js
│   │   ├── Checkbox.js
│   │   ├── Checkbox.stories.js
│   │   ├── DisplaySearchResult.js
│   │   ├── DropdownSearch
│   │   │   ├── index.js
│   │   │   └── index.spec.js
│   │   ├── Field.js
│   │   ├── FieldLabel.js
│   │   ├── FormTable
│   │   │   ├── FormTableHeaderRow.js
│   │   │   └── index.js
│   │   ├── HelpTextNotification.js
│   │   ├── Input
│   │   │   ├── index.js
│   │   │   ├── index.spec.js
│   │   │   └── index.stories.js
│   │   ├── InputDatePart
│   │   │   ├── dateOptions.js
│   │   │   └── index.js
│   │   ├── SearchInputWithResults.js
│   │   ├── TranslateSearchResult.js
│   │   └── index.js
│   ├── constants.js
│   ├── higherOrderComponents
│   │   ├── index.js
│   │   ├── pathBuilder.js
│   │   └── pathBuilder.spec.js
│   ├── index.js
│   ├── notifications
│   │   └── index.js
│   └── reducer.js
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
├── size
│   ├── actionCreators
│   │   ├── index.js
│   │   └── setBreakpoint.js
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