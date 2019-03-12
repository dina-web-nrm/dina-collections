import 'cypress-testing-library/add-commands'

Cypress.Commands.add('dispatch', action => {
  return cy.window({ log: false }).then(({ store }) => {
    return cy.log(action.type).then(() => {
      return store.dispatch(action)
    })
  })
})

Cypress.Commands.add('getState', () => {
  return cy
    .log(`getState`)
    .window({ log: false })
    .then(({ store }) => {
      return store.getState()
    })
})

Cypress.Commands.add(
  'login',
  ({
    failOnStatusCode = true, // set to false to test response on fail
    password = 'password',
    username = 'test',
  } = {}) => {
    if (username && password) {
      cy.visit('/', { log: false })
      return cy
        .request({
          body: {
            client_id: 'dina-rest',
            grant_type: 'password',
            password,
            username,
          },
          failOnStatusCode,
          form: true,
          method: 'POST',
          url: '/auth/realms/dina/protocol/openid-connect/token',
        })
        .then(keycloakResponse => {
          const { body: loginPayload, status } = keycloakResponse

          if (status === 200) {
            const accessToken = loginPayload.access_token

            if (!accessToken) {
              throw new Error('did not get access token')
            }

            const mappedLoginPayload = {
              ...loginPayload,
              accessToken,
            }
            delete mappedLoginPayload.access_token

            cy.dispatch({
              payload: mappedLoginPayload,
              type: 'USER_LOG_IN_SUCCESS',
            })

            return cy
              .request({
                failOnStatusCode,
                headers: {
                  Authorization: `bearer ${accessToken}`,
                },
                method: 'GET',
                url: '/auth/realms/dina/protocol/openid-connect/userinfo',
              })
              .then(({ body: user }) => {
                return cy
                  .dispatch({
                    payload: user,
                    type: 'USER_GET_USER_SUCCESS',
                  })
                  .then(() => {
                    return keycloakResponse
                  })
              })
          }

          return keycloakResponse
        })
    }
    return cy.log(
      'Did not receive username and password, assuming auth is disabled'
    )
  }
)

Cypress.Commands.add(
  'shouldHaveHref',
  {
    prevSubject: true,
  },
  (subject, href) => {
    cy.wrap(subject).should('have.attr', 'href', href)
  }
)
