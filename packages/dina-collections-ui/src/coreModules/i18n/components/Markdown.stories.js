/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import withInfo from 'utilities/test/customStorybookWithInfo'
import Markdown from './Markdown'

const initialState = {
  i18n: {
    availableLanguages: ['en', 'sv'],
    defaultLanguage: 'sv',
    language: 'sv',
    markdown: {
      example: {
        en: '<p>This is compiled markdown</p>',
        sv: '<p>Detta är kompilerad markdown</p>',
      },
      otherExample: {
        en: '<p>This is compiled markdown in fallback language en</p>',
      },
    },
  },
}

storiesOf('coreModules/i18n/Markdown', module)
  .addDecorator(createStoryDecorator({ initialState }))
  .add(
    'Default',
    withInfo()(() => {
      return <Markdown textKey="example" />
    })
  )
  .add(
    'Fallback language',
    withInfo()(() => {
      return <Markdown fallbackLanguage="en" textKey="otherExample" />
    })
  )
