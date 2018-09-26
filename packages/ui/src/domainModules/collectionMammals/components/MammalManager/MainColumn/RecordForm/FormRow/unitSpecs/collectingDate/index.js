import { createRangeDateWithRemarks } from 'coreModules/form/components/parts/factories'
import extractInitiallyHiddenKeys from 'coreModules/form/utilities/extractInitiallyHiddenKeys'

const model = 'collectingInformation'

const items = [
  {
    as: 'h3',
    componentName: 'TranslatedHeader',
    textKey: 'headers.collectingDate',
  },
  ...createRangeDateWithRemarks({
    baseName: 'individual.collectingInformation.0.event.dateRange',
    emptyStateTextKey: 'remarks.emptyState.date',
    initialDateType: 'range',
    model,
    resultPrefixTextKey: 'remarks.resultPrefix.date',
  }),
]

export default {
  initiallyHiddenKeys: extractInitiallyHiddenKeys(items),
  items,
}
