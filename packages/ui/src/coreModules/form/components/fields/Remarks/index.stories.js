import React from 'react'
import 'common/dist/semantic.css' // eslint-disable-line
import PropTypes from 'prop-types'
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import { action } from '@storybook/addon-actions' // eslint-disable-line
import { storiesOf } from '@storybook/react' // eslint-disable-line

import { reduxForm } from 'redux-form'
import Remarks from './index'

export const actions = {
  onRemarks: action('onClick', 'Add remarks'),
}

export const remarks = 'Some added remarks'
export const moduleName = 'collectionMammals'
export const parameterKey = 'collectionItems.remarks'
export const fieldName = 'remarks'
export const someField = 'someField'

const initialState = {
  form: {
    remarksForm: {
      values: {
        remarks,
      },
    },
  },
}

const Parent = ({ children }) => {
  return <form>{children}</form>
}

Parent.propTypes = {
  children: PropTypes.object.isRequired,
}

const FormWrapper = reduxForm({ form: 'remarksForm' })(Parent)

storiesOf('coreModules/form/Fields/Remarks', module)
  .addDecorator(createStoryDecorator({ initialState }))
  .add('default', () => (
    <FormWrapper>
      <Remarks
        formName="remarksForm"
        module={moduleName}
        name={someField}
        parameterKey={parameterKey}
      />
    </FormWrapper>
  ))
  .add('existingRemark', () => (
    <FormWrapper>
      <Remarks
        formName="remarksForm"
        module={moduleName}
        name={fieldName}
        parameterKey={parameterKey}
      />
    </FormWrapper>
  ))
  .add('noRemark', () => (
    <FormWrapper>
      <Remarks
        formName="remarksForm"
        module={moduleName}
        name={someField}
        parameterKey={parameterKey}
      />
    </FormWrapper>
  ))
  .add('addRemark', () => (
    <FormWrapper>
      <Remarks
        formName="remarksForm"
        module={moduleName}
        name={someField}
        parameterKey={parameterKey}
      />
    </FormWrapper>
  ))
  .add('editRemark', () => (
    <FormWrapper>
      <Remarks
        formName="remarksForm"
        module={moduleName}
        name={fieldName}
        parameterKey={parameterKey}
      />
    </FormWrapper>
  ))
  .add('editRemark without help symbol', () => (
    <FormWrapper>
      <Remarks
        enableHelpNotifications={false}
        formName="remarksForm"
        module={moduleName}
        name={fieldName}
        parameterKey={parameterKey}
      />
    </FormWrapper>
  ))
