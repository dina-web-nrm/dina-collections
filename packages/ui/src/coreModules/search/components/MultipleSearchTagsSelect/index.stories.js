/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'common/dist/semantic.css' // eslint-disable-line
import { action } from '@storybook/addon-actions'
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import withInfo from 'utilities/test/customStorybookWithInfo'
import { MultipleSearchTagsSelect } from './index'

storiesOf('coreModules/search/MultipleSearchTagsSelect', module)
  .addDecorator(
    createStoryDecorator({
      wrap: true,
    })
  )
  .add(
    'Default',
    withInfo({ propTables: [MultipleSearchTagsSelect] })(() => {
      return (
        <MultipleSearchTagsSelect
          aggregationFunctionName="identifiers"
          filterFunctionName="searchCollectingLocation"
          inlineRefine
          input={{
            name: 'searchCollectingLocation',
            onChange: action('onChange'),
          }}
          meta={{}}
          search={() => {
            return Promise.resolve([
              { attributes: { count: 1 }, id: `matchingResult1` },
              { attributes: { count: 2 }, id: `matchingResult2` },
              { attributes: { count: 3 }, id: `matchingResult3` },
            ])
          }}
        />
      )
    })
  )
