import React from 'react'
import 'common/dist/semantic.css' // eslint-disable-line
import PropTypes from 'prop-types'
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import { action } from '@storybook/addon-actions' // eslint-disable-line
import { storiesOf } from '@storybook/react' // eslint-disable-line

import { reduxForm } from 'redux-form'
import { Field } from 'coreModules/form/components'
import Remarks from './index'

const parameterKey = 'collectionItems.remarks'
const fieldName = 'remarks'
const someField = 'someField'

const input = {
  name: 'remarks',
  value: 'Some added remarks',
}

const Parent = ({ children }) => {
  return <form>{children}</form>
}

Parent.propTypes = {
  children: PropTypes.object.isRequired,
}

const FormWrapper = reduxForm({ form: 'remarksForm' })(Parent)

storiesOf('coreModules/form/Fields/Remarks', module)
  .addDecorator(createStoryDecorator({}))
  .add('emptyState', () => (
    <FormWrapper>
      <Field
        autoComplete="off"
        component={Remarks}
        isLatestActiveField
        module="collectionMammals"
        name={someField}
        parameterKey={parameterKey}
        setAsLatestActiveField={action('setAsLatestActiveField')}
      />
    </FormWrapper>
  ))
  .add('existingRemarkWithPrefixedText', () => (
    <FormWrapper>
      <Field
        autoComplete="off"
        component={Remarks}
        input={input}
        isLatestActiveField
        module="collectionMammals"
        name={fieldName}
        parameterKey={parameterKey}
        resultPrefix="Taxon"
        setAsLatestActiveField={action('setAsLatestActiveField')}
      />
    </FormWrapper>
  ))
  .add('existingRemarkWithOutPrefixedText', () => (
    <FormWrapper>
      <Field
        autoComplete="off"
        component={Remarks}
        input={input}
        isLatestActiveField
        module="collectionMammals"
        name={fieldName}
        parameterKey={parameterKey}
        setAsLatestActiveField={action('setAsLatestActiveField')}
      />
    </FormWrapper>
  ))
