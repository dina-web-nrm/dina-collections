// strings and objects are sorted in order of appearance in the UI

const labelsFor = [
  'identifier.tagValues',
  'taxonomy.tagType',
  'taxonomy.tagValues',
  'locality.higherGeography.tagValues',
  'locality.localities.tagValues',
  'collectingInformation.establishmentMeansType',
  'originInformation.isResultOfSelectiveBreeding',
  'datePeriod.date.startDate',
  'datePeriod.date.endDate',
  'agent.tagValues',
  'physicalObject.skeleton',
  'physicalObject.skin',
  'physicalObject.wetPreparation',
  'physicalObject.otherPreparation',
  'storage.tagType',
  'storage.tagValues',
  'ageAndStage.age.min',
  'ageAndStage.stages',
  'sex.sex',
  'collectingCondition.collectingConditions',
  'weight.rangeValue.min',
  'length.rangeValue.min',
  'bones.bones',
  'remarks.search',
]

const inlineDropdownInitialTexts = [
  'catalog no.',
  'any rank',
  'any geographic level',
  'collecting (interpreted)',
  'collector',
  'any storage level',
  'Complete body weight',
  'Total length',
  'Any remarks type',
]

const dropdownSearchTests = [
  {
    expectedRecords: 3,
    expectedTags: 3,
    name: 'identifier.tagValues',
    optionText: '58',
    searchQuery: '58',
  },
  {
    expectedRecords: 2,
    name: 'taxonomy.tagValues',
    optionText: 'Muridae [family]',
    searchQuery: 'mur',
  },
  {
    expectedRecords: 9,
    name: 'locality.higherGeography.tagValues',
    optionText: 'Sweden [country in Europe]',
    searchQuery: 'Swe',
  },
  {
    expectedRecords: 1,
    expectedTags: 2,
    name: 'locality.localities.tagValues',
    optionText: 'Kabare',
    searchQuery: 'Kabare',
  },
  {
    expectedRecords: 1,
    expectedTags: 1,
    name: 'agent.tagValues',
    optionText: 'Skansen',
    searchQuery: 'Skansen',
  },
  {
    expectedRecords: 9,
    name: 'storage.tagValues',
    optionText: 'Bensalen [room]',
    searchQuery: 'Bensalen',
  },
]

const dropdownTests = [
  {
    expectedRecords: 1,
    name: 'taxonomy.tagType',
    optionText: 'genus',
  },
  {
    expectedRecords: 13,
    name: 'storage.tagType',
    optionText: 'Shelf',
  },
]

const checkboxTests = [
  {
    expectedRecords: 15,
    label: 'wild and native (collecting)',
    name: 'collectingInformation.establishmentMeansType',
  },
  {
    expectedRecords: 1,
    label: 'no',
    name: 'originInformation.isResultOfSelectiveBreeding',
  },
  {
    expectedRecords: 4,
    label: 'no skeleton',
    name: 'physicalObject.skeleton',
  },
  {
    expectedRecords: 7,
    label: 'complete study skin',
    name: 'physicalObject.skin',
  },
  {
    expectedRecords: 15,
    label: 'no wet preparation',
    name: 'physicalObject.wetPreparation',
  },
  {
    expectedRecords: 4,
    label: 'unspecified other preparation',
    name: 'physicalObject.otherPreparation',
  },
  {
    expectedRecords: 4,
    label: 'unspecified other preparation',
    name: 'physicalObject.otherPreparation',
  },
  {
    expectedRecords: 2,
    label: 'juvenile',
    name: 'ageAndStage.stages',
  },
  {
    expectedRecords: 1,
    label: 'unknown',
    name: 'sex.sex',
  },
  {
    expectedRecords: 1,
    label: 'fresh',
    name: 'collectingCondition.collectingConditions',
  },
  {
    expectedRecords: 2,
    label: 'vertebrae',
    name: 'bones.bones',
  },
]

const inputTests = [
  {
    expectedRecords: 1,
    inputs: ['2', '2'],
    names: ['ageAndStage.age.min', 'ageAndStage.age.max'],
  },
  {
    expectedRecords: 2,
    input: '20',
    name: 'weight.rangeValue.max',
  },
  {
    expectedRecords: 3,
    input: '500',
    name: 'length.rangeValue.min',
  },
  {
    expectedRecords: 2,
    input: 'missing',
    name: 'remarks.search',
  },
]

