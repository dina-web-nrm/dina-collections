import runFormScenarios from 'utilities/test/formScenarioRunner'
import uiDescribe from 'utilities/test/uiDescribe'
import MammalForm from 'domainModules/collectionMammals/components/MammalForm'
// import transformInput from 'domainModules/collectionMammals/components/MammalForm/transformations/input'
import transformOutput from 'domainModules/collectionMammals/components/MammalForm/transformations/output'
// import transformOutput from 'domainModules/collectionMammals/components/MammalForm/transformations/output'
// import registerNewWithAllFields from './registerNewWithAllFields'
// import registerWithNoCatalogNumberProvided from './registerWithNoCatalogNumberProvided'
// import registerWithCatalogNumberProvided from './registerWithCatalogNumberProvided'
// import updateExistingRecord from './updateExistingRecord'

const scenarios = [
  // registerNewWithAllFields,
  // registerWithCatalogNumberProvided,
  // registerWithNoCatalogNumberProvided,
  // updateExistingRecord,
]

// const nonDenormalizingTransformInput = input => {
//   return transformInput({
//     ...input,
//     denormalize: false,
//   })
// }

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
      transformOutput,
    })
  }
)
