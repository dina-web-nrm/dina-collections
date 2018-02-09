const createDb = require('../../../../lib/postgres/db')
const syncModels = require('../../../../lib/postgres/models/syncModels')
const config = require('../../../../config')
const createIndividualGroup = require('./individualGroup')

const dbDescribe = require('../../../../utilities/test/dbDescribe')

const setup = () => {
  return createDb({ config }).then(sequelize => {
    const individualGroup = createIndividualGroup({
      sequelize,
    })
    return syncModels({
      config,
      models: {
        individualGroup,
      },
    }).then(() => {
      return individualGroup
    })
  })
}

dbDescribe('server/apis/collectionsApi/models', () => {
  let individualGroup
  describe('individualGroup', () => {
    beforeAll(() => {
      return setup().then(createdIndividualGroup => {
        individualGroup = createdIndividualGroup
      })
    })

    describe('create', () => {
      it('Creates and returns a simple record not passing validation', () => {
        const data = {
          a: 2,
        }
        return individualGroup.create(data).then(res => {
          expect(res).toBeTruthy()
          expect(res).toBeTruthy()
          expect(res.document).toEqual(data)
          expect(res.id).toBeTruthy()
          expect(res.versionId).toBeTruthy()
          expect(res.id).toBe(res.versionId)
          expect(res.schemaCompliant).toBe(false)
        })
      })
    })

    describe('getAllByTaxonName', () => {
      const firstUniqueData = {
        a: 1,
        identifications: [
          {
            identifiedTaxonNameStandardized: 'first-taxon',
          },
        ],
      }
      const secondData = {
        a: 2,
        identifications: [
          {
            identifiedTaxonNameStandardized: 'second-taxon',
          },
        ],
      }
      const updateSecondData = {
        a: 3,
        identifications: [
          {
            identifiedTaxonNameStandardized: 'second-taxon',
          },
        ],
      }

      const forthData = {
        a: 1,
        identifications: [
          {
            identifiedTaxonNameStandardized: 'first-taxon',
          },
        ],
      }

      let firstId

      let secondId

      let thirdUpdatedVersionId

      let forthId

      beforeAll(() => {
        return setup().then(createdModel => {
          individualGroup = createdModel
          return individualGroup
            .create(firstUniqueData)
            .then(res => {
              firstId = res.id
            })
            .then(() => {
              return individualGroup.create(secondData)
            })
            .then(res => {
              secondId = res.id
            })
            .then(() => {
              return individualGroup.update({
                doc: updateSecondData,
                id: secondId,
              })
            })
            .then(res => {
              thirdUpdatedVersionId = res.versionId
            })
            .then(() => {
              return individualGroup.create(forthData)
            })
            .then(res => {
              forthId = res.id
            })
        })
      })

      it('Throws when taxonName not provided', () => {
        expect(individualGroup.getAllByTaxonName()).rejects.toThrow()
      })

      it('Returns all matching records when no versions exists', () => {
        return individualGroup
          .getAllByTaxonName({ taxonName: 'first-taxon' })
          .then(res => {
            expect(res.length).toEqual(2)
            expect(res[0].id).toEqual(firstId)
            expect(res[1].id).toEqual(forthId)
          })
      })
      it('Returns all matching records when versions exists and dont return duplicates', () => {
        return individualGroup
          .getAllByTaxonName({ taxonName: 'second-taxon' })
          .then(res => {
            expect(res.length).toEqual(1)
            expect(res[0].id).toEqual(secondId)
            expect(res[0].versionId).toEqual(thirdUpdatedVersionId)
          })
      })
      it('Returns empty array when no matches', () => {
        return individualGroup
          .getAllByTaxonName({ taxonName: 'non-existing-taxon' })
          .then(res => {
            expect(res.length).toEqual(0)
          })
      })
    })
  })
})
