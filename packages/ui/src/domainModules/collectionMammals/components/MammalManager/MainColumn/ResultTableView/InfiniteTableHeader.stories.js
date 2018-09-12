import React from 'react'
import 'common/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import { action } from '@storybook/addon-actions' // eslint-disable-line
import { storiesOf } from '@storybook/react' // eslint-disable-line

import InfiniteTableHeader from './InfiniteTableHeader'
// import tableColumnSpecifications from '../tableColumnSpecifications'

// export const actions = {
//   onExportCsv: action('onExportCsv'),
//   onFormTabClick: action('onFormTabClick'),
//   onSettingClick: action('onSettingClick'),
//   onTableTabClick: action('onTableTabClick'),
// }

export const tableColumnsToShow = [
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

storiesOf(
  'domainModules/collectionMammals/MammalManager/ResultTableView/InfiniteTableHeader',
  module
)
  .addDecorator(createStoryDecorator({ wrap: false }))
  .add('default', () => (
    <InfiniteTableHeader
      height={43}
      tableColumnsToShow={tableColumnsToShow}
      topOffset={141}
      width={800}
    />
  ))
