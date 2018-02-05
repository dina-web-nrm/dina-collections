/* eslint-disable no-console, prefer-destructuring */
import React from 'react'
import setupTestComponent from 'utilities/test/setupTestComponent'
import simulateFormFieldChanges from 'utilities/test/simulateFormFieldChanges'
import MammalForm from 'domainModules/collectionMammals/components/MammalForm'
import transformOutput from './transformations/output'
import { dep } from '../../middleware'

describe('domainModules/collectionMammals/components/MammalForm', () => {
  let handleFormSubmit
  beforeEach(() => {
    handleFormSubmit = data => {
      return Promise.resolve(data)
    }
  })

  it('renders without crashing', () => {
    setupTestComponent({
      component: <MammalForm handleFormSubmit={handleFormSubmit} />,
      mount: true,
    })
  })

  it('Is initialized in form state', () => {
    const { store } = setupTestComponent({
      component: <MammalForm handleFormSubmit={handleFormSubmit} />,
      fullExport: true,
      mount: true,
    })

    expect(store.getState().form.mammalForm).toBeTruthy()
  })

  it('Is initialized with empty identification', () => {
    const { store } = setupTestComponent({
      component: <MammalForm handleFormSubmit={handleFormSubmit} />,
      fullExport: true,
      mount: true,
    })

    expect(store.getState().form.mammalForm.values.identifications).toBeTruthy()
    expect(store.getState().form.mammalForm.values.identifications.length).toBe(
      1
    )
  })

  it('adds empty identification in transformOutput, if all identifications have been removed', () => {
    const { store, rootComponent } = setupTestComponent({
      component: <MammalForm handleFormSubmit={handleFormSubmit} />,
      fullExport: true,
      mount: true,
    })

    expect(store.getState().form.mammalForm.values.identifications.length).toBe(
      1
    )

    const removeDeterminationButton = rootComponent
      .find('Accordion')
      .find('Button')
      .at(1)
    removeDeterminationButton.simulate('click')

    // all identifications removed
    expect(store.getState().form.mammalForm.values.identifications.length).toBe(
      0
    )

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
    expect(output.individualGroup.identifications.length).toBe(1)
    expect(Object.keys(output.individualGroup.identifications[0]).length).toBe(
      0
    )
    expect(submitFailed).toBe(undefined)
  })

  it('adds empty identifications when clicking "Add determination"', () => {
    const { store, rootComponent } = setupTestComponent({
      component: <MammalForm handleFormSubmit={handleFormSubmit} />,
      fullExport: true,
      mount: true,
    })

    expect(store.getState().form.mammalForm.values.identifications.length).toBe(
      1
    )

    const addDeterminationButton = rootComponent
      .find('Segment')
      .at(1)
      .find('Button')
      .at(2)

    addDeterminationButton.simulate('click')
    addDeterminationButton.simulate('click')
    addDeterminationButton.simulate('click')

    expect(store.getState().form.mammalForm.values.identifications.length).toBe(
      4
    )
  })

  it('sets other identifications as not current when setting one as current', () => {
    const { store, rootComponent } = setupTestComponent({
      component: <MammalForm handleFormSubmit={handleFormSubmit} />,
      fullExport: true,
      mount: true,
    })

    expect(store.getState().form.mammalForm.values.identifications.length).toBe(
      1
    )
    const addDeterminationButton = rootComponent
      .find('Segment')
      .at(1)
      .find('Button')
      .at(2)

    addDeterminationButton.simulate('click')
    addDeterminationButton.simulate('click')

    expect(store.getState().form.mammalForm.values.identifications.length).toBe(
      3
    )

    let { identifications } = store.getState().form.mammalForm.values
    expect(identifications[0].isCurrentIdentification).toBeFalsy()
    expect(identifications[1].isCurrentIdentification).toBeFalsy()
    expect(identifications[2].isCurrentIdentification).toBeFalsy()

    const checkbox1 = rootComponent
      .find('[name="identifications.0.isCurrentIdentification"]')
      .find('Checkbox')
    const checkbox2 = rootComponent
      .find('[name="identifications.1.isCurrentIdentification"]')
      .find('Checkbox')
    const checkbox3 = rootComponent
      .find('[name="identifications.2.isCurrentIdentification"]')
      .find('Checkbox')

    // check first box
    checkbox1.simulate('click')
    identifications = store.getState().form.mammalForm.values.identifications
    expect(identifications[0].isCurrentIdentification).toBe(true)
    expect(identifications[1].isCurrentIdentification).toBeFalsy()
    expect(identifications[2].isCurrentIdentification).toBeFalsy()
    // check second box, first should be unchecked
    checkbox2.simulate('click')
    identifications = store.getState().form.mammalForm.values.identifications
    expect(identifications[0].isCurrentIdentification).toBeFalsy()
    expect(identifications[1].isCurrentIdentification).toBe(true)
    expect(identifications[2].isCurrentIdentification).toBeFalsy()

    // check third box, second should be unchecked
    checkbox3.simulate('click')
    identifications = store.getState().form.mammalForm.values.identifications
    expect(identifications[0].isCurrentIdentification).toBeFalsy()
    expect(identifications[1].isCurrentIdentification).toBeFalsy()
    expect(identifications[2].isCurrentIdentification).toBe(true)
    // uncheck third box
    checkbox3.simulate('click')
    identifications = store.getState().form.mammalForm.values.identifications
    expect(identifications[0].isCurrentIdentification).toBeFalsy()
    expect(identifications[1].isCurrentIdentification).toBeFalsy()
    expect(identifications[2].isCurrentIdentification).toBe(false)
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

    it('creates notification when setting current identification if other was previously set as current', () => {
      const { store, rootComponent } = setupTestComponent({
        component: <MammalForm handleFormSubmit={handleFormSubmit} />,
        fullExport: true,
        mount: true,
      })

      expect(
        store.getState().form.mammalForm.values.identifications.length
      ).toBe(1)

      const addDeterminationButton = rootComponent
        .find('Segment')
        .at(1)
        .find('Button')
        .at(2)

      addDeterminationButton.simulate('click')

      let { identifications } = store.getState().form.mammalForm.values
      expect(identifications[0].isCurrentIdentification).toBeFalsy()
      expect(identifications[1].isCurrentIdentification).toBeFalsy()

      const checkbox1 = rootComponent
        .find('[name="identifications.0.isCurrentIdentification"]')
        .find('Checkbox')
      const checkbox2 = rootComponent
        .find('[name="identifications.1.isCurrentIdentification"]')
        .find('Checkbox')

      // check first box
      checkbox1.simulate('click')
      identifications = store.getState().form.mammalForm.values.identifications
      expect(identifications[0].isCurrentIdentification).toBe(true)
      expect(identifications[1].isCurrentIdentification).toBeFalsy()

      // check second box, first should be unchecked and createNotification dispatched
      checkbox2.simulate('click')
      identifications = store.getState().form.mammalForm.values.identifications
      expect(identifications[0].isCurrentIdentification).toBeFalsy()
      expect(identifications[1].isCurrentIdentification).toBe(true)
      expect(mockCreateNotification.mock.calls.length).toBe(1)
    })
  })

  it('Submit success when no catalog number provided', () => {
    const { store, rootComponent: mountedComponent } = setupTestComponent({
      component: <MammalForm handleFormSubmit={handleFormSubmit} />,
      fullExport: true,
      mount: true,
    })

    const form = mountedComponent.find('form')
    form.simulate('submit')
    expect(store.getState().form.mammalForm.submitFailed).toBe(undefined)
  })

  it('Submit success when catalog number provided', () => {
    const { store, rootComponent: mountedComponent } = setupTestComponent({
      component: <MammalForm handleFormSubmit={handleFormSubmit} />,
      fullExport: true,
      mount: true,
    })

    const form = mountedComponent.find('form')
    simulateFormFieldChanges(form, [
      {
        name: 'physicalUnits.0.catalogedUnit.catalogNumber',
        value: '123456',
      },
    ])
    form.simulate('submit')
    expect(store.getState().form.mammalForm.submitFailed).toBe(undefined)
  })

  it('Submit success when all fields set', () => {
    const mutations = [
      {
        name: 'physicalUnits.0.catalogedUnit.catalogNumber',
        value: '584028',
      },
      {
        name: 'physicalUnits.0.catalogedUnit.storedUnderTaxonName',
        value: 'Sorex minutus',
      },
      {
        name: 'physicalUnits.0.catalogedUnit.publishRecord',
        value: true,
      },
      {
        name: 'physicalUnits.0.catalogedUnit.remarks',
        value: 'some remark',
      },
      // Determination
      {
        name: 'identifications.0.isCurrentIdentification',
        value: true,
      },

      {
        name: 'identifications.0.identifiedTaxonNameStandardized',
        value: 'Chironectes minimus',
      },
      {
        name: 'identifications.0.identifiedAsVerbatim',
        value: 'Sorex minutus',
      },
      {
        name: 'identifications.0.identifiedByAgentText',
        value: 'Doe, J.',
      },
      {
        name: 'identifications.0.identifiedDateText',
        value: 'Date text',
      },
      {
        name: 'identifications.0.identificationRemarks',
        value: 'some remarks',
      },
      {
        name: 'occurrences.0.localityInformation.localityVerbatim',
        value: 'Some localityVerbatim text',
      },
      {
        interaction: 'click',
        name: 'occurrences.0.localityInformation.curatedLocalities.0.id',
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
        name: 'occurrences.0.localityInformation.curatedLocalities.1.id',
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
        name: 'occurrences.0.localityInformation.curatedLocalities.2.id',
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
        name: 'occurrences.0.localityInformation.curatedLocalities.3.id',
        selector: ({ form, name }) => {
          return form
            .find({ name })
            .find('.item')
            .at(0)
            .hostNodes()
        },
      },
      // {
      //   name: 'occurrences.0.localityInformation.curatedLocalities.0.id',
      //   value: 'Europe',
      // },
      // {
      //   name: 'occurrences.0.localityInformation.curatedLocalities.1.id',
      //   value: 'Sweden',
      // },
      // {
      //   name: 'occurrences.0.localityInformation.curatedLocalities.2.id',
      //   value: 'Stockholm',
      // },
      // {
      //   name: 'occurrences.0.localityInformation.curatedLocalities.3.id',
      //   value: 'Vasastan',
      // },
      {
        name: 'occurrences.0.localityInformation.curatedLocalities.4.id',
        value: 'Vasastan',
      },
      {
        name: 'occurrences.0.localityInformation.coordinatesVerbatim',
        value: 'coord-string',
      },
      {
        name: 'occurrences.0.localityInformation.position.latitude',
        value: 'latitude-string',
      },
      {
        name: 'occurrences.0.localityInformation.position.longitude',
        value: 'longitude-string',
      },
      {
        name: 'occurrences.0.localityInformation.position.uncertaintyInMeters',
        value: 10,
      },

      {
        name: 'occurrences.0.localityInformation.position.geodeticDatum',
        value: 'geodeticDatum text',
      },
      {
        name: 'occurrences.0.localityInformation.georeferenceSourcesText',
        value: 'georeferenceSourcesText text',
      },
      {
        name:
          'occurrences.0.localityInformation.verticalPosition.minimumElevationInMeters',
        value: 20,
      },
      {
        name:
          'occurrences.0.localityInformation.verticalPosition.maximumElevationInMeters',
        value: 100,
      },
      {
        name:
          'occurrences.0.localityInformation.verticalPosition.minimumDepthInMeters',
        value: 20,
      },
      {
        name:
          'occurrences.0.localityInformation.verticalPosition.maximumDepthInMeters',
        value: 100,
      },
      {
        name: 'occurrences.0.localityInformation.localityRemarks',
        value: 'localityRemarks text',
      },

      // Collecting information
      {
        name: 'occurrences.0.collectorsText',
        value: 'Bergström, U',
      },
      {
        name: 'occurrences.0.expeditionText',
        value: 'Vega Expedition',
      },
      {
        name: 'occurrences.0.yearStart',
        value: '1986',
      },
      {
        name: 'occurrences.0.monthStart',
        value: '1',
      },
      {
        name: 'occurrences.0.dayStart',
        value: '15',
      },
      {
        name: 'occurrences.0.occurrenceDateText',
        value: '15 jan 1986',
      },
      {
        name: 'occurrences.0.isDeathEvent',
        value: true,
      },
      {
        name: 'causeOfDeathStandardized',
        value: 'Standardized death cause',
      },
      {
        name: 'causeOfDeathText',
        value: 'Cause of death ',
      },
      {
        name: 'featureObservations.0.featureObservationText',
        value: 'A condition at collecting',
      },
      {
        name: 'originStandardized',
        value: 'Standardized origin',
      },
      {
        name: 'occurrences.0.establishmentMeansStandardized',
        value: 'establishmentMeansStandardized',
      },
      {
        name: 'physicalUnits.0.physicalUnitText',
        value: 'physicalUnitText',
      },
      {
        name: 'physicalUnits.0.normalStorageLocationText',
        value: 'normalStorageLocationText',
      },
      {
        name: 'physicalUnits.0.alternateIdentifiersText',
        value: 'alternateIdentifiersText',
      },
      {
        id: 'add-feature-observation',
        ignore: true,
        interaction: 'click',
      },
      {
        ignore: true,
        interaction: 'click',
        name:
          'featureObservations.1.featureObservationType.featureObservationTypeName',
      },
      // do like this with the curatedLocalities
      {
        interaction: 'click',
        name:
          'featureObservations.1.featureObservationType.featureObservationTypeName',
        selector: ({ form, name }) => {
          return form
            .find({ name })
            .find('.item')
            .at(0)
            .hostNodes()
        },
      },
      {
        name: 'featureObservations.1.featureObservationText',
        value: 'male',
      },
      {
        name: 'featureObservations.1.methodText',
        value: 'method text',
      },
      {
        name: 'featureObservations.1.featureObservationAgent',
        value: 'JD',
      },
      {
        name: 'featureObservations.1.featureObservationDate',
        value: 'A date',
      },
    ]

    const expectedOutput = {
      catalogedUnit: {
        catalogNumber: '584028',
        publishRecord: true,
        remarks: 'some remark',
        storedUnderTaxonName: 'Sorex minutus',
      },
      individualGroup: {
        causeOfDeathStandardized: 'Standardized death cause',
        causeOfDeathText: 'Cause of death ',
        featureObservations: [
          {
            featureObservationText: 'A condition at collecting',
            featureObservationType: {
              featureObservationTypeName: 'conditionAtCollecting',
              id: 5,
            },
          },
          {
            featureObservationAgent: 'JD',
            featureObservationDate: 'A date',
            featureObservationText: 'male',
            featureObservationType: {
              featureObservationTypeName: 'age',
              id: 3,
            },
            methodText: 'method text',
          },
        ],
        identifications: [
          {
            identificationRemarks: 'some remarks',
            identifiedAsVerbatim: 'Sorex minutus',
            identifiedByAgentText: 'Doe, J.',
            identifiedDateText: 'Date text',
            isCurrentIdentification: true,
          },
        ],
        occurrences: [
          {
            collectorsText: 'Bergström, U',
            dayEnd: 15,
            dayStart: 15,
            establishmentMeansStandardized: 'establishmentMeansStandardized',
            expeditionText: 'Vega Expedition',
            isDeathEvent: true,
            localityInformation: {
              coordinatesVerbatim: 'coord-string',
              curatedLocalities: [
                {
                  id: 'Africa',
                  type: 'continent',
                },
                {
                  id: 'Algeria',
                  type: 'country',
                },
                {
                  id: 'Balearic Islands',
                  type: 'province',
                },
                {
                  id: 'GaspÃ© Peninsula',
                  type: 'district',
                },
                {
                  id: 'Vasastan',
                  type: 'locality',
                },
              ],
              georeferenceSourcesText: 'georeferenceSourcesText text',

              localityRemarks: 'localityRemarks text',
              localityVerbatim: 'Some localityVerbatim text',

              position: {
                geodeticDatum: 'geodeticDatum text',
                latitude: 'latitude-string',
                longitude: 'longitude-string',
                uncertaintyInMeters: 10,
              },
              verticalPosition: {
                maximumDepthInMeters: 100,
                maximumElevationInMeters: 100,
                minimumDepthInMeters: 20,
                minimumElevationInMeters: 20,
              },
            },
            monthEnd: 1,
            monthStart: 1,
            occurrenceDateText: '15 jan 1986',
            yearEnd: 1986,
            yearStart: 1986,
          },
        ],
        originStandardized: 'Standardized origin',
        physicalUnits: [
          {
            alternateIdentifiersText: 'alternateIdentifiersText',
            catalogedUnit: {
              catalogNumber: '584028',
              publishRecord: true,
              remarks: 'some remark',
              storedUnderTaxonName: 'Sorex minutus',
            },
            normalStorageLocationText: 'normalStorageLocationText',
            physicalUnitText: 'physicalUnitText',
          },
        ],
      },
    }

    const { store, rootComponent: mountedComponent } = setupTestComponent({
      component: <MammalForm handleFormSubmit={handleFormSubmit} />,
      fullExport: true,
      mount: true,
    })

    const form = mountedComponent.find('form')
    simulateFormFieldChanges(mountedComponent, mutations)

    let formState = store.getState().form.mammalForm
    expect(formState.syncErrors).toBe(undefined)
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
        featureObservations: [
          {
            featureObservationText: 'female',
            featureObservationType: {
              featureObservationTypeName: 'sex',
              id: 1,
            },
          },
        ],
        identifications: [
          {
            identificationText: 'Water opossum',
            identifiedByAgentText: 'Doe, J.',
            identifiedTaxonNameStandardized: 'Chironectes minimus',
          },
        ],
        occurrences: [
          {
            id: 1,
          },
        ],
        physicalUnits: [
          {
            catalogedUnit: {
              catalogNumber: '444444',
            },
          },
        ],
      },
      id: 2,
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
      mount: true,
    })

    const form = mountedComponent.find('form')
    const catalogedNumberInput = form
      .find({
        name: 'physicalUnits.0.catalogedUnit.catalogNumber',
      })
      .hostNodes()

    expect(catalogedNumberInput.props().value).toBe('444444')
    form.simulate('submit')

    expect(store.getState().form.mammalForm.submitFailed).toBe(undefined)
  })
})
