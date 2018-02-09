/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'dina-shared/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import withInfo from 'utilities/test/customStorybookWithInfo'
import FormSchemaError from './FormSchemaError'

storiesOf('coreModules/error/FormSchemaError', module)
  .addDecorator(createStoryDecorator())
  .add(
    'Default',
    withInfo()(() => {
      return (
        <FormSchemaError
          errors={[
            {
              errorCode: 'SAMPLE_ERROR_CODE',
            },
          ]}
          scope="some-scope"
        />
      )
    })
  )
