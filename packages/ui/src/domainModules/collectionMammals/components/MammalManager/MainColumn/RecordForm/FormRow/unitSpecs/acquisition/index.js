import {
  createAgentInputs,
  createSingleDate,
} from 'coreModules/form/components/parts/factories'
import { extractInitiallyHiddenKeys } from 'coreModules/form/components/parts/utilities'

const model = 'acquisition'

const items = [
  {
    as: 'h3',
    componentName: 'TranslatedHeader',
    textKey: 'headers.acquisition',
  },
  {
    componentName: 'AddButton',
    initiallyShown: true,
    textKey: 'other.addAcquisition',
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
    emptyStateTextKey: 'remarks.emptyState.acquisition',
    initiallyHidden: true,
    model,
    name: 'individual.acquisition.remarks',
    resultPrefixTextKey: 'remarks.resultPrefix.acquisition',
  },
]

export default {
  initiallyHiddenKeys: extractInitiallyHiddenKeys(items),
  items,
}
