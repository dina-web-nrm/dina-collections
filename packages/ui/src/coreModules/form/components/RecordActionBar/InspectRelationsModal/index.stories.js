import React from 'react'
import 'common/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import { storiesOf } from '@storybook/react' // eslint-disable-line

import InspectRelationsModal from './index'

const relations = [
  {
    id: '1',
    type: 'storageLocation',
  },
  {
    id: '2',
    type: 'storageLocation',
  },
  {
    id: '1',
    type: 'specimen',
  },
]

storiesOf(
  'coreModules/form/components/RecordActionBar/InspectRelationsModal',
  module
)
  .addDecorator(createStoryDecorator({ wrap: false }))
  .add('default', () => (
    <InspectRelationsModal
      recordHeader="Canis lupus (species)"
      relations={relations}
    />
  ))
