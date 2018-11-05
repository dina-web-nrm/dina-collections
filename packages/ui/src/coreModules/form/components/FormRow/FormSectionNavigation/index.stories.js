import React from 'react'
import 'common/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import { action } from '@storybook/addon-actions' // eslint-disable-line
import { storiesOf } from '@storybook/react' // eslint-disable-line

import { FormSectionNavigation } from './index'

const catalogNumber = '1234567'
const taxonName = 'Phoca vitulina'

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
  .add('with header', () => (
    <FormSectionNavigation
      activeFormSectionIndex={0}
      availableHeight={700}
      formName="test"
      header={catalogNumber}
      loading={false}
      module="collectionMammals"
      onSetActiveFormSection={action('onSetActiveFormSection')}
      onShowAllFormSections={action('onShowAllFormSections')}
      sectionSpecs={sectionSpecs}
      showAllFormSections={false}
      showSectionsInNavigation
    />
  ))
  .add('with header and subHeader', () => (
    <FormSectionNavigation
      activeFormSectionIndex={0}
      availableHeight={700}
      formName="test"
      header={catalogNumber}
      loading={false}
      module="collectionMammals"
      onSetActiveFormSection={action('onSetActiveFormSection')}
      onShowAllFormSections={action('onShowAllFormSections')}
      sectionSpecs={sectionSpecs}
      showAllFormSections={false}
      showSectionsInNavigation
      subHeader={taxonName}
    />
  ))
  .add('without section steps', () => (
    <FormSectionNavigation
      activeFormSectionIndex={0}
      availableHeight={700}
      formName="test"
      loading={false}
      module="collectionMammals"
      onSetActiveFormSection={action('onSetActiveFormSection')}
      onShowAllFormSections={action('onShowAllFormSections')}
      sectionSpecs={sectionSpecs}
      showAllFormSections={false}
      showSectionsInNavigation={false}
    />
  ))
