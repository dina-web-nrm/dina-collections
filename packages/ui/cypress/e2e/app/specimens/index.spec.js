import readForm from './read/form'
import sourceData from './read/sourceData'
import table from './read/table'
import tableSettings from './read/tableSettings'

import catalogCardDate from './write/form/catalogCardDate'
import generalCrud from './write/form/generalCrud'

describe('Specimen', () => {
  before(() => {
    cy.resetDevelopmentSqlDb()
    cy.resetElasticSpecimenIndex()
  })

  beforeEach(() => {
    cy.login()
  })

  describe('read', () => {
    readForm()
    sourceData()
    table()
    tableSettings()
  })

  describe('write', () => {
    generalCrud()
    catalogCardDate()
  })
})
