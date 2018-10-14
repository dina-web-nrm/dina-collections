import { createAgentInputs } from 'coreModules/form/components/parts/factories'

const model = 'collectingInformation'

const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h3',
      textKey: 'headers.collectorAndExpedition',
    },
  },
  ...createAgentInputs({
    baseName: 'individual.collectingInformation.0.collectedByAgent',
    model,
  }),
  {
    componentName: 'Input',
    componentProps: {
      columnProps: { width: 9 },
      fluid: true,
      type: 'text',
    },
    name: 'individual.collectingInformation.0.event.expeditionText',
    wrapInField: true,
  },
]

export default {
  name: 'collectorExpedition',
  parts,
}
