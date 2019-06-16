export default () =>
  describe('invalid input', () => {
    it(`
      returns no result for: 
      collecting date invalid year,
      collecting date only searching for months,
      negative or zero max age/length/weight,
      age/length/weight between zero to zero
    `, () => {
      cy.getByTestId('filterColumn').within(() => {
        cy.getByText('Collecting date').click()
      })
      cy.getByTestIds(['activeAccordionContent', 'startDatePart']).within(
        () => {
          cy.getInputByLabelText('Year').type('123456')
        }
      )
      cy.getByTestId('searchButton').click()
      cy.getByText('No results found')
      cy.getByTestId('clearAllFiltersButton').click()

      cy.getByTestIds(['activeAccordionContent', 'endDatePart']).within(() => {
        cy.getInputByLabelText('Month').type('6')
      })
      cy.getByTestId('searchButton').click()
      cy.getByText('No results found')

      cy.getByTestIds(['activeAccordionContent', 'startDatePart']).within(
        () => {
          cy.getInputByLabelText('Month').type('1')
        }
      )
      cy.getByTestId('searchButton').click()
      cy.getByText('No results found')
      cy.getByTestId('clearAllFiltersButton').click()

      cy.getByTestId('filterColumn').within(() => {
        cy.getByText('Age and development').click()
        cy.getByText('Length').click()
        cy.getByText('Weight').click()
      })

      const rangeInputBaseNames = [
        'ageAndStage.age',
        'length.rangeValue',
        'weight.rangeValue',
      ]

      rangeInputBaseNames.forEach(inputBaseName => {
        cy.getByElementName(`${inputBaseName}.max`).type('-1')
        cy.getByElementName(`${inputBaseName}.max`).should('have.value', '')

        cy.getByElementName(`${inputBaseName}.max`).type('0')
        cy.getByTestId('searchButton').click()
        cy.getByText('No results found')
        cy.getByElementName(`${inputBaseName}.min`).type('0')
        cy.getByTestId('searchButton').click()
        cy.getByText('No results found')
        cy.getByTestId('clearAllFiltersButton').click()
      })
    })
  })
