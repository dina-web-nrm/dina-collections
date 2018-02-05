/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import withInfo from 'utilities/test/customStorybookWithInfo'
import Input from './Input'

storiesOf('coreModules/form/Input', module)
  .addDecorator(createStoryDecorator())
  .add(
    'Default',
    withInfo()(() => {
      return (
        <Input
          input={{ name: 'inputName' }}
          label="This is a label"
          meta={{ touched: false }}
          module="no-module"
          scope="some-scope"
          type="text"
        />
      )
    })
  )