export default () =>
  describe('filters', () => {
    const searchAssertExpectedRecordsAndClearFilters = (
      expectedRecords,
      { skipClearFilters = false } = {}
    ) => {
      cy.getByTestId('searchButton')
        .click()
        .shouldFinishLoading()
      cy.getByTestId('numberOfListItems').should(
        'have.text',
        String(expectedRecords)
      )
      if (!skipClearFilters) {
        cy.getByTestId('clearAllFiltersButton').click()
      }
    }

    it(`opens all filters, asserts expected inputs exist and makes one
    search per filter type`, () => {
      cy.getAllByTestId('accordionTitle').click({
        multiple: true,
        timeout: 60000,
      })

      labelsFor.forEach(labelFor => {
        cy.getInputByLabelFor(labelFor)
      })

      cy.get('.inline.dropdown div.text')
        .as('inlineDropdownInitialTexts')
        .should('have.length', inlineDropdownInitialTexts.length)

      inlineDropdownInitialTexts.forEach(text => {
        cy.get('@inlineDropdownInitialTexts').should('contain', text)
      })

      cy.getByTestId('endDatePart').within(() => {
        cy.getInputByLabelText('Year').type('1950')
      })
      searchAssertExpectedRecordsAndClearFilters(8)

      dropdownSearchTests.forEach(
        ({ expectedRecords, expectedTags, name, optionText, searchQuery }) => {
          cy.getDropdownSearchByName(name).type(searchQuery)
          cy.selectMultipleSearchDropdownOptionByText(optionText)

          if (expectedTags !== undefined) {
            cy.getDropdownSearchByName(name)
              .parentsUntil('.field')
              .find('.sliders.icon')
              .click()
            cy.get('.active.modal').within(() => {
              cy.getByText(optionText, { exact: false })
                .parentsUntil('.description')
                .find('.ui.labels a.label')
                .should('have.length', expectedTags)
              cy.get('.close.icon').click()
            })
          }

          searchAssertExpectedRecordsAndClearFilters(expectedRecords)
        }
      )

      dropdownTests.forEach(({ expectedRecords, name, optionText }) => {
        cy.getInputByLabelFor(name).click()
        cy.selectDropdownOptionByText(optionText)

        searchAssertExpectedRecordsAndClearFilters(expectedRecords)
      })

      checkboxTests.forEach(({ expectedRecords, name, label }) => {
        cy.get(`label[for="${name}"]`)
          .parent()
          .within(() => {
            cy.getByText(label, { exact: false }).click()
          })

        searchAssertExpectedRecordsAndClearFilters(expectedRecords)
      })

      inputTests.forEach(({ expectedRecords, input, inputs, name, names }) => {
        if (names) {
          names.forEach((inputName, index) => {
            cy.getByElementName(inputName).type(inputs[index])
          })
        } else {
          cy.getByElementName(name).type(input)
        }

        searchAssertExpectedRecordsAndClearFilters(expectedRecords)
      })
    })

    it(`searches with non-matching free-text; with matching free text; with
    indexed value; with combined filters; with specific rank under specific
    taxon; and modifies filter and re-applies search`, () => {
      cy.log('test non-matching free-text')
      cy.getByTestId('filterColumn').within(() => {
        cy.getByText('Agent').click()
      })
      cy.getDropdownSearchByName('agent.tagValues').type('abc')
      cy.selectMultipleSearchDropdownOptionByText('abc')
      searchAssertExpectedRecordsAndClearFilters(0)

      cy.log('test matching free-text')
      cy.getDropdownSearchByName('agent.tagValues')
        .clear()
        .type('Police')
      cy.selectMultipleSearchDropdownOptionByText('Police')
      searchAssertExpectedRecordsAndClearFilters(3)

      cy.log('test indexed value')
      cy.getDropdownSearchByName('agent.tagValues')
        .clear()
        .type('Police')
      cy.selectMultipleSearchDropdownOptionByText(
        'Police - Jokkmokk [collector]'
      )
      searchAssertExpectedRecordsAndClearFilters(1)

      cy.log('test combined filters')
      cy.getByTestId('filterColumn').within(() => {
        cy.getByText('Locality and origin').click()
      })
      cy.getDropdownSearchByName('locality.higherGeography.tagValues').type(
        'Sweden'
      )
      cy.selectMultipleSearchDropdownOptionByText('Sweden')
      searchAssertExpectedRecordsAndClearFilters(9, {
        skipClearFilters: true,
      })

      cy.getByTestId('filterColumn').within(() => {
        cy.getByText('Taxonomy').click()
      })
      cy.getDropdownSearchByName('taxonomy.tagValues').type('gulo')
      cy.selectMultipleSearchDropdownOptionByText('gulo')
      searchAssertExpectedRecordsAndClearFilters(3, {
        skipClearFilters: true,
      })

      cy.getByTestId('filterColumn').within(() => {
        cy.getByText('Collecting date').click()
        cy.getByTestId('startDatePart').within(() => {
          cy.getInputByLabelText('Year').type('1990')
        })
      })
      searchAssertExpectedRecordsAndClearFilters(1, {
        skipClearFilters: true,
      })

      cy.log('test modifying filter')
      cy.getByTestId('startDatePart').within(() => {
        cy.getInputByLabelText('Year').type('{backspace}{backspace}00')
      })
      searchAssertExpectedRecordsAndClearFilters(2, {
        skipClearFilters: true,
      })

      cy.getDropdownSearchByName('taxonomy.tagValues').type('lynx')
      cy.selectMultipleSearchDropdownOptionByText('lynx')
      searchAssertExpectedRecordsAndClearFilters(5)

      cy.log('test specific rank under specific taxon filter')
      cy.getDropdownSearchByName('taxonomy.tagValues')
        .clear()
        .type('lynx')
      cy.selectMultipleSearchDropdownOptionByText('lynx')
      searchAssertExpectedRecordsAndClearFilters(3, {
        skipClearFilters: true,
      })

      cy.getInputByLabelFor('taxonomy.tagType').click()
      cy.selectDropdownOptionByText('genus')
      searchAssertExpectedRecordsAndClearFilters(0, {
        skipClearFilters: true,
      })

      cy.getInputByLabelFor('taxonomy.tagType').click()
      cy.selectDropdownOptionByText('species')
      searchAssertExpectedRecordsAndClearFilters(3, {
        skipClearFilters: true,
      })
    })
  })
