describe('Login', () => {
  describe('with login API', () => {
    it('succeeds to login with valid username and password', () => {
      cy.login({ password: 'password', username: 'test' }).then(
        keycloakResponse => {
          const { body } = keycloakResponse

          /* eslint-disable camelcase */
          const { access_token, token_type } = body
          expect(typeof access_token).to.equal('string')
          expect(access_token.length > 100).to.be.true
          expect(token_type).to.equal('bearer')
          /* eslint-enable camelcase */

          expect(body).to.have.property('expires_in')
          expect(body).to.have.property('not-before-policy')
          expect(body).to.have.property('refresh_expires_in')
          expect(body).to.have.property('refresh_token')
          expect(body).to.have.property('scope')
          expect(body).to.have.property('session_state')
        }
      )
    })

    it('fails to login with invalid username and password', () => {
      cy.login({
        failOnStatusCode: false,
        password: 'invalid',
        username: 'not existing',
      }).then(keycloakResponse => {
        expect(keycloakResponse.status).to.eq(401)
        expect(keycloakResponse.body)
          .to.have.property('error')
          .to.eq('invalid_grant')
        expect(keycloakResponse.body)
          .to.have.property('error_description')
          .to.eq('Invalid user credentials')
      })
    })
  })

  describe('with login form', () => {
    describe('initial state', () => {
      beforeEach(() => {
        cy.visit('/login')
      })

      it('login button is disabled if username and password are empty', () => {
        cy.get('[name=btn-login]').should('be.disabled')
      })
    })

    describe('successes', () => {
      beforeEach(() => {
        cy.visit('/login')
        cy.get('[name=username]')
          .type('test')
          .get('[name=password]')
          .type(`password`)
      })

      it('can login by pressing enter', () => {
        cy.get('[name=password]')
          .type(`{enter}`)
          .url()
          .should('include', '/app')
      })

      it('can login by clicking login button', () => {
        cy.getByTestId('login-button')
          .click()
          .url()
          .should('include', '/app')
      })
    })

    describe('error handling', () => {
      describe('without submit', () => {
        beforeEach(() => {
          cy.visit('/login')
          cy.get('[name=username]')
            .type('test')
            .get('[name=password]')
            .type(`password`)
        })

        it('shows a validation error if username is typed and removed', () => {
          cy.get('[name=username]')
            .clear()
            .blur()
            .getByText('Required')
            .url()
            .should('not.include', '/app')
        })

        it('shows a validation error if password is typed and removed', () => {
          cy.get('[name=password]')
            .clear()
            .blur()
            .getByText('Required')
            .url()
            .should('not.include', '/app')
        })
      })

      describe('on submit', () => {
        beforeEach(() => {
          cy.visit('/login')
        })

        it('shows a validation error if password is empty on submit', () => {
          cy.get('[name=username]')
            .type('test')
            .getByTestId('login-button')
            .click()
            .getByText('Required')
            .url()
            .should('not.include', '/app')
        })

        it('shows a validation error if username is empty on submit', () => {
          cy.get('[name=password]')
            .type('password')
            .getByTestId('login-button')
            .click()
            .getByText('Required')
            .url()
            .should('not.include', '/app')
        })

        it('shows invalid user credentials message on a failed login', () => {
          cy.get('[name=username]')
            .type('invalidusername')
            .get('[name=password]')
            .type('notvalidpw{enter}')
            .getByText('Invalid user credentials')
            .url()
            .should('not.include', '/app')
        })
      })
    })
  })
})
