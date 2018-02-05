/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import { action } from '@storybook/addon-actions'
import withInfo from 'utilities/test/customStorybookWithInfo'

import { LoginForm, RawLoginForm } from './LoginForm'

storiesOf('coreModules/user/LoginForm', module)
  .addDecorator(createStoryDecorator())
  .add(
    'Default',
    withInfo({ propTables: [RawLoginForm] })(() => {
      return <LoginForm login={action('login')} />
    })
  )
