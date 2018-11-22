import { createRangeDate } from 'coreModules/form/components/parts/factories'

const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h3',
      textKey: 'headers.birthAndDeath',
    },
  },
  {
    componentName: 'AddButton',
    componentProps: {
      textKey: 'buttons.birthAndDeath',
    },
    initiallyShown: true,
  },
  ...createRangeDate({
    displayDateTypeRadios: false,
    displayEndDateLabel: true,
    displayLabel: false,
    displayStartDateLabel: true,
    displaySubLabels: true,
    endDateLabel: 'Death date',
    initialDateType: 'openRange',
    initiallyHidden: true,
    name: 'lifespan',
    stack: true,
    startDateLabel: 'Birth date',
  }),
]

export default {
  name: 'agentBirthAndDeath',
  parts,
}
