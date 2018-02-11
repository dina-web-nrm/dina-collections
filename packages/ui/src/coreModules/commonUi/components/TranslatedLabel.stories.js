/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'common/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import withInfo from 'utilities/test/customStorybookWithInfo'
import TranslatedLabel from './TranslatedLabel'

storiesOf('coreModules/commonUi/TranslatedLabel', module)
  .addDecorator(createStoryDecorator())
  .add(
    'Default',
    withInfo()(() => {
      return (
        <TranslatedLabel color="green" textKey="key-without-translations" />
      )
    })
  )
