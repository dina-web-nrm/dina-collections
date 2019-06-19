describe('resourceManager: for each resource', () => {
  before(() => {
    cy.resetDevelopmentSqlDb()
    cy.resetSearchNormalizedAgentIndex()
    cy.resetSearchPlaceIndex()
    cy.resetSearchSpecimenIndex()
    cy.resetSearchStorageLocationIndex()
    cy.resetSearchTaxonIndex()
    cy.resetSearchTaxonNameIndex()
  })

  beforeEach(() => {
    cy.visit('/app')
  })

  it(`shows table without errors and downloads CSV export`, () => {
    const testTableExport = ({ path }) => {
      cy.log('loads table without error')
      cy.goToRoute(path)
      cy.get('.error').should('not.exist')

      cy.log('downloads csv export')
      cy.getByTestId('shareMenuItem').click()
      cy.getByTestId('exportToCsvButton').click()
      cy.getByText('Exporting')
      cy.getByTestId('downloadLoadingButton')
      cy.getByTestId('downloadButton', { timeout: 120000 })
        .should('have.text', 'Download')
        .click()
      cy.quickQueryByText('Exporting').should('not.exist')
      cy.get('.error').should('not.exist')
    }

    const testCases = [
      { path: '/app/specimens/mammals' },
      { path: '/app/agents' },
      { path: '/app/localities' },
      { path: '/app/storageLocations' },
      { path: '/app/taxa' },
      { path: '/app/taxonNames' },
    ]

    testCases.forEach(testTableExport)
  })

  it(`shows tree without errors`, () => {
    const treeTestCases = [
      { path: '/app/localities', rootNode: 'The Earth' },
      { path: '/app/storageLocations', rootNode: 'NRM' },
      { path: '/app/taxa', rootNode: 'Mammalia' },
    ]

    const testTree = ({ path, rootNode }) => {
      cy.goToRoute(path)
      cy.getByTestId('treeTabMenuItem').click()
      cy.getTreeListItemRowByText(rootNode).click()
      cy.get('.error').should('not.exist')
    }

    treeTestCases.forEach(testTree)
  })

  it(`can apply some filter for each resource except specimen`, () => {
    const testFilter = ({
      filteredNumberOfRecords,
      inputLabelFor,
      inputValue,
      path,
    } = {}) => {
      cy.goToRoute(path)
      cy.getByTestId('searchMenuItem').click()
      cy.getByTestId('filterColumn').within(() => {
        cy.getInputByLabelFor(inputLabelFor).type(inputValue)
      })
      cy.getByTestId('searchButton')
        .click()
        .shouldBeLoadingAndFinishLoading()
      cy.get('.error').should('not.exist')
      cy.getByTestId('numberOfListItems').should(
        'have.text',
        filteredNumberOfRecords
      )
    }

    const testCases = [
      {
        filteredNumberOfRecords: '2',
        inputLabelFor: 'fullName',
        inputValue: 'john',
        path: '/app/agents',
      },
      {
        filteredNumberOfRecords: '3',
        inputLabelFor: 'name',
        inputValue: '* lappmark',
        path: '/app/localities',
      },
      {
        filteredNumberOfRecords: '5',
        inputLabelFor: 'name',
        inputValue: '*03*',
        path: '/app/storageLocations',
      },
      {
        filteredNumberOfRecords: '2',
        inputLabelFor: 'name',
        inputValue: 'lynx',
        path: '/app/taxa',
      },
      {
        filteredNumberOfRecords: '4',
        inputLabelFor: 'name',
        inputValue: 'ca',
        path: '/app/taxonNames',
      },
    ]

    testCases.forEach(testFilter)
  })

  it.only(`creates, edits, deletes record for each resource except specimen and taxon`, () => {
    const testCreateEditDelete = ({ inputs, path } = {}) => {
      cy.goToRoute(path)
      cy.getByText('New record').click()
      inputs.forEach(({ inputLabelFor, inputValue, optionText }) => {
        if (inputLabelFor) {
          cy.getInputByLabelFor(inputLabelFor).type(inputValue)
        }
        if (optionText) {
          cy.getDropdownOptionByText(optionText).click()
        }
      })
      cy.getByTestId('saveButton').click()
      cy.get('.error').should('not.exist')

      cy.url().should('include', 'mainColumn=edit')
      cy.getByText('Record history') // ensure loaded before editing
      const firstInput = inputs[0]
      const newValue = firstInput.inputValue.slice(0, -1)
      cy.getInputByLabelFor(firstInput.inputLabelFor)
        .clear()
        .type(newValue)
      cy.getByTestId('saveButton').click()
      cy.get('.error').should('not.exist')
      cy.getByText(newValue)

      cy.getByTestId('deleteButton').click()
      cy.getByTestId('confirmDeleteButton').click()
      cy.getByText('The record was deleted')
      cy.quickQueryByText(newValue)
    }

    const testCases = [
      {
        inputs: [{ inputLabelFor: 'fullName', inputValue: 'Ada' }],
        path: '/app/agents',
      },
      {
        inputs: [
          { inputLabelFor: 'name', inputValue: 'Atlantis' },
          { inputLabelFor: 'group', inputValue: 'cou', optionText: 'Country' },
          {
            inputLabelFor: 'parent.id',
            inputValue: 'Earth',
            optionText: 'The Earth [planet]',
          },
        ],
        path: '/app/localities',
      },
      {
        inputs: [
          { inputLabelFor: 'name', inputValue: 'Pod 39' },
          {
            inputLabelFor: 'group',
            inputValue: 'cab',
            optionText: 'Cabinet',
          },
          {
            inputLabelFor: 'parent.id',
            inputValue: 'bens',
            optionText: 'Bensalen [room]',
          },
        ],
        path: '/app/storageLocations',
      },
      {
        inputs: [
          { inputLabelFor: 'name', inputValue: 'Licuala grandis' },
          { inputLabelFor: 'rank', inputValue: 'spe', optionText: 'Species' },
        ],
        path: '/app/taxonNames',
      },
    ]

    testCases.forEach(testCreateEditDelete)
  })

  it(`creates, edits, deletes record for taxon`, () => {
    cy.goToRoute('/app/taxa')
    cy.getByText('New record').click()
    cy.getInputByLabelFor('parent.id').type('gulo')
    cy.getDropdownOptionByText('Gulo [genus]').click()
    cy.getDropdownInputByText('Add accepted name').type('g')
    cy.getDropdownOptionByText('Glossophaginae').click()
    cy.getByTestId('saveButton').click()
    cy.get('.error').should('not.exist')

    cy.url().should('include', 'mainColumn=edit')
    cy.getByText('Record history') // ensure loaded before editing
    cy.getInputByLabelFor('parent.id').type('lynx l')
    cy.getDropdownOptionByText('Lynx lynx [species]').click({ force: true })
    cy.getByTestId('saveButton').click()
    cy.get('.error').should('not.exist')
    cy.getByText('Lynx lynx [species]')
    cy.getByText('Glossophaginae')

    cy.getByTestId('deleteButton').click()
    cy.getByTestId('confirmDeleteButton').click()
    cy.getByText('The record was deleted')
    cy.quickQueryByText('Glossophaginae')
  })
})
