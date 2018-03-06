import React from 'react'
import setupTestComponent from 'utilities/test/setupTestComponent'

export default function createMountedForm({
  FormComponent,
  formInitialValues,
  formName,
  formOptions = {},
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
  })

  return {
    formName,
    mountedComponent,
    store,
  }
}
