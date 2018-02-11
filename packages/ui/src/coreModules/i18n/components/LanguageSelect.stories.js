/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'common/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import withInfo from 'utilities/test/customStorybookWithInfo'
import ConnectedLanguageSelect, { LanguageSelect } from './LanguageSelect'

storiesOf('coreModules/i18n/LanguageSelect', module)
  .addDecorator(createStoryDecorator())
  .add(
    'Default',
    withInfo({ propTables: [LanguageSelect] })(() => {
      return <ConnectedLanguageSelect />
    })
  )
  .add(
    'Green color',
    withInfo({ propTables: [LanguageSelect] })(() => {
      return <ConnectedLanguageSelect color="green" />
    })
  )
