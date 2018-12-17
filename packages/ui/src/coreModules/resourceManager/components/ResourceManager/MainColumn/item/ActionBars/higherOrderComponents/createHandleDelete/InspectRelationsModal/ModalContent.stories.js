import React from 'react'
import 'common/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import { action } from '@storybook/addon-actions' // eslint-disable-line
import { storiesOf } from '@storybook/react' // eslint-disable-line

import ModalContent from './ModalContent'

const relationships = {
  specimens: {
    data: {
      id: '1',
      type: 'specimen',
    },
  },
  storageLocations: {
    data: [
      {
        id: '1',
        type: 'storageLocation',
      },
      {
        id: '2',
        type: 'storageLocation',
      },
    ],
  },
}

storiesOf(
  'coreModules/resourceManager/components/ResourceManager/MainColumn/item/RecordActionBar/higherOrderComponents/createHandleDelete/InspectRelationsModal/ModalContent',
  module
)
  .addDecorator(createStoryDecorator({ wrap: false }))
  .add('default', () => <ModalContent relationships={relationships} />)
