/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import withInfo from 'utilities/test/customStorybookWithInfo'
import ModuleTranslate from './ModuleTranslate'

const initialState = {
  i18n: {
    availableLanguages: ['en', 'sv'],
    defaultLanguage: 'sv',
    language: 'sv',
    translations: {
      modules: {
        testModule: {
          firstName: {
            en: 'first name',
            sv: 'förnamn',
          },
          lastName: {
            en: 'lastname',
            sv: 'efternamn',
          },
        },
      },
    },
  },
}

storiesOf('coreModules/i18n/ModuleTranslate', module)
  .addDecorator(createStoryDecorator({ initialState }))
  .add(
    'Default',
    withInfo()(() => {
      return <ModuleTranslate module="testModule" textKey="firstName" />
    })
  )
  .add(
    'Not existing',
    withInfo()(() => {
      return <ModuleTranslate module="notExisting" textKey="firstName" />
    })
  )
  .add(
    'Multiple modules',
    withInfo()(() => {
      return (
        <ModuleTranslate
          modules={['notExisting', 'testModule']}
          textKey="firstName"
        />
      )
    })
  )
