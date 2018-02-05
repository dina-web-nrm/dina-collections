/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import withInfo from 'utilities/test/customStorybookWithInfo'
import { Segment } from 'semantic-ui-react'

import DefaultLoader from './DefaultLoader'

storiesOf('coreModules/bootstrap/DefaultLoader', module)
  .addDecorator(createStoryDecorator())
  .add(
    'Not loading',
    withInfo({ propTables: [DefaultLoader], propTablesExclude: [Segment] })(
      () => {
        return (
          <div>
            <Segment>Some loaded content </Segment>
            <DefaultLoader loading={false} />
          </div>
        )
      }
    )
  )
  .add(
    'Loading',
    withInfo({ propTables: [DefaultLoader], propTablesExclude: [Segment] })(
      () => {
        return (
          <div>
            <Segment>Some not loaded content </Segment>
            <DefaultLoader loading />
          </div>
        )
      }
    )
  )
