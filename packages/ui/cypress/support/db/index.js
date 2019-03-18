Cypress.Commands.add('resetDevelopmentSqlDb', () => {
  cy.log('Resetting SQL db')
  return cy.exec(
    'cd ../../ && ./packages/scripts/src/bash/docker-import-data-from-sql.sh -f ./data/sample.dump.sql -d dina_dev',
    { log: false }
  )
})

Cypress.Commands.add('resetElasticSpecimenIndex', () => {
  cy.log('Resetting elasticsearch specimen index')
  return cy.exec(
    'cd ../../ && ./packages/scripts/src/bash/elasticsearch-import-index-specimen.sh -f ./data/sample.searchSpecimen',
    { log: false }
  )
})
