# Tree for coreModules
## Tree
```bash
├── allModules.js
├── api
│   ├── actionCreators
│   │   ├── callOperation.js
│   │   ├── downloadFile.js
│   │   └── index.js
│   ├── actionTypes.js
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
│   │   ├── DefaultLoader.test.js
│   │   ├── DefaultLoadingError.js
│   │   ├── DefaultWrapper.js
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
│   │   ├── LayerModal
│   │   │   ├── ModalContentWrapper.js
│   │   │   └── index.js
│   │   ├── PageTemplate.js
│   │   ├── ThreeColumnGrid
│   │   │   └── index.js
│   │   ├── TranslatedLabel.js
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
│   │   ├── createGetResourceCount.js
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
│   │   ├── ErrorBoundary
│   │   │   ├── FullPageError.js
│   │   │   └── index.js
│   │   ├── FormFieldError.js
│   │   ├── FormSchemaError.js
│   │   └── index.js
│   ├── constants.js
│   ├── index.js
│   ├── middleware.js
│   ├── notifications
│   │   └── index.js
│   └── translations.json
├── form
│   ├── components
│   │   ├── ConfirmationPopup
│   │   │   └── index.js
│   │   ├── FieldTemplate
│   │   │   ├── FieldError.js
│   │   │   ├── FieldLabel.js
│   │   │   └── index.js
│   │   ├── FieldWrapper
│   │   │   └── index.js
│   │   ├── Form
│   │   │   └── index.js
│   │   ├── FormModal
│   │   │   └── index.js
│   │   ├── FormRow
│   │   │   ├── FormSectionNavigation
│   │   │   ├── FormSectionView
│   │   │   └── index.js
│   │   ├── Section
│   │   │   └── index.js
│   │   ├── TogglableField
│   │   │   ├── DefaultRenderEmptyState.js
│   │   │   ├── DefaultRenderResult.js
│   │   │   └── index.js
│   │   ├── Unit
│   │   │   └── index.js
│   │   ├── fields
│   │   │   ├── Checkbox
│   │   │   ├── Coordinates
│   │   │   ├── CustomData
│   │   │   ├── Date
│   │   │   ├── DropdownSearch
│   │   │   ├── Input
│   │   │   ├── MultipleSearchSelectionDropdown
│   │   │   ├── Radio
│   │   │   ├── RadioBoolean
│   │   │   ├── Remarks
│   │   │   ├── Search
│   │   │   └── TextArea
│   │   ├── index.js
│   │   ├── inputs
│   │   │   ├── Checkbox
│   │   │   ├── CustomData
│   │   │   ├── DropdownSearch
│   │   │   ├── Input
│   │   │   ├── MultipleSearchSelectionDropdown
│   │   │   ├── Search
│   │   │   └── TextArea
│   │   ├── migrate
│   │   │   ├── ButtonCopyPasteField.js
│   │   │   ├── DisplaySearchResult.js
│   │   │   ├── FormTable
│   │   │   ├── HelpTextNotification.js
│   │   │   └── InputDatePart
│   │   ├── parts
│   │   │   ├── ReduxFormFieldComponents
│   │   │   ├── StaticContent
│   │   │   ├── factories
│   │   │   └── index.js
│   │   └── units
│   │       ├── index.js
│   │       ├── legacyData
│   │       └── recordHistoryEvents
│   ├── constants.js
│   ├── globalSelectors.js
│   ├── higherOrderComponents
│   │   ├── createLinkFieldErrors.js
│   │   ├── index.js
│   │   ├── injectErrorKeys.js
│   │   ├── injectHelpNotificationProps.js
│   │   ├── injectIsLatestActiveField.js
│   │   ├── injectLabelKey.js
│   │   ├── injectParameterKey.js
│   │   ├── injectSearchOptions.js
│   │   ├── pathBuilder.js
│   │   ├── pathBuilder.spec.js
│   │   ├── withUnsubmittedFormConfirmation.js
│   │   ├── wrapInColumn.js
│   │   └── wrapInFieldTemplate.js
│   ├── index.js
│   ├── notifications
│   │   └── index.js
│   ├── reducer.js
│   ├── selectors.js
│   ├── translations.json
│   └── utilities
│       ├── createErrorKeys.js
│       ├── createHelpNotificationProps.js
│       ├── createInputTest.js
│       ├── createLabelKey.js
│       ├── createParameterKey.js
│       ├── createUpdateFormPartStatus.js
│       ├── errorTransformations
│       │   ├── createMapRequiredStrings.js
│       │   ├── createMapRequiredStrings.test.js
│       │   ├── index.js
│       │   ├── mapParentError.js
│       │   └── mapParentError.test.js
│       ├── handleReduxFormSubmitError.js
│       ├── index.js
│       ├── index.test.js
│       ├── radioTransformations.js
│       ├── wrapReduxFormFieldParts.js
│       └── wrapStaticContentParts.js
├── formSupport
│   ├── actionCreators
│   │   ├── index.js
│   │   └── validateSections.js
│   ├── constants.js
│   ├── globalSelectors.js
│   ├── index.js
│   ├── keyObjectModule.js
│   ├── selectors.js
│   ├── selectors.test.js
│   └── utilities
│       ├── index.js
│       ├── reduceFieldSpecsToNodeFieldNamesMap.js
│       ├── reduceFieldSpecsToNodeFieldNamesMap.test.js
│       ├── reduceFieldSpecsToSectionFieldNamesMap.js
│       ├── reduceFieldSpecsToUnitFieldNamesMap.js
│       ├── transformFormSpecToFieldMap.js
│       └── transformFormSpecToFieldMap.test.js
├── i18n
│   ├── actionCreators
│   │   ├── index.js
│   │   └── setLanguage.js
│   ├── actionTypes.js
│   ├── actionTypes.test.js
│   ├── components
│   │   ├── I18nProvider.js
│   │   ├── LanguageSelect.js
│   │   ├── Markdown.js
│   │   ├── MarkdownToHtmlAsync.js
│   │   ├── ModuleTranslate.js
│   │   ├── Translate.js
│   │   ├── createModuleTranslate.js
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
│   │   ├── setLayer.js
│   │   ├── setShortcutsModalHidden.js
│   │   ├── setShortcutsModalVisible.js
│   │   ├── toggleShortcutsModal.js
│   │   └── unregisterKeyboardShortcut.js
│   ├── actionTypes.js
│   ├── components
│   │   ├── KeyboardShortcuts
│   │   │   └── index.js
│   │   ├── ShortcutsDisplay.js
│   │   └── index.js
│   ├── constants.js
│   ├── globalSelectors.js
│   ├── higherOrderComponents
│   │   ├── createShortcutLayer.js
│   │   └── index.js
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
│   │   │   └── index.js
│   │   ├── InformationSidebar
│   │   │   └── index.js
│   │   ├── NavigationSidebar
│   │   │   ├── SidebarNavItem.js
│   │   │   ├── SidebarNavItemGroup.js
│   │   │   └── index.js
│   │   ├── RowLayout
│   │   │   └── index.js
│   │   ├── TopMenu
│   │   │   ├── UserMenu.js
│   │   │   └── index.js
│   │   ├── ViewWrap.js
│   │   └── index.js
│   ├── constants.js
│   ├── globalSelectors.js
│   ├── higherOrderComponents
│   │   ├── createApplicationLayer.js
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
│   │   ├── FormFieldHelpIcon.js
│   │   ├── Inline
│   │   │   ├── Body.js
│   │   │   └── index.js
│   │   ├── Modal.js
│   │   ├── NotificationDisplay.js
│   │   └── index.js
│   ├── constants.js
│   ├── globalSelectors.js
│   ├── index.js
│   ├── middleware.js
│   ├── notifications.js
│   ├── reducer.js
│   ├── schemas.js
│   ├── selectors.js
│   └── utilities
│       ├── buildNotification.js
│       ├── index.js
│       └── testNotificationSpecification.js
├── resourceManager
│   ├── actionCreators
│   │   └── index.js
│   ├── actionTypes.js
│   ├── components
│   │   ├── ResourceManager
│   │   │   ├── FilterColumn
│   │   │   ├── MainColumn
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
│   ├── translations.json
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
│   │   ├── FeatureTypeRange
│   │   │   └── index.js
│   │   ├── MultipleChoiceCheckboxes
│   │   │   ├── Field.js
│   │   │   └── Local.js
│   │   ├── MultipleSearchTagsSelect
│   │   │   ├── Field.js
│   │   │   ├── RefineTagSelection.js
│   │   │   ├── RefineTagSelectionButton.js
│   │   │   ├── TagGroup.js
│   │   │   ├── index.js
│   │   │   └── selectors.js
│   │   ├── NoResultsFound
│   │   │   └── index.js
│   │   ├── SearchPreview
│   │   │   └── Field.js
│   │   ├── TagTypeDropdown
│   │   │   ├── Field.js
│   │   │   └── index.js
│   │   └── index.js
│   ├── constants.js
│   ├── higherOrderComponents
│   │   ├── createInjectSearch.js
│   │   ├── createInjectSearchResult.js
│   │   └── index.js
│   ├── index.js
│   ├── keyObjectModule.js
│   ├── translations.json
│   └── utilities
│       └── queryBuilderFactory
│           ├── createHigherOrderComponents
│           ├── createSelectors
│           ├── index.js
│           └── utilities
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