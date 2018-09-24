import React from 'react'
import 'common/dist/semantic.css' // eslint-disable-line
import PropTypes from 'prop-types'
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import { action } from '@storybook/addon-actions' // eslint-disable-line
import { storiesOf } from '@storybook/react' // eslint-disable-line

import { reduxForm } from 'redux-form'
import { Field } from 'coreModules/form/components'
import RangeDate from './index'

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
  value: {
    endDate: undefined,
    startDate: undefined,
  },
}

const value = {
  endDate: {
    day: 24,
    month: 12,
    year: 1900,
  },
  startDate: {
    day: 1,
    month: 1,
    year: 1899,
  },
}

storiesOf('coreModules/form/Fields/Date/RangeDate', module)
  .addDecorator(createStoryDecorator({ wrap: false }))
  .add('default', () => (
    <FormWrapper>
      <Field
        autoComplete="off"
        component={RangeDate}
        input={input}
        module="form"
        name={fieldName}
      />
    </FormWrapper>
  ))
  .add('with date type radios', () => (
    <FormWrapper>
      <Field
        autoComplete="off"
        component={RangeDate}
        displayDateTypeRadios
        input={input}
        module="form"
        name={fieldName}
      />
    </FormWrapper>
  ))
  .add('empty single', () => (
    <FormWrapper>
      <Field
        autoComplete="off"
        component={RangeDate}
        initialDateType="single"
        input={input}
        module="form"
        name={fieldName}
      />
    </FormWrapper>
  ))
  .add('filled single', () => (
    <FormWrapper>
      <Field
        autoComplete="off"
        component={RangeDate}
        initialDateType="single"
        input={{ ...input, value }}
        module="form"
        name={fieldName}
      />
    </FormWrapper>
  ))
  .add('empty range', () => (
    <FormWrapper>
      <Field
        autoComplete="off"
        component={RangeDate}
        initialDateType="range"
        input={input}
        module="form"
        name={fieldName}
      />
    </FormWrapper>
  ))
  .add('filled range', () => (
    <FormWrapper>
      <Field
        autoComplete="off"
        component={RangeDate}
        initialDateType="range"
        input={{ ...input, value }}
        module="form"
        name={fieldName}
      />
    </FormWrapper>
  ))
  .add('empty latest', () => (
    <FormWrapper>
      <Field
        autoComplete="off"
        component={RangeDate}
        initialDateType="latest"
        input={input}
        module="form"
        name={fieldName}
      />
    </FormWrapper>
  ))
  .add('filled latest', () => (
    <FormWrapper>
      <Field
        autoComplete="off"
        component={RangeDate}
        initialDateType="latest"
        input={{
          ...input,
          value: {
            endDate: {
              day: 24,
              month: 12,
              year: 1900,
            },
          },
        }}
        module="form"
        name={fieldName}
      />
    </FormWrapper>
  ))
