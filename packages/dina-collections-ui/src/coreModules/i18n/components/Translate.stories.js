/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import withInfo from 'utilities/test/customStorybookWithInfo'
import Translate from './Translate'

const initialState = {
  i18n: {
    availableLanguages: ['en', 'sv'],
    defaultLanguage: 'sv',
    language: 'sv',
    translations: {
      firstName: {
        en: 'first name',
        sv: 'förnamn',
      },
      greet: {
        en: 'hello {{name}}', // eslint-disable-line no-template-curly-in-string
        sv: 'hej {{name}}', // eslint-disable-line no-template-curly-in-string
      },
      lastName: {
        en: 'lastname',
        sv: 'efternamn',
      },
    },
  },
}

storiesOf('coreModules/i18n/Translate', module)
  .addDecorator(createStoryDecorator({ initialState }))
  .add(
    'Default',
    withInfo()(() => {
      return <Translate textKey="firstName" />
    })
  )
  .add(
    'No translation available',
    withInfo()(() => {
      return <Translate textKey="non-existing" />
    })
  )
  .add(
    'Fallback',
    withInfo()(() => {
      return <Translate fallback="This is fallback" textKey="non-existing" />
    })
  )
  .add(
    'Capitalize',
    withInfo()(() => {
      return <Translate capitalize textKey="lastName" />
    })
  )
  .add(
    'Multiple keys',
    withInfo()(() => {
      return <Translate capitalize textKeys={['dont-exist', 'lastName']} />
    })
  )
  .add(
    'Interpolation',
    withInfo()(() => {
      return <Translate capitalize params={{ name: 'Anton' }} textKey="greet" />
    })
  )
