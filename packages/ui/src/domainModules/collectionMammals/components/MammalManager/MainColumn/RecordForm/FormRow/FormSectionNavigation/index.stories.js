import React from 'react'
import 'common/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import { action } from '@storybook/addon-actions' // eslint-disable-line
import { storiesOf } from '@storybook/react' // eslint-disable-line

import { FormSectionNavigation } from './index'

const catalogNumber = '1234567'
const taxonName = { attributes: { name: 'Phoca vitulina' } }

const sectionSpecs = [
  {
    name: 'basicInformation',
    units: [
      {
        name: 'specimenRoot',
        parts: [],
      },
    ],
  },
  {
    name: 'taxonomy',
    units: [
      {
        name: 'taxonNames',
        parts: [],
      },
    ],
  },
  {
    name: 'collectingDeath',
    units: [
      {
        name: 'collectingDate',
        parts: [],
      },
    ],
  },
]

storiesOf(
  'domainModules/collectionMammals/MammalManager/RecordForm/FormSectionNavigation',
  module
)
  .addDecorator(createStoryDecorator({ wrap: false }))
  .add('withTaxonName', () => (
    <FormSectionNavigation
      activeFormSectionIndex={0}
      availableHeight={700}
      catalogNumber={catalogNumber}
      loading={false}
      onSetActiveFormSection={action('onSetActiveFormSection')}
      onShowAllFormSections={action('onShowAllFormSections')}
      sectionSpecs={sectionSpecs}
      showAllFormSections={false}
      taxonName={taxonName}
    />
  ))
  .add('withoutTaxonName', () => (
    <FormSectionNavigation
      activeFormSectionIndex={0}
      availableHeight={700}
      catalogNumber={catalogNumber}
      loading={false}
      onSetActiveFormSection={action('onSetActiveFormSection')}
      onShowAllFormSections={action('onShowAllFormSections')}
      sectionSpecs={sectionSpecs}
      showAllFormSections={false}
    />
  ))
  .add('withoutCatalogNumber', () => (
    <FormSectionNavigation
      activeFormSectionIndex={0}
      availableHeight={700}
      loading={false}
      onSetActiveFormSection={action('onSetActiveFormSection')}
      onShowAllFormSections={action('onShowAllFormSections')}
      sectionSpecs={sectionSpecs}
      showAllFormSections={false}
    />
  ))
