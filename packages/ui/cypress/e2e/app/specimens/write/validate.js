export default () =>
  describe('validation', () => {
    let newSpecimenId

    before(() => {
      cy.resetDevelopmentSqlDb()
      cy.resetElasticSpecimenIndex()
      cy.log('Create new specimen for tests')
      cy.visit('/app/specimens/mammals?mainColumn=create&sectionId=0')
      cy.getByTestId('createAutomaticNumber').click()
      cy.url()
        .should('include', 'mainColumn=edit')
        .then(url => {
          const itemIdPart = url.split('itemId=')[1]
          newSpecimenId = itemIdPart.split('&')[0] // eslint-disable-line prefer-destructuring
        })
    })

    afterEach(() => {
      cy.getByTestId('saveButton')
        .click()
        .shouldFinishLoading()
      cy.errorClassShouldNotExist()
    })

    it('validates coordinates format', () => {
      cy.visit(
        `/app/specimens/mammals?mainColumn=edit&itemId=${newSpecimenId}&sectionId=2`
      )
      cy.get('[data-testid="localityOrigin"]', {
        log: false,
        timeout: 60000,
      })
      cy.getByTestId('addPositionButton').click()

      cy.getInputByLabelText('Latitude')
        .type('N123')
        .blur()
      cy.getByText('Latitude must be number between 0 and 90')

      cy.getInputByLabelText('Latitude')
        .clear()
        .type('12.01')
        .blur()
      cy.quickQueryByText('Latitude must be number between 0 and 90').should(
        'not.exist'
      )

      cy.getInputByLabelText('Latitude')
        .clear()
        .type('110')
        .blur()
      cy.getByText('Latitude must be number between 0 and 90')

      cy.getInputByLabelText('Longitude')
        .type('45W')
        .blur()
      cy.getByText('Longitude must be number between 0 and 180')

      cy.getInputByLabelText('Longitude')
        .clear()
        .type('123.23456')
        .blur()
      cy.quickQueryByText('Longitude must be number between 0 and 180').should(
        'not.exist'
      )

      cy.getInputByLabelText('Longitude')
        .clear()
        .type('3040')
        .blur()
      cy.getByText('Longitude must be number between 0 and 180')

      cy.log('does not allow leading minus sign in input')
      cy.getInputByLabelText('Latitude')
        .clear()
        .type('-11')
        .should('have.value', '11')
      cy.quickQueryByText('Latitude must be number between 0 and 90').should(
        'not.exist'
      )

      cy.getInputByLabelText('Longitude')
        .clear()
        .type('-22.22')
        .should('have.value', '22.22')
      cy.quickQueryByText('Longitude must be number between 0 and 90').should(
        'not.exist'
      )

      cy.getByText('Done').click()
      cy.getByText('11 N, 22.22 E', { exact: false })
    })

    it('validates storage location required for physical object', () => {
      cy.visit(
        `/app/specimens/mammals?mainColumn=edit&itemId=${newSpecimenId}&sectionId=4`
      )
      cy.get('[data-testid="physicalObjects"]', {
        log: false,
        timeout: 60000,
      })
      cy.getByText('Add a skeleton').click()
      cy.getByTestId('physicalObjectsSkeleton').within(() => {
        cy.getInputByLabelText('Preparation type')
          .click({ force: true })
          .type('Antler{enter}')
        cy.getInputByLabelText('Normal storage location')
          .type('Bensalen{selectall}{backspace}')
          .blur()
      })

      cy.log('shows error on field and form section navigation')
      cy.getByText('Required')
      cy.getByTestId('formSectionNavigationItem-physicalObjects').should(
        'have.class',
        'error'
      )

      cy.log('shows error on closed accordion item title')
      cy.getByTestId('physicalObjectsSkeleton').within(() => {
        cy.getByTestId('activeAccordionTitle').click()
        cy.get('.error')
      })
      cy.quickQueryByText('There are issues that prevent saving')

      cy.getByTestId('physicalObjectsSkeleton').within(() => {
        cy.getByTestId('accordionTitle').click()
        cy.getInputByLabelText('Normal storage location').type('Bens')
        cy.selectDropdownOptionByText('Bensalen [room]')
      })
    })

    it('validates collecting date input', () => {
      cy.visit(
        `/app/specimens/mammals?mainColumn=edit&itemId=${newSpecimenId}&sectionId=3`
      )
      cy.get('[data-testid="collectingDeath"]', {
        log: false,
        timeout: 60000,
      })
      cy.getByTestId('collectingDate').within(() => {
        cy.getInputByLabelText('Year').as('yearInput')
        cy.getInputByLabelText('Month').as('monthInput')
        cy.getInputByLabelText('Day').as('dayInput')
        cy.get('input[value=single]').as('singleRadio')
        cy.get('input[value=range]').as('rangeRadio')
        cy.get('input[value=latest]').as('latestRadio')
      })

      cy.log('check input does not accept letters')
      cy.get('@dayInput')
        .type('abc')
        .should('have.value', '') // number input does not accept letters

      cy.log('check date input validation')
      cy.get('@dayInput')
        .type('15')
        .blur()
      cy.getByText('A day must have month and year')
      cy.get('@monthInput').type('1')
      cy.getByText('A month must have year')
      cy.get('@yearInput').type('20')
      cy.getByText('Invalid date')
      cy.get('@yearInput')
        .clear()
        .type('3000')
      cy.getByText('Only past dates allowed')

      cy.log('check .error classes applied')
      cy.getByTestId('formSectionNavigationItem-collectingDeath').should(
        'have.class',
        'error'
      )
      cy.getByTestId('collectingDate').within(() => {
        cy.get('.error')
      })

      cy.log('check errors removed on empty date')
      cy.get('@dayInput').clear()
      cy.get('@monthInput').clear()
      cy.get('@yearInput').clear()
      cy.quickQueryByText('Only past dates allowed').should('not.exist')
      cy.errorClassShouldNotExist()

      cy.log('check range date validation')
      cy.get('@rangeRadio').check({ force: true })
      cy.getByTestId('endDatePart').within(() => {
        cy.getInputByLabelText('Year').as('endYearInput')
        cy.getInputByLabelText('Month').as('endMonthInput')
      })
      cy.getByTestId('startDatePart').within(() => {
        cy.getInputByLabelText('Year').as('startYearInput')
      })

      cy.get('@startYearInput')
        .type('2000')
        .blur()
      cy.getByText('Both start and end required')
      cy.get('@endYearInput').type('1999')
      cy.getByText('End date before start date')
      cy.get('@endYearInput').clear()
      cy.get('@endMonthInput').type('5')
      cy.getByText('A month must have year')
      cy.get('@endYearInput').type('2000')
      cy.errorClassShouldNotExist()

      cy.get('@endMonthInput').clear()
      cy.get('@endYearInput').clear()

      cy.log('check date validation also applies to latest date')
      cy.get('@latestRadio').check({ force: true })
      cy.getByTestId('endDatePart').within(() => {
        cy.getInputByLabelText('Day').as('endDayInput')
      })
      cy.get('@endDayInput').type('24')
      cy.getByText('A day must have month and year')
      cy.get('@endYearInput').type('1980')
      cy.get('@endMonthInput').type('1')
    })

    it('sets and validates catalog card date in current year', () => {
      cy.visit(
        `/app/specimens/mammals?mainColumn=edit&itemId=${newSpecimenId}&sectionId=0`
      )
      cy.get('[data-testid="basicInformation"]', {
        log: false,
        timeout: 60000,
      })
      const momentNow = Cypress.moment()

      cy.log('Check validation error for future year')
      cy.getByText('Add catalog card creation').click()
      cy.getInputByLabelText('Year').type(momentNow.year() + 1)
      cy.getByText('Done').click()
      cy.getByText('Only past dates allowed')

      cy.log('Allows current year as date')
      cy.getInputByLabelText('Year')
        .clear()
        .type(momentNow.year())
      cy.getByText('Done').click()
      cy.getByTestId('recordHistoryExternalEvents').should(
        'contain',
        `${momentNow.format('YYYY')}:`
      )

      cy.log('Allows current year and month as date')
      cy.getByTestId('editRecordHistoryEventIcon').click()
      cy.getInputByLabelText('Month')
        .clear()
        .type(momentNow.month() + 1) // month is zero-based index
      cy.getByText('Done').click()
      cy.getByTestId('recordHistoryExternalEvents').should(
        'contain',
        `${momentNow.format('YYYY-MM')}:`
      )

      cy.log('Allows current year, month and day as date')
      cy.getByTestId('editRecordHistoryEventIcon').click()
      cy.getInputByLabelText('Day')
        .clear()
        .type(momentNow.date())
      cy.getByText('Done').click()
      cy.getByTestId('recordHistoryExternalEvents').should(
        'contain',
        `${momentNow.format('YYYY-MM-DD')}:`
      )
    })
  })
