import { createRangeDateWithRemarks } from 'coreModules/form/components/parts/factories'
import extractInitiallyHiddenFields from 'coreModules/form/utilities/extractInitiallyHiddenFields'

const model = 'collectingInformation'

const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h3',
      textKey: 'headers.collectingDate',
    },
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
  initiallyHiddenFields: extractInitiallyHiddenFields(parts),
  name: 'collectingDate',
  parts,
}
