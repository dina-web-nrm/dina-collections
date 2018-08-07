import React from 'react'
import 'common/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import { action } from '@storybook/addon-actions' // eslint-disable-line
import { storiesOf } from '@storybook/react' // eslint-disable-line

import ResultOptionsBar from './index'

export const actions = {
  onExportCsv: action('onExportCsv'),
  onFormTabClick: action('onFormTabClick'),
  onSettingClick: action('onSettingClick'),
  onTableTabClick: action('onTableTabClick'),
}

storiesOf(
  'domainModules/collectionMammals/MammalManager/ResultOptionsBar',
  module
)
  .addDecorator(createStoryDecorator({ wrap: false }))
  .add('default', () => (
    <ResultOptionsBar
      mainColumnActiveTab="recordNew"
      {...actions}
      onFormTabClick={false}
    />
  ))
  .add('tableView', () => (
    <ResultOptionsBar
      mainColumnActiveTab="resultTable"
      {...actions}
      onTableTabClick={false}
    />
  ))
  .add('formView', () => (
    <ResultOptionsBar
      mainColumnActiveTab="recordNew"
      {...actions}
      onFormTabClick={false}
    />
  ))
