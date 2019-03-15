Cypress.Commands.add('goToRoute', path => {
  return cy
    .log(`goToRoute ${path}`)
    .window({ log: false })
    .then(({ routerHistory }) => {
      return routerHistory.push(path)
    })
})
