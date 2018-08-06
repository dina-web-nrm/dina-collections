import React from 'react'
import 'common/dist/semantic.css' // eslint-disable-line
import 'react-rangeslider/lib/index.css'
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import { action } from '@storybook/addon-actions' // eslint-disable-line
import { storiesOf } from '@storybook/react' // eslint-disable-line

import RecordNavigationBar from './index'

export const currentTableRowNumber = 30000
export const firstRecord = 1
export const totalNumberOfRecords = 50000

export const previousTableRowNumber = currentTableRowNumber - 1
export const nextTableRowNumber = currentTableRowNumber + 1
export const lastRecord = totalNumberOfRecords

export const newTotalRecords = totalNumberOfRecords + 1

export const actions = {
  onCurrentTableRowNumberChange: action('onCurrentTableRowNumberChange'),
  onOpenNewRecordForm: action('onOpenNewRecordForm'),
  onSelectCurrentTableRowNumber: action('onSelectCurrentTableRowNumber'),
  onSelectNextRecord: action('onSelectNextRecord'),
  onSelectPreviousRecord: action('onSelectPreviousRecord'),
  onSetCurrentTableRowNumber: action('onSetCurrentTableRowNumber'),
  onShowAllRecords: action('onShowAllRecords'),
  onToggleFilters: action('onToggleFilters'),
}

storiesOf(
  'domainModules/collectionMammals/MammalManager/RecordNavigationBar',
  module
)
  .addDecorator(createStoryDecorator({ wrap: false }))
  .add('default', () => (
    <RecordNavigationBar
      currentTableRowNumber={currentTableRowNumber}
      {...actions}
      totalNumberOfRecords={totalNumberOfRecords}
    />
  ))
  .add('nextRecord', () => (
    <RecordNavigationBar
      currentTableRowNumber={nextTableRowNumber}
      totalNumberOfRecords={totalNumberOfRecords}
      {...actions}
    />
  ))
  .add('previousRecord', () => (
    <RecordNavigationBar
      currentTableRowNumber={previousTableRowNumber}
      totalNumberOfRecords={totalNumberOfRecords}
      {...actions}
    />
  ))
  .add('firstRecord', () => (
    <RecordNavigationBar
      currentTableRowNumber={firstRecord}
      {...actions}
      onSelectPreviousRecord={false}
      totalNumberOfRecords={totalNumberOfRecords}
    />
  ))
  .add('lastRecord', () => (
    <RecordNavigationBar
      currentTableRowNumber={lastRecord}
      {...actions}
      onSelectNextRecord={false}
      totalNumberOfRecords={totalNumberOfRecords}
    />
  ))
  .add('showAllRecords', () => (
    <RecordNavigationBar
      currentTableRowNumber={currentTableRowNumber}
      totalNumberOfRecords={totalNumberOfRecords}
      {...actions}
    />
  ))
  .add('openFilter', () => (
    <RecordNavigationBar
      currentTableRowNumber={currentTableRowNumber}
      totalNumberOfRecords={totalNumberOfRecords}
      {...actions}
    />
  ))
  .add('changeTableRowNumber', () => (
    <RecordNavigationBar
      currentTableRowNumber={currentTableRowNumber}
      totalNumberOfRecords={totalNumberOfRecords}
      {...actions}
    />
  ))
  .add('addingNewRecordComplete', () => (
    <RecordNavigationBar
      currentTableRowNumber={newTotalRecords}
      {...actions}
      onSelectNextRecord={false}
      totalNumberOfRecords={newTotalRecords}
    />
  ))
  .add('openNewRecordForm', () => (
    <RecordNavigationBar
      currentTableRowNumber={totalNumberOfRecords}
      onCurrentTableRowNumberChange={false}
      onOpenNewRecordForm={false}
      onSelectCurrentTableRowNumber={false}
      onSelectNextRecord={false}
      onSelectPreviousRecord={false}
      onSetCurrentTableRowNumber={false}
      onShowAllRecords={false}
      onToggleFilters={false}
      totalNumberOfRecords={totalNumberOfRecords}
    />
  ))
