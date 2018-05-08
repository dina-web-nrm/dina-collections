import runFormScenarios from 'utilities/test/formScenarioRunner'
import uiDescribe from 'utilities/test/uiDescribe'
import MammalForm from 'domainModules/collectionMammals/components/MammalForm'
import transformInput from 'domainModules/collectionMammals/components/MammalForm/transformations/input'
import transformOutput from 'domainModules/collectionMammals/components/MammalForm/transformations/output'
import registerNewWithAllFields from './registerNewWithAllFields'
// import registerWithNoCatalogNumberProvided from './registerWithNoCatalogNumberProvided'
// import registerWithCatalogNumberProvided from './registerWithCatalogNumberProvided'
// import updateExistingRecord from './updateExistingRecord'

// TODO ACTIVATE OTHER CASES
const scenarios = [
  registerNewWithAllFields,
  // registerWithCatalogNumberProvided,
  // registerWithNoCatalogNumberProvided,
  // updateExistingRecord,
]
const featureTypes = [
  {
    attributes: {
      group: 'age-stage',
      key: 'age-stage',
      selectableMethods: [
        {
          key: 'known-age',
          name: {
            en: 'known age',
          },
        },
        {
          key: 'sectioned-teeth',
          name: {
            en: 'sectioned teeth',
          },
        },
        {
          key: 'other',
          name: {
            en: 'other',
          },
        },
      ],
      selectableValues: [
        {
          key: 'juvenile',
          name: {
            en: 'juvenile ',
            sv: 'juvenil',
          },
        },
      ],
    },
    id: '1',
    type: 'featureType',
  },
]

const transformInputWithFeatureTypes = input => {
  return transformInput({
    featureTypes,
    ...input,
  })
}

const scopedTransformOutput = formData => {
  return transformOutput({
    specimen: {
      individual: formData,
    },
  })
}

// const nonNormalizingTransformOutput = output => {
//   return transformOutput(output, false)
// }

uiDescribe(
  'domainModules/collectionMammals/components/MammalForm/Scenarios',
  () => {
    runFormScenarios({
      FormComponent: MammalForm,
      formName: 'mammalForm',
      mount: true,
      scenarios,
      transformInput: transformInputWithFeatureTypes,
      transformOutput: scopedTransformOutput,
    })
  }
)
