/* eslint-disable no-console, prefer-destructuring */
import React from 'react'
import uiDescribe from 'utilities/test/uiDescribe'
import setupTestComponent from 'utilities/test/setupTestComponent'
import MammalForm from 'domainModules/collectionMammals/components/MammalForm'
import transformInput from '../transformations/input'
import transformOutput from '../transformations/output'
import { dep } from '../../../middleware'

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
      return Promise.resolve(transformOutput(data))
    }
  })

  it('Is initialized with empty determination', () => {
    const { store } = setupTestComponent({
      component: (
        <MammalForm
          handleFormSubmit={handleFormSubmit}
          initialValues={transformInput({})}
        />
      ),
      fullExport: true,
    })

    hasOneEmptyDetermination(store)
  })

  it('adds empty determination in transformOutput, if all determinations have been removed', () => {
    const { store, rootComponent } = setupTestComponent({
      component: (
        <MammalForm
          handleFormSubmit={handleFormSubmit}
          initialValues={transformInput({})}
        />
      ),
      fullExport: true,
    })

    hasOneEmptyDetermination(store)

    const removeDeterminationButton = rootComponent
      .find('Accordion')
      .find('Button')
      .at(2)
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
    expect(
      output.specimen.individualGroup.taxonInformation.determinations.length
    ).toBe(1)
    expect(
      Object.keys(
        output.specimen.individualGroup.taxonInformation.determinations[0]
      ).length
    ).toBe(0)
    expect(submitFailed).toBe(undefined)
  })

  it('adds empty determination when clicking "Add determination"', () => {
    const { store, rootComponent } = setupTestComponent({
      component: (
        <MammalForm
          handleFormSubmit={handleFormSubmit}
          initialValues={transformInput({})}
        />
      ),
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
      .at(3)

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
      component: (
        <MammalForm
          handleFormSubmit={handleFormSubmit}
          initialValues={transformInput({})}
        />
      ),
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
      .at(3)

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
        component: (
          <MammalForm
            handleFormSubmit={handleFormSubmit}
            initialValues={transformInput({})}
          />
        ),
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
        .at(3)

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
})
