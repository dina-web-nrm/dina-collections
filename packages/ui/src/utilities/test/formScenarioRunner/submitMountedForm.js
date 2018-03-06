export default function submitMountedForm({
  mountedComponent,
  store,
  formName,
}) {
  const form = mountedComponent.find('form')
  form.simulate('submit')
  const formState = store.getState().form[formName]
  const { registeredFields, submitFailed, syncErrors, values } = formState
  return { registeredFields, submitFailed, syncErrors, values }
}
