import '../../redux'

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
          log: false,
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
                log: false,
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
