export default () =>
  describe('form crud', () => {
    describe('edit', () => {
      beforeEach(() => {
        cy.goToRoute('/app/specimens/mammals/1/edit/sections/0')
        // wait until section rendered
        cy.get('[data-testid="basicInformation"]', {
          log: false,
          timeout: 10000,
        })
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
