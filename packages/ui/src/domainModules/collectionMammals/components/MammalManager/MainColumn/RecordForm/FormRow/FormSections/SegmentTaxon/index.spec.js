/* eslint-disable no-console, prefer-destructuring */
import React from 'react'
import uiDescribe from 'utilities/test/uiDescribe'
import setupTestComponent from 'utilities/test/setupTestComponent'
import MammalForm from 'domainModules/collectionMammals/components/MammalForm'
import transformInput from '../../../transformations/input'
import transformOutput from '../../../transformations/output'

const hasOneEmptyDetermination = store => {
  expect(
    store.getState().form.mammalForm.values.individual.determinations
  ).toBeTruthy()
  expect(
    store.getState().form.mammalForm.values.individual.determinations.length
  ).toBe(1)
  expect(
    Object.keys(
      store.getState().form.mammalForm.values.individual.determinations[0]
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
      store.getState().form.mammalForm.values.individual.determinations.length
    ).toBe(1)

    const addDeterminationButton = rootComponent
      .find('#add-determination')
      .at(1)

    addDeterminationButton.simulate('click')
    addDeterminationButton.simulate('click')
    addDeterminationButton.simulate('click')

    expect(
      store.getState().form.mammalForm.values.individual.determinations.length
    ).toBe(4)
  })
})
