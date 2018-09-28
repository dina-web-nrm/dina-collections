import {
  createAgentInputs,
  createSingleDate,
} from 'coreModules/form/components/parts/factories'
import extractInitiallyHiddenFields from 'coreModules/form/utilities/extractInitiallyHiddenFields'

const model = 'acquisition'

const items = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h3',
      textKey: 'headers.acquisition',
    },
  },
  {
    componentName: 'AddButton',
    componentProps: {
      textKey: 'other.addAcquisition',
    },
    initiallyShown: true,
  },
  ...createSingleDate({
    initiallyHidden: true,
    name: 'individual.acquisition.date',
  }),
  ...createAgentInputs({
    baseName: 'individual.acquisition.handedInByAgent',
    initiallyHidden: true,
    model,
  }),
  {
    componentName: 'Remarks',
    componentProps: {
      emptyStateTextKey: 'remarks.emptyState.acquisition',
      model,
      resultPrefixTextKey: 'remarks.resultPrefix.acquisition',
    },
    initiallyHidden: true,
    name: 'individual.acquisition.remarks',
    wrapInField: true,
  },
]

export default {
  initiallyHiddenFields: extractInitiallyHiddenFields(items),
  items,
}
