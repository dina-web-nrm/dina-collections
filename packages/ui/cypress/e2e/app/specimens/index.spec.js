import catalogCardDate from './write/form/catalogCardDate'
import readForm from './read/form'
import sourceData from './read/sourceData'
import table from './read/table'
import tableSettings from './read/tableSettings'

import create from './write/form/create'
import edit from './write/form/edit'
import remove from './write/form/remove'

describe('Specimens', () => {
  before(() => {
    cy.resetDevelopmentSqlDb()
    cy.resetElasticSpecimenIndex()
  })

  beforeEach(() => {
    cy.login()
  })

  describe('read', () => {
    catalogCardDate()
    readForm()
    sourceData()
    table()
    tableSettings()
  })

  describe('write', () => {
    create()
    edit()
    remove()
  })
})
