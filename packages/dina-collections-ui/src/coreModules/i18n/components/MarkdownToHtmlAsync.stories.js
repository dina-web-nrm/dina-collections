/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import withInfo from 'utilities/test/customStorybookWithInfo'
import MarkdownToHtmlAsync from './MarkdownToHtmlAsync'

storiesOf('coreModules/i18n/MarkdownToHtmlAsync', module)
  .addDecorator(createStoryDecorator())
  .add(
    'Default',
    withInfo()(() => {
      return <MarkdownToHtmlAsync markdown="# This is a markdown header" />
    })
  )
