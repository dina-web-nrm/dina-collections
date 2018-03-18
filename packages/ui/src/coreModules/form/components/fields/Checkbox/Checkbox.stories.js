/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'common/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import withInfo from 'utilities/test/customStorybookWithInfo'
import Checkbox from './index'

storiesOf('coreModules/form/Fields/Checkbox', module)
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
