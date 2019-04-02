export default () =>
  describe('edit', () => {
    before(() => {
      cy.resetDevelopmentSqlDb()
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

    describe('affiliations', () => {
      it('adds, removes, edits affiliations', () => {
        cy.quickQueryByTestId('accordion').should('not.exist')

        cy.getByText('Add affiliation').click()
        cy.getByTestId('accordion')
          .children()
          .should('have.length', 2)

        cy.getByTestId('activeAccordionContent').within(() => {
          cy.getInputByLabelText('Affiliation/position').type('Staff')
          cy.getInputByLabelText('Affiliation').type('some affiliation text')
          cy.getByTestId('startDatePart').within(() => {
            cy.getInputByLabelText('Year').type('2001')
            cy.getInputByLabelText('Month').type('2')
            cy.getInputByLabelText('Day').type('1')
          })
          cy.getByTestId('endDatePart').within(() => {
            cy.getInputByLabelText('Year').type('2008')
            cy.getInputByLabelText('Month').type('12')
            cy.getInputByLabelText('Day').type('30')
          })
        })

        cy.getByTestId('saveButton')
          .click()
          .shouldFinishLoading()
        cy.reload()
        cy.getByTestId('accordion')
          .children()
          .should('have.length', 2)

        cy.getAllByTestId('accordionTitle')
          .last()
          .click()
        cy.getByTestId('activeAccordionContent').within(() => {
          cy.getByText('Delete affiliation').click()
        })
        cy.getByTestId('popupConfirmButton').click()

        cy.quickQueryByTestId('accordion').should('not.exist')

        cy.getByTestId('recordHistoryEvents').within(() => {
          cy.getByText('Last modified by Test User', { exact: false })
        })
      })
    })
  })
