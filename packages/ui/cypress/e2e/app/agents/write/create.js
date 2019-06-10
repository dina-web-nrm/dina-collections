export default () =>
  describe('create new agent', () => {
    before(() => {
      cy.resetDevelopmentSqlDb()
      cy.resetSearchNormalizedAgentIndex()
      cy.visit('/app/agents?mainColumn=create')
      cy.get('[data-testid="agentRoot"]', { log: false, timeout: 20000 })
    })

    it('fills in and save agent form', () => {
      cy.log(
        'adds agent type, full name, disambiguating description and remarks'
      )
      cy.getByElementName('agentType').check('organization', { force: true })
      cy.getByElementName('fullName').type('agentName')
      cy.getByElementName('disambiguatingDescription').type(Date.now())
      cy.getByText('Add agent remarks...').click()
      cy.getByElementName('remarks').type('some remarks text')

      cy.log('adds name details')
      cy.getByText('Add name details').click()
      cy.getByElementName('givenName').type('giveName')
      cy.getByElementName('familyName').type('familyName')
      cy.getByElementName('additionalName').type('additionalName')
      cy.getByElementName('alsoKnownAs').type('alsoKnownAs')
      cy.getByElementName('title').type('title')
      cy.getByElementName('abbreviation').type('abbreviation')
      cy.quickQueryByText('Add name details').should('not.exist')

      cy.log('adds affiliation')
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

      cy.log('adds contact information')
      cy.getByText('Add contact information').click()
      cy.getByElementName('telephone').type('1234567')
      cy.getByElementName('email').type('test@nrm.se')
      cy.getByElementName('streetAddress').type('some street name')
      cy.getByElementName('postOfficeBoxNumber').type('18')
      cy.getByElementName('city').type('Stockholm')
      cy.getByElementName('stateProvince').type('Stockholm')
      cy.getByElementName('postalCode').type('12345')
      cy.getByElementName('country').type('Sweden')
      cy.quickQueryByText('Add contact information').should('not.exist')

      cy.log('adds birth and death')
      cy.getByText('Add birth and death').click()
      cy.getByTestId('agentBirthAndDeath').within(() => {
        cy.getByTestId('startDatePart').within(() => {
          cy.getInputByLabelText('Year').type('1900')
          cy.getInputByLabelText('Month').type('2')
          cy.getInputByLabelText('Day').type('1')
        })
        cy.getByTestId('endDatePart').within(() => {
          cy.getInputByLabelText('Year').type('2008')
          cy.getInputByLabelText('Month').type('12')
          cy.getInputByLabelText('Day').type('30')
        })
      })
      cy.quickQueryByText('Add birth and death').should('not.exist')

      cy.log('clicks save button to save agent form')
      cy.url().should('not.include', 'itemId')
      cy.url().should('include', 'create')
      cy.getByTestId('saveButton').click()
      cy.url()
        .should('include', 'itemId')
        .should('include', 'mainColumn=edit')
        .should('not.include', 'create')
      cy.getByTestId('recordHistoryEvents').within(() => {
        cy.getByText('Created by Test User', { exact: false }).should('exist')
      })
    })
  })
