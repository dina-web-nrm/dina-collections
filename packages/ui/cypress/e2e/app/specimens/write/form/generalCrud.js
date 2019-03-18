export default () =>
  describe('form crud', () => {
    describe('create', () => {
      beforeEach(() => {
        cy.goToRoute('/app/specimens/mammals')
      })

      it('creates records and validates catalog number', () => {
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
        cy.queryByText('Catalog number must be 6 or 8 digits').should(
          'not.exist'
        )
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

        cy.log('ensure error on creating with same number')
        cy.getByText('New record').click()
        cy.getByTestId('enterManualNumber').click()
        cy.get('@catalogNumberInput').type('12345678')
        cy.getByTestId('useThisNumber').click()
        cy.getByText('This catalog number is already registered').should(
          'exist'
        )
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

    describe('delete', () => {
      beforeEach(() => {
        cy.goToRoute('/app/specimens/mammals/16/edit/sections/0')
      })

      it('deletes record', () => {
        cy.getByTestId('deleteButton').click()
        cy.getByTestId('confirmDeleteButton').click()
        cy.getByText('The specimen was deleted')
        cy.url()
          .should('include', 'search')
          .should('not.include', 'edit')
      })
    })

    describe('edit', () => {
      beforeEach(() => {
        cy.goToRoute('/app/specimens/mammals/1/edit/sections/0')
        cy.get('[data-testid="basicInformation"]', { log: false }) // wait until section rendered
      })

      it('changes section, adds determination, removes unsaved changes', () => {
        cy.getState()
          .its('form.editSpecimen')
          .then(formState => {
            expect(formState.initial).to.equal(formState.values)
          })

        cy.getByText('Undo changes')
          .as('undoChangesButton')
          .should('be.disabled')

        cy.getByText('Next').click()
        cy.getByTestId('add-determination').click()
        cy.get('.accordion .content.active').within(() => {
          cy.getInputByFieldLabel('Interpreted taxon name').type('Canis')
        })

        cy.getByText('Unsaved changes')
        cy.get('@undoChangesButton').should('not.be.disabled')
        cy.getState()
          .its('form.editSpecimen')
          .then(formState => {
            expect(formState.initial).not.to.equal(formState.values)
          })

        cy.get('@undoChangesButton').click()
        cy.getState()
          .its('form.editSpecimen')
          .then(formState => {
            expect(formState.initial).to.equal(formState.values)
          })
      })
    })
  })
