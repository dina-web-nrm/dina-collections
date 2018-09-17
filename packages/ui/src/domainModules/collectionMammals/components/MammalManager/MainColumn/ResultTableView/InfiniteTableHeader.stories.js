import React from 'react'
import 'common/dist/semantic.css' // eslint-disable-line

import { emToPixels } from 'coreModules/layout/utilities'
import { action } from '@storybook/addon-actions' // eslint-disable-line
import { storiesOf } from '@storybook/react' // eslint-disable-line

import createStoryDecorator from 'utilities/test/createStoryDecorator'
import InfiniteTableHeader from './InfiniteTableHeader'

const tableColumnsToShow = [
  'catalogNumber',
  'family',
  'genus',
  'species',
  'collectors',
  'endDateCollecting',
  'localityCollecting',
  'death',
  'skeleton',
  'skin',
  'wet',
  'sex',
  'ageStage',
  'registered',
  'curatorialName',
  'identifiersCatalogNumber',
  'taxonomyCuratorialName',
  'taxonomyFamily',
  'taxonomyGenus',
  'taxonomySpecies',
  'taxonomySubspecies',
]

const tableColumnsToSort = [{ name: 'identifiersCatalogNumber', sort: 'asc' }]

storiesOf(
  'domainModules/collectionMammals/MammalManager/ResultTableView/InfiniteTableHeader',
  module
)
  .addDecorator(createStoryDecorator({ wrap: false }))
  .add('default', () => (
    <InfiniteTableHeader
      height={emToPixels(3.5)}
      onSaveTableColumnsToSort={action('sort-dsc')}
      tableColumnsToShow={tableColumnsToShow}
      tableColumnsToSort={tableColumnsToSort}
      topOffset={emToPixels(11.1875)}
      width={800}
    />
  ))
