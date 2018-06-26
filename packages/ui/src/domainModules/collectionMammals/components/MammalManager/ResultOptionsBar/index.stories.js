import React from 'react'
import 'common/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import { action } from '@storybook/addon-actions' // eslint-disable-line
import { storiesOf } from '@storybook/react' // eslint-disable-line

import ResultOptionsBar from './index'

export const actions = {
  onExportCsv: action('onExportCsv'),
  onFormTabClick: action('onFormTabClicked'),
  onSettingClick: action('onSettingClick'),
  onTableTabClick: action('onTableTabClicked'),
}

storiesOf(
  'domainModules/collectionMammals/MammalManager/ResultOptionsBar',
  module
)
  .addDecorator(createStoryDecorator({ wrap: false }))
  .add('default', () => <ResultOptionsBar activeItem="form" {...actions} />)
  .add('tableView', () => <ResultOptionsBar activeItem="table" {...actions} />)
  .add('formView', () => <ResultOptionsBar activeItem="form" {...actions} />)
