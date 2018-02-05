/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import withInfo from 'utilities/test/customStorybookWithInfo'
import I18nProvider from './I18nProvider'

storiesOf('coreModules/i18n/I18nProvider', module)
  .addDecorator(createStoryDecorator())
  .add(
    'Default',
    withInfo()(() => {
      return (
        <I18nProvider>
          <div>Child node</div>
        </I18nProvider>
      )
    })
  )
