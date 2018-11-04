import transformFormSpecToFieldMap from './transformFormSpecToFieldMap'

describe('coreModules/form/utilities/transformFormSpecToFieldMap', () => {
  test('it transforms form spec with sections, units and parts to map with field name as key', () => {
    const testValue = transformFormSpecToFieldMap([
      {
        name: 'basicInformation',
        units: [
          {
            name: 'specimenRoot',
            parts: [
              {
                componentName: 'TranslatedHeader',
                componentProps: {
                  as: 'h2',
                  columnProps: {
                    width: 12,
                  },
                  textKey: 'headers.basicInformation',
                },
              },
              {
                componentName: 'Checkbox',
                componentProps: {
                  columnProps: {
                    width: 4,
                  },
                  inline: true,
                  model: 'specimen',
                  textKey: 'public',
                },
                name: 'publishRecord',
                wrapInField: true,
              },
            ],
          },
          {
            name: 'identifiers',
            parts: [
              {
                componentName: 'TranslatedHeader',
                componentProps: {
                  as: 'h3',
                  textKey: 'headers.identifiers',
                },
              },
              {
                componentName: 'IdentifiersTable',
                containsReduxFormField: true,
                name: 'individual.identifiers',
                relativeNames: ['identifierType.id', 'value'],
              },
            ],
          },
        ],
      },
      {
        name: 'collectingDeath',
        units: [
          {
            initiallyHiddenFields: [],
            name: 'collectingDate',
            parts: [
              {
                componentName: 'TranslatedHeader',
                componentProps: {
                  as: 'h3',
                  textKey: 'headers.collectingDate',
                },
              },
              {
                componentName: 'RangeDate',
                componentProps: {
                  displayDateTypeRadios: true,
                  initialDateType: 'range',
                },
                name: 'individual.collectingInformation.0.event.dateRange',
                wrapInField: true,
              },
            ],
          },
        ],
      },
    ])

    const expectedResult = {
      'individual.collectingInformation.0.event.dateRange': {
        componentName: 'RangeDate',
        componentProps: {
          displayDateTypeRadios: true,
          initialDateType: 'range',
        },
        name: 'individual.collectingInformation.0.event.dateRange',
        section: 'collectingDeath',
        unit: 'collectingDate',
        wrapInField: true,
      },
      'individual.identifiers.*.identifierType.id': {
        baseName: 'individual.identifiers',
        componentName: 'IdentifiersTable',
        containsReduxFormField: true,
        name: 'individual.identifiers.*.identifierType.id',
        section: 'basicInformation',
        unit: 'identifiers',
      },
      'individual.identifiers.*.value': {
        baseName: 'individual.identifiers',
        componentName: 'IdentifiersTable',
        containsReduxFormField: true,
        name: 'individual.identifiers.*.value',
        section: 'basicInformation',
        unit: 'identifiers',
      },
      publishRecord: {
        componentName: 'Checkbox',
        componentProps: {
          columnProps: {
            width: 4,
          },
          inline: true,
          model: 'specimen',
          textKey: 'public',
        },
        name: 'publishRecord',
        section: 'basicInformation',
        unit: 'specimenRoot',
        wrapInField: true,
      },
    }

    expect(testValue).toEqual(expectedResult)
  })
})
