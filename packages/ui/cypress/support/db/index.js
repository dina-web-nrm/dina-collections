Cypress.Commands.add('resetDevelopmentSqlDb', () => {
  cy.log('Resetting SQL db')
  return cy.exec(
    'cd ../../ && ./packages/scripts/src/bash/docker-import-data-from-sql.sh -f ./data/sample.dump.sql -d dina_dev',
    { log: false }
  )
})

Cypress.Commands.add('resetSearchNormalizedAgentIndex', () => {
  cy.log('Resetting elasticsearch searchnormalizedagent index')
  return cy.exec(
    'cd ../../ && ./packages/scripts/src/bash/elasticsearch-import-indices.sh -f ./data/sample.index -n searchnormalizedagent',
    { log: false }
  )
})

Cypress.Commands.add('resetSearchPlaceIndex', () => {
  cy.log('Resetting elasticsearch searchplace index')
  return cy.exec(
    'cd ../../ && ./packages/scripts/src/bash/elasticsearch-import-indices.sh -f ./data/sample.index -n searchplace',
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

Cypress.Commands.add('resetSearchStorageLocationIndex', () => {
  cy.log('Resetting elasticsearch searchstoragelocation index')
  return cy.exec(
    'cd ../../ && ./packages/scripts/src/bash/elasticsearch-import-indices.sh -f ./data/sample.index -n searchstoragelocation',
    { log: false }
  )
})

Cypress.Commands.add('resetSearchTaxonIndex', () => {
  cy.log('Resetting elasticsearch searchtaxon index')
  return cy.exec(
    'cd ../../ && ./packages/scripts/src/bash/elasticsearch-import-indices.sh -f ./data/sample.index -n searchtaxon',
    { log: false }
  )
})

Cypress.Commands.add('resetSearchTaxonNameIndex', () => {
  cy.log('Resetting elasticsearch searchtaxonname index')
  return cy.exec(
    'cd ../../ && ./packages/scripts/src/bash/elasticsearch-import-indices.sh -f ./data/sample.index -n searchtaxonname',
    { log: false }
  )
})
