import React from 'react'
import setupTestComponent from 'utilities/test/setupTestComponent'

export default function createMountedForm({
  FormComponent,
  formInitialValues,
  formName,
  formOptions = {},
  initialState,
}) {
  const handleFormSubmit = data => {
    return Promise.resolve(data)
  }
  const { store, rootComponent: mountedComponent } = setupTestComponent({
    component: (
      <FormComponent
        handleFormSubmit={handleFormSubmit}
        initialData={formInitialValues}
        {...formOptions}
      />
    ),
    fullExport: true,
    initialState,
  })

  return {
    formName,
    mountedComponent,
    store,
  }
}
