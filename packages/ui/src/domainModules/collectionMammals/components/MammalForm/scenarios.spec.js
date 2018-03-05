/* eslint-disable no-console, prefer-destructuring */
import uiDescribe from 'utilities/test/uiDescribe'
import runFormScenarios from 'utilities/test/formScenarioRunner'
import MammalForm from 'domainModules/collectionMammals/components/MammalForm'
import transformInput from './transformations/input'
import transformOutput from './transformations/output'

uiDescribe(
  'domainModules/collectionMammals/components/MammalForm/scenarios',
  () => {
    const scenarios = [
      {
        expectedOutput: {
          individualGroup: {
            distinguishedUnits: [],
            featureObservations: [],
            identifiers: [
              {
                identifier: {
                  identifierType: 'catalogNumber',
                  nameSpace: '',
                  value: '123456',
                },
                publishRecord: false,
                remarks: '',
              },
            ],

            individualCircumstances: [],
            taxonInformation: {
              determinations: [
                {
                  date: 'date',
                },
              ],
            },
          },
        },
        mutations: [
          { name: 'taxonInformation.determinations.0.date', value: 'date' },
          {
            name: 'identifiers.0.identifier.value',
            value: '123456',
          },
        ],
        name: 'No input - no manipulations',
      },
    ]
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
