describe('Login', () => {
  context('with login form', () => {
    beforeEach(() => {
      cy.visit('/login')
    })

    it('can login by pressing enter', () => {
      cy.loginWithForm('test', 'password')
        .url()
        .should('include', '/app')
    })

    it('can login by clicking login button', () => {
      cy.get('[name=username]')
        .type('test')
        .get('[name=password]')
        .type('password')
        .getByTestId('login-button')
        .click()
        .url()
        .should('include', '/app')
    })

    it('disable login button if username and password are empty', () => {
      cy.get('[name=btn-login]').should('be.disabled')
    })

    it('shows an validation error if username is empty', () => {
      cy.get('[name=password]')
        .type('test')
        .getByTestId('login-button')
        .click()
        .getByText('Required')
        .should('exist')
        .url()
        .should('not.include', '/app')
    })

    it('shows an validation error if password is empty', () => {
      cy.get('[name=username]')
        .type('test')
        .getByTestId('login-button')
        .click()
        .getByText('Required')
        .should('exist')
        .url()
        .should('not.include', '/app')
    })

    it('shows an validation error if usrname is removed', () => {
      cy.get('[name=username]')
        .type('test{selectall}{backspace}')
        .blur()
        .getByText('Required')
        .should('exist')
        .url()
        .should('not.include', '/app')
    })

    it('shows an validation error if password is removed', () => {
      cy.get('[name=username]')
        .type('test')
        .get('[name=password]')
        .type('password{selectall}{backspace}')
        .blur()
        .getByText('Required')
        .should('exist')
        .url()
        .should('not.include', '/app')
    })

    it('shows invalid user credentials message on a failed login', () => {
      cy.get('[name=username]')
        .type('tester')
        .get('[name=password]')
        .type('password{enter}')
        .getByText('Invalid user credentials')
        .should('exist')
        .url()
        .should('not.include', '/app')
    })
  })

  context('with login api', () => {
    it('can login with valid username and password', () => {
      cy.login({ password: 'password', username: 'test' }).then(res => {
        expect(res.status).to.eq(200)
      })
    })

    it('failed login with invalid username and password', () => {
      cy.login({
        failOnStatusCode: false,
        password: 'password',
        username: 'tester',
      }).then(res => {
        expect(res.status).to.eq(401)
        expect(res.body)
          .to.have.property('error')
          .to.eq('invalid_grant')
        expect(res.body)
          .to.have.property('error_description')
          .to.eq('Invalid user credentials')
      })
    })
  })
})
