/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import withInfo from 'utilities/test/customStorybookWithInfo'
import createModuleTranslate from './createModuleTranslate'

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

storiesOf('coreModules/i18n/createModuleTranslate', module)
  .addDecorator(createStoryDecorator({ initialState }))
  .add(
    'Default',
    withInfo()(() => {
      const ModuleTranslate = createModuleTranslate('testModule')
      return <ModuleTranslate textKey="firstName" />
    })
  )
  .add(
    'Not existing',
    withInfo()(() => {
      const ModuleTranslate = createModuleTranslate('notExisting')
      return <ModuleTranslate textKey="firstName" />
    })
  )
