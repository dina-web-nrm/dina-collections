export default () =>
  describe('edit', () => {
    before(() => {
      cy.resetDevelopmentSqlDb()
      cy.resetSearchNormalizedAgentIndex()
      cy.resetSearchPlaceIndex()
      cy.resetSearchSpecimenIndex()
      cy.resetSearchStorageLocationIndex()
      cy.resetSearchTaxonIndex()
      cy.resetSearchTaxonNameIndex()
    })

    describe('general', () => {
      beforeEach(() => {
        cy.visit(`/app/specimens/mammals?mainColumn=edit&itemId=2&sectionId=0`)
        cy.get('[data-testid="basicInformation"]', {
          log: false,
          timeout: 20000,
        })
      })

      it('removes unsaved changes', () => {
        cy.getState()
          .its('form.specimenEdit')
          .then(formState => {
            expect(formState.initial).to.equal(formState.values)
          })

        cy.getByText('Undo changes')
          .as('undoChangesButton')
          .should('be.disabled')

        cy.getByTestId('formSectionNavigationItem-collectingDeath').click()
        cy.getByElementName(
          'individual.collectingInformation.0.event.expeditionText'
        ).type('some expedition text')

        cy.getByText('Unsaved changes')
        cy.get('@undoChangesButton').should('not.be.disabled')
        cy.getState()
          .its('form.specimenEdit')
          .then(formState => {
            expect(formState.initial).not.to.equal(formState.values)
          })

        cy.get('@undoChangesButton').click()
        cy.getState()
          .its('form.specimenEdit')
          .then(formState => {
            expect(formState.initial).to.equal(formState.values)
          })
      })

      it('expands all sections', () => {
        cy.get('.ui.green.segment').should('have.length', 1)
        cy.getByTestId('formSectionNavigationItem-expandAllSections').click()
        cy.get('.ui.green.segment').should('have.length', 6)

        cy.getByTestId('basicInformation')
        cy.getByTestId('taxonomy')
        cy.getByTestId('localityOrigin')
        cy.getByTestId('collectingDeath')
        cy.getByTestId('physicalObjects')
        cy.getByTestId('features')
      })
    })

    describe('sections', () => {
      afterEach(() => {
        cy.getByTestId('saveButton')
          .click()
          .shouldFinishLoading()
        cy.errorClassShouldNotExist()
      })

      describe('basicInformation', () => {
        beforeEach(() => {
          cy.visit(
            `/app/specimens/mammals?mainColumn=edit&itemId=2&sectionId=0`
          )
          cy.get('[data-testid="basicInformation"]', {
            log: false,
            timeout: 20000,
          })
        })

        it('edits, removes, adds identifier', () => {
          cy.getByElementName('individual.identifiers.2.value')
            .clear()
            .type('newIdentifierValue')

          cy.get('[data-testid="identifiers"] .trash.icon')
            .should('have.length', 2)
            .first()
            .click()
          cy.getByTestId('popupConfirmButton').click()
          cy.get('[data-testid="identifiers"] .trash.icon').should(
            'have.length',
            1
          )
          cy.getByElementName('individual.identifiers.1.value').should(
            'have.value',
            'newIdentifierValue'
          )

          cy.getByText('Add identifier').click()
          cy.getDropdownInputByText('Select identifier type')
            .type('SVA{enter}')
            .parent()
            .shouldHaveName('individual.identifiers.2.identifierType.id') // we removed one above so this is now index 2
          cy.getByElementName('individual.identifiers.2.value').type('123')
        })
      })

      describe('taxonomy', () => {
        beforeEach(() => {
          cy.visit(
            `/app/specimens/mammals?mainColumn=edit&itemId=2&sectionId=1`
          )
          cy.get('[data-testid="taxonomy"]', {
            log: false,
            timeout: 20000,
          })
        })

        it('adds, removes, edits determination & can be saved without curatorial taxon', () => {
          cy.getAllByTestId('accordionTitle').should('have.length', 1)
          cy.getByTestId('accordion')
            .children()
            .should('have.length', 2)

          cy.getByText('Add determination').click()
          cy.getByTestId('accordion')
            .children()
            .should('have.length', 4)
          cy.getByTestId('activeAccordionContent').within(() => {
            cy.getInputByLabelText('Determined as (stated)').type(
              'Rhabdomys pum.'
            )
            cy.getInputByLabelText('Interpreted taxon name').type(
              'Rhabdomys pumilio'
            )
          })
          cy.getByTestId('saveButton')
            .click()
            .shouldFinishLoading()
          cy.reload()
          cy.getByTestId('accordion')
            .children()
            .should('have.length', 4)

          cy.getAllByTestId('accordionTitle')
            .last()
            .click()
          cy.getByTestId('activeAccordionContent').within(() => {
            cy.getByText('Delete determination').click()
          })
          cy.getByTestId('popupConfirmButton').click()
          cy.getByTestId('accordion')
            .children()
            .should('have.length', 2)

          cy.log('can be saved without curatorial taxon')
          cy.getByTestId('taxonEditButton').click()
          cy.getByTestId('taxonPreferredName').within(() => {
            cy.getByTestId('clearDropdownIcon').click()
          })
        })
      })

      describe('localityOrigin', () => {
        beforeEach(() => {
          cy.visit(
            `/app/specimens/mammals?mainColumn=edit&itemId=2&sectionId=2`
          )
          cy.get('[data-testid="localityOrigin"]', {
            log: false,
            timeout: 20000,
          })
        })

        it('edits interpreted locality and adds origin', () => {
          cy.getByElementName(
            'individual.collectingInformation.0.event.locationInformation.localityI'
          )
            .clear()
            .type('Humansdorf')

          cy.getByText('Add origin').click()
          cy.getByElementName(
            'individual.originInformation.0.originLocality'
          ).type('Kapstaden')
        })
      })

      describe('collectingDeath', () => {
        beforeEach(() => {
          cy.visit(
            `/app/specimens/mammals?mainColumn=edit&itemId=2&sectionId=3`
          )
          cy.get('[data-testid="collectingDeath"]', {
            log: false,
            timeout: 20000,
          })
        })

        it('edits collector with dropdown and picker', () => {
          cy.getByTestId('collectorExpedition').within(() => {
            cy.getByTestId('editAgentButton').click()
            cy.getDropdownSearchByName(
              'individual.collectingInformation.0.collectedByAgent'
            ).type('john')
            cy.selectDropdownOptionByText('John Doe')
          })
          cy.getByTestId('collectorExpedition').contains('John Doe [agent]')

          cy.getByTestId('saveButton')
            .click()
            .shouldFinishLoading()
          cy.errorClassShouldNotExist()

          cy.getByTestId('collectorExpedition').within(() => {
            cy.getByTestId('editAgentButton').click()
            cy.getByTestId('openAgentPickerButton').click()
          })
          cy.getByText('Pehr Osbeck', { timeout: 20000 }).click()
          cy.getByTestId('pickerPickButton').click()
          cy.getByTestId('collectorExpedition').contains('Pehr Osbeck [agent]')
        })
      })

      describe('physicalObjects', () => {
        beforeEach(() => {
          cy.visit(
            `/app/specimens/mammals?mainColumn=edit&itemId=2&sectionId=4`
          )
          cy.get('[data-testid="physicalObjects"]', {
            log: false,
            timeout: 60000,
          })
        })

        it('removes physical object and adds new with curatorial assessment', () => {
          cy.getByText('Entire specimen in alcohol')
          cy.getByTestId('physicalObjectsWetPreparation').within(() => {
            cy.getByTestId('accordionTitle').click()
          })
          cy.getByText('Delete wet preparation').click()
          cy.getByTestId('popupConfirmButton').click()
          cy.quickQueryByText('Entire specimen in alcohol').should('not.exist')

          cy.getByText('Add a skin').click()
          cy.getByTestId('activeAccordionContent').within(() => {
            cy.getInputByLabelText('Preparation type')
              .click({ force: true })
              .type('complete')
            cy.selectDropdownOptionByText('Complete, mounted skin')
            cy.getInputByLabelText('Normal storage location').type('Skinnrum')
            cy.selectDropdownOptionByText('Skinnrum kylda [room]')
            cy.getByText('New assessment').click()
          })
          cy.getByText('Add').click()

          cy.getByTestId('activeAccordionTitle').click()
          cy.getByText('Complete, mounted skin')
          cy.getByText('Skinnrum kylda [room]')
          cy.getByText('In storage')
        })
      })

      describe('features', () => {
        beforeEach(() => {
          cy.visit(
            `/app/specimens/mammals?mainColumn=edit&itemId=2&sectionId=5`
          )
          cy.get('[data-testid="features"]', {
            log: false,
            timeout: 20000,
          })
        })

        it('updates sex and adds length', () => {
          cy.getByText('Sex').click()
          cy.getByTestId('clearDropdownIcon').click()
          cy.getDropdownInputByText('Select sex').click()
          cy.selectDropdownOptionByText('female?')
          cy.getByText('female?').should('be.visible')

          cy.getInputByLabelText('Sex').click()
          cy.selectDropdownOptionByText('indeterminate')
          cy.quickQueryByText('female?').should('not.be.visible')
          cy.getByText('indeterminate')

          cy.getByText('Lengths').click()
          cy.getByTestId('activeAccordionContent')
            .find('tr')
            .first()
            .within(() => {
              cy.get('[placeholder="Add length"]').type('4.5')
              cy.getByText('unspecified').click()
              cy.selectDropdownOptionByText('cm')
            })
        })
      })
    })
  })
