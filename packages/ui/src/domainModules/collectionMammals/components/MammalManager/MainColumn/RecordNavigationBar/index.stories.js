import React from 'react'
import 'common/dist/semantic.css' // eslint-disable-line
import 'react-rangeslider/lib/index.css'
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import { action } from '@storybook/addon-actions' // eslint-disable-line
import { storiesOf } from '@storybook/react' // eslint-disable-line

import RecordNavigationBar from './index'

export const currentRecordNumber = 30000
export const firstRecord = 1
export const totalNumberOfRecords = 50000

export const previousRecordNumber = currentRecordNumber - 1
export const nextRecordNumber = currentRecordNumber + 1
export const lastRecord = totalNumberOfRecords

export const newTotalRecords = totalNumberOfRecords + 1

export const actions = {
  onCurrentRecordNumberChange: action('onCurrentRecordNumberChange'),
  onOpenNewRecordForm: action('onOpenNewRecordForm'),
  onSelectCurrentRecordNumber: action('onSelectCurrentRecordNumber'),
  onSelectNextRecord: action('onSelectNextRecord'),
  onSelectPreviousRecord: action('onSelectPreviousRecord'),
  onSetCurrentRecordNumber: action('onSetCurrentRecordNumber'),
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
      currentRecordNumber={currentRecordNumber}
      {...actions}
      totalNumberOfRecords={totalNumberOfRecords}
    />
  ))
  .add('nextRecord', () => (
    <RecordNavigationBar
      currentRecordNumber={nextRecordNumber}
      totalNumberOfRecords={totalNumberOfRecords}
      {...actions}
    />
  ))
  .add('previousRecord', () => (
    <RecordNavigationBar
      currentRecordNumber={previousRecordNumber}
      totalNumberOfRecords={totalNumberOfRecords}
      {...actions}
    />
  ))
  .add('firstRecord', () => (
    <RecordNavigationBar
      currentRecordNumber={firstRecord}
      {...actions}
      onSelectPreviousRecord={false}
      totalNumberOfRecords={totalNumberOfRecords}
    />
  ))
  .add('lastRecord', () => (
    <RecordNavigationBar
      currentRecordNumber={lastRecord}
      {...actions}
      onSelectNextRecord={false}
      totalNumberOfRecords={totalNumberOfRecords}
    />
  ))
  .add('showAllRecords', () => (
    <RecordNavigationBar
      currentRecordNumber={currentRecordNumber}
      totalNumberOfRecords={totalNumberOfRecords}
      {...actions}
    />
  ))
  .add('openFilter', () => (
    <RecordNavigationBar
      currentRecordNumber={currentRecordNumber}
      totalNumberOfRecords={totalNumberOfRecords}
      {...actions}
    />
  ))
  .add('changeRecordNumber', () => (
    <RecordNavigationBar
      currentRecordNumber={currentRecordNumber}
      totalNumberOfRecords={totalNumberOfRecords}
      {...actions}
    />
  ))
  .add('addingNewRecordComplete', () => (
    <RecordNavigationBar
      currentRecordNumber={newTotalRecords}
      {...actions}
      onSelectNextRecord={false}
      totalNumberOfRecords={newTotalRecords}
    />
  ))
  .add('openNewRecordForm', () => (
    <RecordNavigationBar
      currentRecordNumber={totalNumberOfRecords}
      onCurrentRecordNumberChange={false}
      onOpenNewRecordForm={false}
      onSelectCurrentRecordNumber={false}
      onSelectNextRecord={false}
      onSelectPreviousRecord={false}
      onSetCurrentRecordNumber={false}
      onShowAllRecords={false}
      onToggleFilters={false}
      totalNumberOfRecords={totalNumberOfRecords}
    />
  ))
