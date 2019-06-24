export default () =>
  describe('edit', () => {
    before(() => {
      cy.resetDevelopmentSqlDb()
      cy.resetSearchNormalizedAgentIndex()
    })

    beforeEach(() => {
      cy.visit(`/app/agents?filterColumn=&itemId=2&mainColumn=edit`)
      cy.get('[data-testid="agent"]', {
        log: false,
        timeout: 20000,
      })
    })

    describe('undo changes', () => {
      it('removes unsaved changes', () => {
        cy.getState()
          .its('form.normalizedAgentEdit')
          .then(formState => {
            expect(formState.initial).to.equal(formState.values)
          })

        cy.getByTestId('undoChangesButton')
          .as('undoChangesButton')
          .should('be.disabled')

        cy.getByElementName('disambiguatingDescription').type(
          'some disambiguatingDescription text'
        )

        cy.getByText('Unsaved changes')
        cy.get('@undoChangesButton').should('not.be.disabled')
        cy.getState()
          .its('form.normalizedAgentEdit')
          .then(formState => {
            expect(formState.initial).not.to.equal(formState.values)
          })

        cy.get('@undoChangesButton').click()
        cy.getState()
          .its('form.normalizedAgentEdit')
          .then(formState => {
            expect(formState.initial).to.equal(formState.values)
          })
      })
    })

    describe('roles', () => {
      it('adds and removes role', () => {
        cy.quickQueryByTestId('accordion').should('not.exist')

        cy.getByText('Add role').click()
        cy.get('[data-testid=accordion] .title').should('have.length', 1)
        cy.get('[data-testid=accordion] .content').should('have.length', 1)

        cy.getByTestId('activeAccordionContent').within(() => {
          cy.getInputByLabelText('Role/position').type('Staff')
          cy.getInputByLabelText('Organization').type('some organization text')
          cy.getByTestId('startDatePart').within(() => {
            cy.getInputByLabelText('Year').type('2001')
            cy.getInputByLabelText('Month').type('2')
            cy.getInputByLabelText('Day').type('1')
          })
        })

        cy.getByTestId('saveButton')
          .click()
          .shouldBeLoadingAndFinishLoading()
        cy.reload()
        cy.getByTestId('recordHistoryEvents').within(() => {
          cy.getByText('Last modified by Test User', { exact: false })
        })
        cy.get('[data-testid=accordion] .title').should('have.length', 1)
        cy.get('[data-testid=accordion] .content').should('have.length', 1)

        cy.log('remove role')
        cy.get('[data-testid=accordion] .title').click()
        cy.getByTestId('activeAccordionContent').within(() => {
          cy.getByText('Delete role').click()
        })
        cy.getByTestId('popupConfirmButton').click()
        cy.getByTestId('saveButton')
          .click()
          .shouldBeLoadingAndFinishLoading()
      })
    })
  })
