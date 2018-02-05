/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import { action } from '@storybook/addon-actions'
import withInfo from 'utilities/test/customStorybookWithInfo'
import NotificationModalWithI18n, { NotificationModal } from './Modal'

storiesOf('coreModules/notifications/NotificationModal', module)
  .addDecorator(createStoryDecorator({ wrap: false }))
  .add(
    'Default',
    withInfo({
      propTables: [NotificationModal],
      propTablesExclude: [NotificationModalWithI18n],
    })(() => {
      return (
        <NotificationModalWithI18n
          descriptionHeaderKey="descriptionHeaderKey"
          descriptionKey="descriptionKey"
          headerKey="headerKey"
          open={process.env.NODE_ENV !== 'test'}
          removeNotification={action('removeNotification')}
          sequentialId={1}
          showShortcutInfo
        />
      )
    })
  )
