/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import withInfo from 'utilities/test/customStorybookWithInfo'
import FormFieldError from './FormFieldError'

storiesOf('coreModules/error/FormFieldError', module)
  .addDecorator(createStoryDecorator())
  .add(
    'Default',
    withInfo()(() => {
      return (
        <div style={{ backgroundColor: '#e5e2e2', minHeight: 50 }}>
          <FormFieldError
            error={{
              errorCode: 'SAMPLE_ERROR_CODE',
            }}
            scope="some-scope"
          />
        </div>
      )
    })
  )
