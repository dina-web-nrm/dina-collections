Cypress.Commands.add('resetDevelopmentSqlDb', () => {
  cy.log('Resetting SQL db')
  return cy.exec(
    'cd ../../ && ./packages/scripts/src/bash/docker-import-data-from-sql.sh -f ./data/sample.dump.sql -d dina_dev',
    { log: false }
  )
})

Cypress.Commands.add('resetSearchSpecimenIndex', () => {
  cy.log('Resetting elasticsearch searchspecimen index')
  return cy.exec(
    'cd ../../ && ./packages/scripts/src/bash/elasticsearch-import-indices.sh -f ./data/sample.index -n searchspecimen',
    { log: false }
  )
})
