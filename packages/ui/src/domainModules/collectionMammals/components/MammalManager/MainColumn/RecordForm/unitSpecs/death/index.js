const model = 'deathInformation'

const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h3',
      textKey: 'headers.death',
    },
  },
  {
    componentName: 'Checkbox',
    componentProps: {
      inline: true,
      textKey: 'diedAtColleting',
    },
    name: 'individual.collectingInformation.0.isDeathDate',
    wrapInField: true,
  },
  {
    componentName: 'CauseOfDeathDropdownSearch',
    componentProps: {
      columnProps: { width: 6 },
      inline: true,
      textKey: 'causeOfDeathType',
    },
    name: 'individual.deathInformation.0.causeOfDeathType.id',
    wrapInField: true,
  },
  {
    componentName: 'Remarks',
    componentProps: {
      emptyStateTextKey: 'remarks.emptyState.death',
      model,
      resultPrefixTextKey: 'remarks.resultPrefix.death',
    },
    name: 'individual.deathInformation.0.remarks',
    wrapInField: true,
  },
]

export default {
  name: 'death',
  parts,
}
