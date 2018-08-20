/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'common/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import withInfo from 'utilities/test/customStorybookWithInfo'
import ShortcutsDisplay from './ShortcutsDisplay'

const initialState = {
  keyboardShortcuts: {
    showInfo: true,
  },
}

storiesOf('coreModules/keyboardShortcuts/ShortcutsDisplay', module)
  .addDecorator(createStoryDecorator({ initialState }))
  .add(
    'Default',
    withInfo()(() => {
      return <ShortcutsDisplay showShortcutInfo />
    })
  )
