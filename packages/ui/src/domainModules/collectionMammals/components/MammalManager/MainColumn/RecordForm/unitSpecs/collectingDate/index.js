import { createRangeDateWithRemarks } from 'coreModules/form/components/parts/factories'

const model = 'collectingInformation'

const parts = [
  {
    componentName: 'TranslatedHeaderWithHelpIcon',
    componentProps: {
      as: 'h3',
      helpNotificationProps: {
        descriptionHeaderKey:
          'modules.specimen.headers.collectingDate',
        descriptionKey:
          'modules.specimen.helpTexts.collectingInformation.collectingDate',
      },
      textKey: 'headers.collectingDate',
    },
  },
  ...createRangeDateWithRemarks({
    baseName: 'individual.collectingInformation.0.event.dateRange',
    displayDateTypeRadios: true,
    emptyStateTextKey: 'remarks.emptyState.date',
    model,
    resultPrefixTextKey: 'remarks.resultPrefix.date',
  }),
]

export default {
  name: 'collectingDate',
  parts,
}
