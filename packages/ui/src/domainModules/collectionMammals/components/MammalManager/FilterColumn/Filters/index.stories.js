/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'common/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import defaultTestConfig from 'utilities/test/defaultTestConfig'
import withInfo from 'utilities/test/customStorybookWithInfo'
import Filters, { RawFilters } from './index'

storiesOf('domainModules/collectionMammals/MammalManager/Filters', module)
  .addDecorator(
    createStoryDecorator({
      config: {
        ...defaultTestConfig(),
        form: true,
      },
      initialState: { form: { specimenFilters: {} } },
      wrap: false,
    })
  )
  .add(
    '400 px wide',
    withInfo({ propTables: [RawFilters] })(() => {
      return (
        <div style={{ width: '400px' }}>
          <Filters
            formName="specimenFilters"
            formValueSelector={() => undefined}
            getFormInitialValues={() => undefined}
          />
        </div>
      )
    })
  )
