/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import { action } from '@storybook/addon-actions'
import withInfo from 'utilities/test/customStorybookWithInfo'
import { FormFieldHelpIcon } from './FormFieldHelpIcon'

storiesOf('coreModules/notifications/FormFieldHelpIcon', module)
  .addDecorator(createStoryDecorator({ wrap: false }))
  .add(
    'Default',
    withInfo()(() => {
      return (
        <FormFieldHelpIcon
          createNotification={action('createNotification')}
          helpNotificationProps={{
            description: 'This is a description',
          }}
        />
      )
    })
  )
