import React from 'react'
import 'common/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import { action } from '@storybook/addon-actions' // eslint-disable-line
import { storiesOf } from '@storybook/react' // eslint-disable-line

import ResultOptionsBar from './index'

export const actions = {
  onExportCsv: action('onExportCsv'),
  onSettingClick: action('onSettingClick'),
  onTabClick: action('onTabClick'),
}

storiesOf(
  'domainModules/collectionMammals/MammalManager/ResultOptionsBar',
  module
)
  .addDecorator(createStoryDecorator({ wrap: false }))
  .add('default', () => (
    <ResultOptionsBar mainColumnActiveTab="newRecord" {...actions} />
  ))
  .add('tableView', () => (
    <ResultOptionsBar mainColumnActiveTab="table" {...actions} />
  ))
  .add('formView', () => (
    <ResultOptionsBar mainColumnActiveTab="newRecord" {...actions} />
  ))
