/* eslint-disable no-console, prefer-destructuring */
import React from 'react'
import uiDescribe from 'utilities/test/uiDescribe'
import setupTestComponent from 'utilities/test/setupTestComponent'
import simulateFormFieldChanges from 'utilities/test/simulateFormFieldChanges'
import MammalForm from 'domainModules/collectionMammals/components/MammalForm'
import transformOutput from './transformations/output'
import { dep } from '../../middleware'

const hasOneEmptyDetermination = store => {
  expect(
    store.getState().form.mammalForm.values.taxonInformation.determinations
  ).toBeTruthy()
  expect(
    store.getState().form.mammalForm.values.taxonInformation.determinations
      .length
  ).toBe(1)
  expect(
    Object.keys(
      store.getState().form.mammalForm.values.taxonInformation.determinations[0]
    ).length
  ).toBe(0)
}

uiDescribe('domainModules/collectionMammals/components/MammalForm', () => {
  let handleFormSubmit
  beforeEach(() => {
    handleFormSubmit = data => {
      return Promise.resolve(data)
    }
  })

  it('renders without crashing', () => {
    setupTestComponent({
      component: <MammalForm handleFormSubmit={handleFormSubmit} />,
    })
  })

  it('Is initialized in form state', () => {
    const { store } = setupTestComponent({
      component: <MammalForm handleFormSubmit={handleFormSubmit} />,
      fullExport: true,
    })

    expect(store.getState().form.mammalForm).toBeTruthy()
  })

  it('Is initialized with empty determination', () => {
    const { store } = setupTestComponent({
      component: <MammalForm handleFormSubmit={handleFormSubmit} />,
      fullExport: true,
    })

    hasOneEmptyDetermination(store)
  })

  it('adds empty determination in transformOutput, if all determinations have been removed', () => {
    const { store, rootComponent } = setupTestComponent({
      component: <MammalForm handleFormSubmit={handleFormSubmit} />,
      fullExport: true,
    })

    hasOneEmptyDetermination(store)

    const removeDeterminationButton = rootComponent
      .find('Accordion')
      .find('Button')
      .at(1)
    removeDeterminationButton.simulate('click')

    // all determinations removed
    expect(
      store.getState().form.mammalForm.values.taxonInformation.determinations
        .length
    ).toBe(0)

    const form = rootComponent.find('form')
    form.simulate('submit')

    const {
      submitFailed,
      values,
      syncErrors,
    } = store.getState().form.mammalForm
    expect(syncErrors).toBe(undefined)
    const output = transformOutput(values)
    // should now have empty identification
    expect(output.individualGroup.taxonInformation.determinations.length).toBe(
      1
    )
    expect(
      Object.keys(output.individualGroup.taxonInformation.determinations[0])
        .length
    ).toBe(0)
    expect(submitFailed).toBe(undefined)
  })

  it('adds empty determination when clicking "Add determination"', () => {
    const { store, rootComponent } = setupTestComponent({
      component: <MammalForm handleFormSubmit={handleFormSubmit} />,
      fullExport: true,
    })

    expect(
      store.getState().form.mammalForm.values.taxonInformation.determinations
        .length
    ).toBe(1)

    const addDeterminationButton = rootComponent
      .find('Segment')
      .at(1)
      .find('Button')
      .at(2)

    addDeterminationButton.simulate('click')
    addDeterminationButton.simulate('click')
    addDeterminationButton.simulate('click')

    expect(
      store.getState().form.mammalForm.values.taxonInformation.determinations
        .length
    ).toBe(4)
  })

  it('sets other determinations as not current when setting one as current', () => {
    const { store, rootComponent } = setupTestComponent({
      component: <MammalForm handleFormSubmit={handleFormSubmit} />,
      fullExport: true,
    })

    expect(
      store.getState().form.mammalForm.values.taxonInformation.determinations
        .length
    ).toBe(1)
    const addDeterminationButton = rootComponent
      .find('Segment')
      .at(1)
      .find('Button')
      .at(2)

    addDeterminationButton.simulate('click')
    addDeterminationButton.simulate('click')

    expect(
      store.getState().form.mammalForm.values.taxonInformation.determinations
        .length
    ).toBe(3)

    let {
      determinations,
    } = store.getState().form.mammalForm.values.taxonInformation
    expect(determinations[0].isCurrentDetermination).toBeFalsy()
    expect(determinations[1].isCurrentDetermination).toBeFalsy()
    expect(determinations[2].isCurrentDetermination).toBeFalsy()

    const checkbox1 = rootComponent
      .find('[name="taxonInformation.determinations.0.isCurrentDetermination"]')
      .find('Checkbox')
    const checkbox2 = rootComponent
      .find('[name="taxonInformation.determinations.1.isCurrentDetermination"]')
      .find('Checkbox')
    const checkbox3 = rootComponent
      .find('[name="taxonInformation.determinations.2.isCurrentDetermination"]')
      .find('Checkbox')

    // check first box
    checkbox1.simulate('click')
    determinations = store.getState().form.mammalForm.values.taxonInformation
      .determinations
    expect(determinations[0].isCurrentDetermination).toBe(true)
    expect(determinations[1].isCurrentDetermination).toBeFalsy()
    expect(determinations[2].isCurrentDetermination).toBeFalsy()
    // check second box, first should be unchecked
    checkbox2.simulate('click')
    determinations = store.getState().form.mammalForm.values.taxonInformation
      .determinations
    expect(determinations[0].isCurrentDetermination).toBeFalsy()
    expect(determinations[1].isCurrentDetermination).toBe(true)
    expect(determinations[2].isCurrentDetermination).toBeFalsy()

    // check third box, second should be unchecked
    checkbox3.simulate('click')
    determinations = store.getState().form.mammalForm.values.taxonInformation
      .determinations
    expect(determinations[0].isCurrentDetermination).toBeFalsy()
    expect(determinations[1].isCurrentDetermination).toBeFalsy()
    expect(determinations[2].isCurrentDetermination).toBe(true)
    // uncheck third box
    checkbox3.simulate('click')
    determinations = store.getState().form.mammalForm.values.taxonInformation
      .determinations
    expect(determinations[0].isCurrentDetermination).toBeFalsy()
    expect(determinations[1].isCurrentDetermination).toBeFalsy()
    expect(determinations[2].isCurrentDetermination).toBe(false)
  })

  describe('with Dependor', () => {
    let mockCreateNotification
    beforeEach(() => {
      mockCreateNotification = jest.fn()
      dep.freeze()

      dep.mock({
        createNotification: () => {
          return mockCreateNotification
        },
      })
    })

    afterEach(() => {
      dep.reset()
    })

    it('creates notification when setting current determination if other was previously set as current', () => {
      const { store, rootComponent } = setupTestComponent({
        component: <MammalForm handleFormSubmit={handleFormSubmit} />,
        fullExport: true,
      })

      expect(
        store.getState().form.mammalForm.values.taxonInformation.determinations
          .length
      ).toBe(1)

      const addDeterminationButton = rootComponent
        .find('Segment')
        .at(1)
        .find('Button')
        .at(2)

      addDeterminationButton.simulate('click')

      let {
        determinations,
      } = store.getState().form.mammalForm.values.taxonInformation
      expect(determinations[0].isCurrentDetermination).toBeFalsy()
      expect(determinations[1].isCurrentDetermination).toBeFalsy()

      const checkbox1 = rootComponent
        .find(
          '[name="taxonInformation.determinations.0.isCurrentDetermination"]'
        )
        .find('Checkbox')
      const checkbox2 = rootComponent
        .find(
          '[name="taxonInformation.determinations.1.isCurrentDetermination"]'
        )
        .find('Checkbox')

      // check first box
      checkbox1.simulate('click')
      determinations = store.getState().form.mammalForm.values.taxonInformation
        .determinations
      expect(determinations[0].isCurrentDetermination).toBe(true)
      expect(determinations[1].isCurrentDetermination).toBeFalsy()

      // check second box, first should be unchecked and createNotification dispatched
      checkbox2.simulate('click')
      determinations = store.getState().form.mammalForm.values.taxonInformation
        .determinations
      expect(determinations[0].isCurrentDetermination).toBeFalsy()
      expect(determinations[1].isCurrentDetermination).toBe(true)
      expect(mockCreateNotification.mock.calls.length).toBe(1)
    })
  })

  it('Submit success when no catalog number provided', () => {
    const { store, rootComponent: mountedComponent } = setupTestComponent({
      component: <MammalForm handleFormSubmit={handleFormSubmit} />,
      fullExport: true,
    })

    const form = mountedComponent.find('form')
    form.simulate('submit')
    expect(store.getState().form.mammalForm.submitFailed).toBe(undefined)
  })

  it('Submit success when catalog number provided', () => {
    const { store, rootComponent: mountedComponent } = setupTestComponent({
      component: <MammalForm handleFormSubmit={handleFormSubmit} />,
      fullExport: true,
    })

    const form = mountedComponent.find('form')
    simulateFormFieldChanges(form, [
      {
        name: 'identifiers.0.identifier.value',
        value: '123456',
      },
    ])
    form.simulate('submit')
    expect(store.getState().form.mammalForm.submitFailed).toBe(undefined)
  })

  it('Submit success when all fields set', () => {
    const mutations = [
      { name: 'taxonInformation.determinations.0.date', value: 'date' },
      {
        name: 'taxonInformation.determinations.0.determinationVerbatim',
        value: 'determinationVerbatim',
      },
      {
        name: 'taxonInformation.determinations.0.determinedByAgentText',
        value: 'determinedByAgentText',
      },
      {
        name: 'taxonInformation.determinations.0.isCurrentDetermination',
        value: true,
      },
      { name: 'taxonInformation.determinations.0.remarks', value: 'remarks' },
      {
        ignore: false,
        name: 'taxonInformation.determinations.0.taxonNameStandardized',
        value: 'Sorex minutus',
      },
      {
        ignore: true,
        name: 'taxonInformation.determinations.0.taxonNameStandardized.hidden',
        value: 'Sorex minutus',
      },
      {
        id: 'add-feature-observation',
        ignore: true,
        interaction: 'click',
      },
      {
        interaction: 'click',
        name: 'featureObservations.0.featureObservationType.typeName',
        selector: ({ form, name }) => {
          return form
            .find({ name })
            .find('.item')
            .at(0)
            .hostNodes()
        },
      },
      {
        name: 'featureObservations.0.date',
        value: 'date',
      },
      {
        name: 'featureObservations.0.featureObservationAgent',
        value: 'featureObservationAgent',
      },
      {
        name: 'featureObservations.0.featureObservationText',
        value: '21',
      },
      {
        name: 'featureObservations.0.methodText',
        value: 'methodText',
      },
      {
        name: 'distinguishedUnits.0.alternateIdentifiersText',
        value: 'alternateIdentifiersText',
      },
      {
        name: 'distinguishedUnits.0.physicalUnit.normalStorageLocationText',
        value: 'normalStorageLocationText',
      },
      {
        name: 'distinguishedUnits.0.physicalUnit.storedUnderTaxonName',
        value: 'Sorex minutus',
      },
      {
        name: 'distinguishedUnits.0.physicalUnitText',
        value: 'physicalUnitText',
      },
      {
        name: 'identifiers.0.publishRecord',
        value: true,
      },
      {
        name: 'identifiers.0.identifier.value',
        value: '123456',
      },
      {
        name: 'individualCircumstances.0.collectorsText',
        value: 'collectorsText',
      },
      {
        name: 'individualCircumstances.0.event.endDate',
        value: 'endDate',
      },
      {
        name: 'individualCircumstances.0.event.expeditionText',
        value: 'expeditionText',
      },
      {
        name:
          'individualCircumstances.0.event.localityInformation.coordinatesVerbatim',
        value: 'coordinatesVerbatim',
      },
      {
        interaction: 'click',
        name:
          'individualCircumstances.0.event.localityInformation.curatedLocalities.0.id',
        selector: ({ form, name }) => {
          return form
            .find({ name })
            .find('.item')
            .at(0)
            .hostNodes()
        },
      },
      {
        interaction: 'click',
        name:
          'individualCircumstances.0.event.localityInformation.curatedLocalities.1.id',
        selector: ({ form, name }) => {
          return form
            .find({ name })
            .find('.item')
            .at(0)
            .hostNodes()
        },
      },
      {
        interaction: 'click',
        name:
          'individualCircumstances.0.event.localityInformation.curatedLocalities.2.id',
        selector: ({ form, name }) => {
          return form
            .find({ name })
            .find('.item')
            .at(0)
            .hostNodes()
        },
      },
      {
        interaction: 'click',
        name:
          'individualCircumstances.0.event.localityInformation.curatedLocalities.3.id',
        selector: ({ form, name }) => {
          return form
            .find({ name })
            .find('.item')
            .at(0)
            .hostNodes()
        },
      },
      {
        name:
          'individualCircumstances.0.event.localityInformation.curatedLocalities.4.id',
        value: 'Skansen',
      },
      {
        name:
          'individualCircumstances.0.event.localityInformation.georeferenceSourcesText',
        value: 'georeferenceSourcesText',
      },
      {
        name:
          'individualCircumstances.0.event.localityInformation.localityVerbatim',
        value: 'localityVerbatim',
      },
      {
        name: 'individualCircumstances.0.event.localityInformation.remarks',
        value: 'remarks',
      },
      {
        name:
          'individualCircumstances.0.event.localityInformation.position.geodeticDatum',
        value: 'geodeticDatum text',
      },
      {
        name:
          'individualCircumstances.0.event.localityInformation.position.latitude',
        value: 'latitude-string',
      },
      {
        name:
          'individualCircumstances.0.event.localityInformation.position.longitude',
        value: 'longitude-string',
      },
      {
        name:
          'individualCircumstances.0.event.localityInformation.position.uncertaintyInMeters',
        value: 10,
      },
      {
        name:
          'individualCircumstances.0.event.localityInformation.verticalPosition.maximumDepthInMeters',
        value: 100,
      },
      {
        name:
          'individualCircumstances.0.event.localityInformation.verticalPosition.maximumElevationInMeters',
        value: 100,
      },
      {
        name:
          'individualCircumstances.0.event.localityInformation.verticalPosition.minimumDepthInMeters',
        value: 20,
      },
      {
        name:
          'individualCircumstances.0.event.localityInformation.verticalPosition.minimumElevationInMeters',
        value: 20,
      },
      {
        name: 'individualCircumstances.0.event.startDate',
        value: 'startDate',
      },
    ]

    const expectedOutput = {
      individualGroup: {
        distinguishedUnits: [
          {
            alternateIdentifiersText: 'alternateIdentifiersText',
            physicalUnit: {
              normalStorageLocationText: 'normalStorageLocationText',
              storedUnderTaxonName: 'Sorex minutus',
            },
            physicalUnitText: 'physicalUnitText',
          },
        ],
        featureObservations: [
          {
            date: 'date',
            featureObservationAgent: 'featureObservationAgent',
            featureObservationText: '21',
            featureObservationType: {
              id: '3',
              typeName: 'age',
            },
            methodText: 'methodText',
          },
        ],

        identifiers: [
          {
            identifier: {
              identifierType: 'catalogNumber',
              nameSpace: '',
              value: '123456',
            },
            publishRecord: true,
            remarks: '',
          },
        ],
        individualCircumstances: [
          {
            collectorsText: 'collectorsText',
            event: {
              endDate: 'endDate',
              expeditionText: 'expeditionText',
              localityInformation: {
                coordinatesVerbatim: 'coordinatesVerbatim',
                curatedLocalities: [
                  { id: 'Africa', type: 'continent' },
                  { id: 'Algeria', type: 'country' },
                  { id: 'Balearic Islands', type: 'province' },
                  { id: 'GaspÃ© Peninsula', type: 'district' },
                  { id: 'Skansen', type: 'locality' },
                ],
                georeferenceSourcesText: 'georeferenceSourcesText',
                localityVerbatim: 'localityVerbatim',
                position: {
                  geodeticDatum: 'geodeticDatum text',
                  latitude: 'latitude-string',
                  longitude: 'longitude-string',
                  uncertaintyInMeters: 10,
                },
                remarks: 'remarks',
                verticalPosition: {
                  maximumDepthInMeters: 100,
                  maximumElevationInMeters: 100,
                  minimumDepthInMeters: 20,
                  minimumElevationInMeters: 20,
                },
              },
              startDate: 'startDate',
            },
          },
        ],
        taxonInformation: {
          determinations: [
            {
              date: 'date',
              determinationVerbatim: 'determinationVerbatim',
              determinedByAgentText: 'determinedByAgentText',
              isCurrentDetermination: true,
              remarks: 'remarks',
              taxonNameStandardized: 'Sorex minutus',
            },
          ],
        },
      },
    }

    const { store, rootComponent: mountedComponent } = setupTestComponent({
      component: <MammalForm handleFormSubmit={handleFormSubmit} />,
      fullExport: true,
    })

    let form = mountedComponent.find('form')
    simulateFormFieldChanges(mountedComponent, mutations)

    let formState = store.getState().form.mammalForm

    expect(formState.syncErrors).toBe(undefined)
    form = mountedComponent.find('form')
    form.simulate('submit')

    formState = store.getState().form.mammalForm
    const { registeredFields, submitFailed, syncErrors, values } = formState

    expect(
      mutations
        .filter(({ ignore }) => !ignore)
        .map(mutation => mutation.name)
        .sort()
    ).toMatchObject(Object.keys(registeredFields).sort())
    expect(transformOutput(values)).toEqual(expectedOutput)
    expect(syncErrors).toBe(undefined)
    expect(submitFailed).toBe(undefined)
  })

  it('Submit success when loaded with existing individual group', () => {
    const individualGroup = {
      attributes: {
        distinguishedUnits: [
          {
            physicalUnit: {
              storedUnderTaxonName: 'Chironectes minimus',
            },
          },
        ],
        featureObservations: [
          {
            featureObservationText: 'female',
            featureObservationType: {
              id: '1',
              typeName: 'sex',
            },
          },
        ],
        identifiers: [
          {
            identifier: {
              identifierType: 'catalogNumber',
              value: '444444',
            },
          },
        ],
        taxonInformation: {
          determinations: [
            {
              taxonNameStandardized: 'Chironectes minimus',
            },
          ],
        },
      },
      id: '2',
      type: 'individualGroup',
    }

    const { rootComponent: mountedComponent, store } = setupTestComponent({
      component: (
        <MammalForm
          handleFormSubmit={handleFormSubmit}
          individualGroup={{
            ...individualGroup.attributes,
            id: individualGroup.id,
          }}
          transformOutputForUpdate
        />
      ),
      fullExport: true,
    })

    const form = mountedComponent.find('form')
    const catalogedNumberInput = form
      .find({
        name: 'identifiers.0.identifier.value',
      })
      .hostNodes()

    expect(catalogedNumberInput.props().value).toBe('444444')
    form.simulate('submit')

    expect(store.getState().form.mammalForm.submitFailed).toBe(undefined)
  })
})
