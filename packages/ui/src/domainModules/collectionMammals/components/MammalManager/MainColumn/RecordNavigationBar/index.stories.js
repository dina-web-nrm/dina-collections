import React from 'react'
import 'common/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import { action } from '@storybook/addon-actions' // eslint-disable-line
import { storiesOf } from '@storybook/react' // eslint-disable-line

import RecordNavigationBar from './index'

export const currentRecordNumber = 30000
export const firstRecord = 1
export const totalRecords = 50000

export const previousRecordNumber = currentRecordNumber - 1
export const nextRecordNumber = currentRecordNumber + 1
export const lastRecord = totalRecords

export const newTotalRecords = totalRecords + 1

export const actions = {
  onCurrentRecordNumberChange: action('onCurrentRecordNumberChange'),
  onOpenNewRecordForm: action('onOpenNewRecordForm'),
  onSelectCurrentRecordNumber: action('onSelectCurrentRecordNumber'),
  onSelectNextRecord: action('onSelectNextRecord'),
  onSelectPreviousRecord: action('onSelectPreviousRecord'),
  onShowAllRecords: action('onShowAllRecords'),
  onToggleFilters: action('onToggleFilters'),
}

storiesOf(
  'domainModules/collectionMammals/MammalManager/RecordNavigationBar',
  module
)
  .addDecorator(createStoryDecorator())
  .add('default', () => (
    <RecordNavigationBar
      currentRecordNumber={currentRecordNumber}
      {...actions}
      totalRecords={totalRecords}
    />
  ))
  .add('nextRecord', () => (
    <RecordNavigationBar
      currentRecordNumber={nextRecordNumber}
      totalRecords={totalRecords}
      {...actions}
    />
  ))
  .add('previousRecord', () => (
    <RecordNavigationBar
      currentRecordNumber={previousRecordNumber}
      totalRecords={totalRecords}
      {...actions}
    />
  ))
  .add('firstRecord', () => (
    <RecordNavigationBar
      currentRecordNumber={firstRecord}
      {...actions}
      onSelectPreviousRecord={false}
      totalRecords={totalRecords}
    />
  ))
  .add('lastRecord', () => (
    <RecordNavigationBar
      currentRecordNumber={lastRecord}
      {...actions}
      onSelectNextRecord={false}
      totalRecords={totalRecords}
    />
  ))
  .add('showAllRecords', () => (
    <RecordNavigationBar
      currentRecordNumber={currentRecordNumber}
      totalRecords={totalRecords}
      {...actions}
    />
  ))
  .add('openFilter', () => (
    <RecordNavigationBar
      currentRecordNumber={currentRecordNumber}
      totalRecords={totalRecords}
      {...actions}
    />
  ))
  .add('changeRecordNumber', () => (
    <RecordNavigationBar
      currentRecordNumber={currentRecordNumber}
      totalRecords={totalRecords}
      {...actions}
    />
  ))
  .add('addingNewRecordComplete', () => (
    <RecordNavigationBar
      currentRecordNumber={newTotalRecords}
      {...actions}
      onSelectNextRecord={false}
      totalRecords={newTotalRecords}
    />
  ))
  .add('openNewRecordForm', () => (
    <RecordNavigationBar
      currentRecordNumber={totalRecords}
      onCurrentRecordNumberChange={false}
      onOpenNewRecordForm={false}
      onSelectCurrentRecordNumber={false}
      onSelectNextRecord={false}
      onSelectPreviousRecord={false}
      onShowAllRecords={false}
      onToggleFilters={false}
      totalRecords={totalRecords}
    />
  ))
