import React from 'react'
import 'common/dist/semantic.css' // eslint-disable-line
import PropTypes from 'prop-types'
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import { action } from '@storybook/addon-actions' // eslint-disable-line
import { storiesOf } from '@storybook/react' // eslint-disable-line

import { reduxForm } from 'redux-form'
import { Field } from 'coreModules/form/components'
import SingleDate from './index'

const Parent = ({ children }) => {
  return <form>{children}</form>
}

Parent.propTypes = {
  children: PropTypes.object.isRequired,
}

const FormWrapper = reduxForm({ form: 'dateForm' })(Parent)

const fieldName = 'singleDate'

const input = {
  name: fieldName,
  onBlur: action('onBlur'),
  onChange: action('onChange'),
  onFocus: action('onFocus'),
  value: undefined,
}

const value = {
  day: 24,
  month: 12,
  year: 1801,
}

storiesOf('coreModules/form/Fields/Date/SingleDate', module)
  .addDecorator(createStoryDecorator({ wrap: false }))
  .add('empty', () => (
    <FormWrapper>
      <Field
        autoComplete="off"
        component={SingleDate}
        input={input}
        module="form"
        name={fieldName}
      />
    </FormWrapper>
  ))
  .add('filled', () => (
    <FormWrapper>
      <Field
        autoComplete="off"
        component={SingleDate}
        input={{ ...input, value }}
        module="form"
        name={fieldName}
      />
    </FormWrapper>
  ))
