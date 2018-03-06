import runFormScenarios from 'utilities/test/formScenarioRunner'
import uiDescribe from 'utilities/test/uiDescribe'
import MammalForm from 'domainModules/collectionMammals/components/MammalForm'
import transformInput from 'domainModules/collectionMammals/components/MammalForm/transformations/input'
import transformOutput from 'domainModules/collectionMammals/components/MammalForm/transformations/output'
import registerNewWithAllFields from './registerNewWithAllFields'
import registerWithNoCatalogNumberProvided from './registerWithNoCatalogNumberProvided'
import registerWithCatalogNumberProvided from './registerWithCatalogNumberProvided'
import updateExistingRecord from './updateExistingRecord'

const scenarios = [
  registerNewWithAllFields,
  registerWithCatalogNumberProvided,
  registerWithNoCatalogNumberProvided,
  updateExistingRecord,
]

uiDescribe(
  'domainModules/collectionMammals/components/MammalForm/Scenarios',
  () => {
    runFormScenarios({
      FormComponent: MammalForm,
      formName: 'mammalForm',
      mount: true,
      scenarios,
      transformInput,
      transformOutput,
    })
  }
)
