/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import withInfo from 'utilities/test/customStorybookWithInfo'
import { FIXED } from '../constants'
import ConnectedNotificationDisplay, {
  NotificationDisplay,
} from './NotificationDisplay'

storiesOf('coreModules/notifications/NotificationDisplay', module)
  .addDecorator(createStoryDecorator({ wrap: false }))
  .add(
    'Default',
    withInfo({
      propTables: [NotificationDisplay],
      propTablesExclude: [ConnectedNotificationDisplay],
    })(() => {
      return <ConnectedNotificationDisplay displayType={FIXED} />
    })
  )
