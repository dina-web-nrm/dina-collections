/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import withInfo from 'utilities/test/customStorybookWithInfo'
import Checkbox from './Checkbox'

storiesOf('coreModules/form/Checkbox', module)
  .addDecorator(createStoryDecorator())
  .add(
    'Default',
    withInfo()(() => {
      return (
        <Checkbox
          input={{}}
          meta={{ touched: false }}
          module="no-module"
          scope="some-scope"
          type="checkbox"
        />
      )
    })
  )
