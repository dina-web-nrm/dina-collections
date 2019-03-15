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
