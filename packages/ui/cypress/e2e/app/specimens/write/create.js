export default () =>
  describe('create', () => {
    before(() => {
      cy.resetDevelopmentSqlDb()
      cy.resetElasticSpecimenIndex()
    })

    beforeEach(() => {
      cy.visit('/app/specimens/mammals')
      cy.get('[data-testid="infinityTableHeader"', {
        log: false,
        timeout: 60000,
      })
    })

    it('creates records, validates catalog number and focuses new record in table', () => {
      cy.log('create with automatic number')
      cy.getByText('New record').click()
      cy.getByTestId('createAutomaticNumber').click()
      cy.url().should('include', '/edit/')
      cy.getByTestId('formSectionNavigationHeader')
        .invoke('text')
        .should('include', 'Ma20')
        .should('have.length', 10)

      cy.log('create with 6-digit manual number')
      cy.getByText('New record').click()
      cy.getByTestId('enterManualNumber').click()
      cy.getByElementName('individual.identifiers.0.value')
        .as('catalogNumberInput')
        .type('123456')
      cy.getByTestId('useThisNumber').click()
      cy.url().should('include', '/edit/')
      cy.getByTestId('formSectionNavigationHeader')
        .invoke('text')
        .should('equal', '123456')

      cy.log('ensure error on 7 digits')
      cy.getByText('New record').click()
      cy.getByTestId('enterManualNumber').click()
      cy.get('@catalogNumberInput')
        .clear()
        .type('1234567')
        .blur()
      cy.getByTestId('useThisNumber').should('be.disabled')
      cy.getByText('Catalog number must be 6 or 8 digits')

      cy.log('ensure error cleared when going back to 6 digits')
      cy.get('@catalogNumberInput').type('{backspace}')
      cy.queryByText('Catalog number must be 6 or 8 digits').should('not.exist')
      cy.getByTestId('useThisNumber').should('not.be.disabled')

      cy.log('ensure error on non-digit')
      cy.get('@catalogNumberInput')
        .clear()
        .type('1234567a')
        .blur()
      cy.getByTestId('useThisNumber').should('be.disabled')
      cy.getByText('Catalog number must be 6 or 8 digits')

      cy.log('create with 8-digit number')
      cy.get('@catalogNumberInput')
        .clear()
        .type('12345678')
      cy.getByTestId('useThisNumber').click()
      cy.url().should('include', '/edit/')
      cy.getByTestId('formSectionNavigationHeader')
        .invoke('text')
        .should('equal', '12345678')

      cy.log('ensure new record focused and scrolled to in table')
      cy.getByTestId('tableTabMenuItem').click()
      cy.get('[data-isfocused="yes"]').should('contain', '12345678')
      cy.getByText('12345678').should('be.visible')

      cy.log('ensure error on creating with same number')
      cy.getByText('New record').click()
      cy.getByTestId('enterManualNumber').click()
      cy.get('@catalogNumberInput').type('12345678')
      cy.getByTestId('useThisNumber').click()
      cy.getByText('This catalog number is already registered').should('exist')
      cy.getByText('identifier: 12345678 already exists', {
        exact: false,
      })

      cy.log(
        'ensure possible to cancel after trying to creating with same number'
      )
      cy.url().should('include', '/create')
      cy.getByTestId('cancel').click()
      cy.url().should('not.include', '/create')
    })
  })
