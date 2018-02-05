/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import withInfo from 'utilities/test/customStorybookWithInfo'
import PageTemplate from './PageTemplate'

storiesOf('coreModules/commonUi/PageTemplate', module)
  .addDecorator(createStoryDecorator())
  .add(
    'No fixed menu',
    withInfo()(() => {
      return (
        <PageTemplate hasFixedMenu={false}>
          <div>Page content</div>
        </PageTemplate>
      )
    })
  )
  .add(
    'Fixed menu',
    withInfo()(() => {
      return (
        <PageTemplate hasFixedMenu>
          <div>Page content</div>
        </PageTemplate>
      )
    })
  )
