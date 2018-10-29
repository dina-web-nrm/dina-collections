import { createSingleDate } from 'coreModules/form/components/parts/factories'

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
  ...createSingleDate({
    initiallyHidden: true,
    name: 'birthDate',
  }),
  ...createSingleDate({
    initiallyHidden: true,
    name: 'deathDate',
  }),
]

export default {
  name: 'agentBirthAndDeath',
  parts,
}
