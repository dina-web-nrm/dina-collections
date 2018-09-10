// import React from 'react'
// import 'common/dist/semantic.css' // eslint-disable-line
// import PropTypes from 'prop-types'
// import createStoryDecorator from 'utilities/test/createStoryDecorator'
// import { action } from '@storybook/addon-actions' // eslint-disable-line
// import { storiesOf } from '@storybook/react' // eslint-disable-line

// import { reduxForm } from 'redux-form'
// import { Field } from 'coreModules/form/components'
// import Remarks from './index'

// export const actions = {
//   onRemarks: action('onClick', 'Add remarks'),
// }

// const parameterKey = 'collectionItems.remarks'
// const fieldName = 'remarks'
// const someField = 'someField'

// const input = {
//   name: 'remarks',
//   value: 'Some added remarks',
// }

// const Parent = ({ children }) => {
//   return <form>{children}</form>
// }

// Parent.propTypes = {
//   children: PropTypes.object.isRequired,
// }

// const FormWrapper = reduxForm({ form: 'remarksForm' })(Parent)

// storiesOf('coreModules/form/Fields/Remarks', module)
//   .addDecorator(createStoryDecorator({}))
//   .add('default', () => (
//     <FormWrapper>
//       <Field
//         autoComplete="off"
//         component={Remarks}
//         module="collectionMammals"
//         name={someField}
//         parameterKey={parameterKey}
//       />
//     </FormWrapper>
//   ))
//   .add('existingRemark', () => (
//     <FormWrapper>
//       <Field
//         autoComplete="off"
//         component={Remarks}
//         input={input}
//         module="collectionMammals"
//         name={fieldName}
//         parameterKey={parameterKey}
//       />
//     </FormWrapper>
//   ))
//   .add('noRemark', () => (
//     <FormWrapper>
//       <Field
//         autoComplete="off"
//         component={Remarks}
//         module="collectionMammals"
//         name={someField}
//         parameterKey={parameterKey}
//       />
//     </FormWrapper>
//   ))
//   .add('addRemark', () => (
//     <FormWrapper>
//       <Field
//         autoComplete="off"
//         component={Remarks}
//         module="collectionMammals"
//         name={someField}
//         parameterKey={parameterKey}
//       />
//     </FormWrapper>
//   ))
//   .add('editRemark', () => (
//     <FormWrapper>
//       <Field
//         autoComplete="off"
//         component={Remarks}
//         input={input}
//         module="collectionMammals"
//         name={fieldName}
//         parameterKey={parameterKey}
//       />
//     </FormWrapper>
//   ))
//   .add('editRemark without help symbol', () => (
//     <FormWrapper>
//       <Field
//         autoComplete="off"
//         component={Remarks}
//         enableHelpNotifications={false}
//         input={input}
//         module="collectionMammals"
//         name={fieldName}
//         parameterKey={parameterKey}
//       />
//     </FormWrapper>
//   ))
//   .add('remarks custom label', () => (
//     <FormWrapper>
//       <Field
//         autoComplete="off"
//         component={Remarks}
//         enableHelpNotifications={false}
//         input={input}
//         label="The label text"
//         module="collectionMammals"
//         name={fieldName}
//         parameterKey={parameterKey}
//       />
//     </FormWrapper>
//   ))
