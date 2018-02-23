const objectPath = require('object-path')
const createDb = require('../../../lib/postgres/db')
const syncModels = require('../../../lib/postgres/models/syncModels')
const defaultConfig = require('../../../config')
const createSpecimen = require('./specimen')

const dbDescribe = require('../../../utilities/test/dbDescribe')

const setup = (flushOnRestart = false) => {
  const config = { ...defaultConfig }
  if (flushOnRestart) {
    objectPath.set(config, 'db.flushOnRestart', true)
  }

  return createDb({ config }).then(sequelize => {
    const specimen = createSpecimen({
      sequelize,
    })
    return syncModels({
      config,
      modelArray: [
        {
          model: specimen,
          name: 'specimen',
        },
      ],
    }).then(() => {
      return specimen
    })
  })
}

dbDescribe('server/apis/specimensApi/models', () => {
  let specimen
  describe('specimen', () => {
    beforeAll(() => {
      return setup().then(createdSpecimen => {
        specimen = createdSpecimen
      })
    })

    describe('create', () => {
      it('Creates and returns a simple record not passing validation', () => {
        const data = {
          a: 2,
        }
        return specimen.create(data).then(res => {
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
        individualGroup: {
          taxonInformation: {
            determinations: [
              {
                taxonNameStandardized: 'first-taxon',
              },
            ],
          },
        },
      }
      const secondData = {
        a: 2,
        individualGroup: {
          taxonInformation: {
            determinations: [
              {
                taxonNameStandardized: 'second-taxon',
              },
            ],
          },
        },
      }
      const updateSecondData = {
        a: 3,
        individualGroup: {
          taxonInformation: {
            determinations: [
              {
                taxonNameStandardized: 'second-taxon',
              },
            ],
          },
        },
      }

      const forthData = {
        a: 1,
        individualGroup: {
          taxonInformation: {
            determinations: [
              {
                taxonNameStandardized: 'first-taxon',
              },
            ],
          },
        },
      }

      let firstId

      let secondId

      let thirdUpdatedVersionId

      let forthId

      beforeAll(() => {
        return setup().then(createdModel => {
          specimen = createdModel
          return specimen
            .create(firstUniqueData)
            .then(res => {
              firstId = res.id
            })
            .then(() => {
              return specimen.create(secondData)
            })
            .then(res => {
              secondId = res.id
            })
            .then(() => {
              return specimen.update({
                doc: updateSecondData,
                id: secondId,
              })
            })
            .then(res => {
              thirdUpdatedVersionId = res.versionId
            })
            .then(() => {
              return specimen.create(forthData)
            })
            .then(res => {
              forthId = res.id
            })
        })
      })

      it('Throws when taxonName not provided', () => {
        expect(specimen.getAllByTaxonName()).rejects.toThrow()
      })

      it('Returns all matching records when no versions exists', () => {
        return specimen
          .getAllByTaxonName({ taxonName: 'first-taxon' })
          .then(res => {
            expect(res.length).toEqual(2)
            expect(res[0].id).toEqual(firstId)
            expect(res[1].id).toEqual(forthId)
          })
      })
      it('Returns all matching records when versions exists and dont return duplicates', () => {
        return specimen
          .getAllByTaxonName({ taxonName: 'second-taxon' })
          .then(res => {
            expect(res.length).toEqual(1)
            expect(res[0].id).toEqual(secondId)
            expect(res[0].versionId).toEqual(thirdUpdatedVersionId)
          })
      })
      it('Returns empty array when no matches', () => {
        return specimen
          .getAllByTaxonName({ taxonName: 'non-existing-taxon' })
          .then(res => {
            expect(res.length).toEqual(0)
          })
      })
    })
  })
})
