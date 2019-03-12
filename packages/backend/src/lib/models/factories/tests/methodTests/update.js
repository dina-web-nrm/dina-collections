const { hook } = require('common/src/testUtilities/envBackendDb')
const { getTestData } = require('../testData')

module.exports = function testUpdate({ config, modelType, setupModel }) {
  describe('Test update', () => {
    let model
    describe('Updating item without relationships', () => {
      let itemFirstVersion
      let itemSecondVersion
      hook(beforeEach, () => {
        itemFirstVersion = getTestData('itemPersonWithIdVersions', 0)
        itemSecondVersion = getTestData('itemPersonWithIdVersions', 1)
        return setupModel({ config }).then(createdModel => {
          model = createdModel
          return model.create({ allowId: true, item: itemFirstVersion })
        })
      })

      it('Throw error when id not provided', () => {
        return expect(model.update({})).rejects.toBeTruthy()
      })

      it('Throw error when id dont exist', () => {
        return expect(model.update({ id: 444 })).rejects.toBeTruthy()
      })

      it('Updates item', () => {
        return model
          .update({
            id: itemFirstVersion.id,
            item: itemSecondVersion,
          })
          .then(({ item: resFromUpdate }) => {
            expect(resFromUpdate.attributes).toEqual(
              itemSecondVersion.attributes
            )

            return model
              .getById({ id: itemFirstVersion.id })
              .then(({ item: resFromGet }) => {
                expect(resFromGet.attributes).toEqual(
                  itemSecondVersion.attributes
                )
                expect(resFromGet.id).toEqual(itemSecondVersion.id)
              })
          })
      })
    })
    describe('Updating item with relationships', () => {
      let itemFirstVersion
      let itemSecondVersion
      let itemThirdVersion
      beforeEach(() => {
        itemFirstVersion = getTestData(
          'itemPersonWithIdAndRelationshipsVersions',
          0
        )
        itemSecondVersion = getTestData(
          'itemPersonWithIdAndRelationshipsVersions',
          1
        )
        itemThirdVersion = getTestData(
          'itemPersonWithIdAndRelationshipsVersions',
          2
        )
        return setupModel({ config }).then(createdModel => {
          model = createdModel
          return model.create({ allowId: true, item: itemFirstVersion })
        })
      })

      it('Updates item and merging or replacing relationships', () => {
        return model
          .update({
            id: itemFirstVersion.id,
            item: itemSecondVersion,
          })
          .then(({ item: resFromUpdate }) => {
            // Relationships merged
            expect(resFromUpdate.relationships.children).toEqual(
              itemFirstVersion.relationships.children
            )
            expect(resFromUpdate.relationships.parent).toEqual(
              itemSecondVersion.relationships.parent
            )

            expect(resFromUpdate.attributes).toEqual(
              itemSecondVersion.attributes
            )
          })
          .then(() => {
            return model
              .update({
                id: itemFirstVersion.id,
                item: itemThirdVersion,
              })
              .then(({ item: resFromUpdate }) => {
                // Relationships replaced
                expect(resFromUpdate.relationships.children).toEqual(
                  itemThirdVersion.relationships.children
                )
                expect(resFromUpdate.relationships.parent).toEqual(
                  itemThirdVersion.relationships.parent
                )

                expect(resFromUpdate.attributes).toEqual(
                  itemThirdVersion.attributes
                )
              })
          })
          .then(() => {
            return model
              .getById({ id: itemFirstVersion.id })
              .then(({ item: resFromGet }) => {
                expect(resFromGet.attributes).toEqual(
                  itemThirdVersion.attributes
                )
                expect(resFromGet.id).toEqual(itemThirdVersion.id)
              })
          })
      })
    })

    if (modelType === 'sequelizeDocumentModel') {
      describe('diff', () => {
        let itemFirstVersion
        let itemSecondVersion
        let itemThirdVersion
        hook(beforeAll, () => {
          itemFirstVersion = getTestData('itemPersonWithIdVersions', 0)
          itemSecondVersion = getTestData('itemPersonWithIdVersions', 1)
          itemThirdVersion = getTestData('itemPersonWithIdVersions', 2)
          return setupModel({ config }).then(createdModel => {
            model = createdModel
            return model.create({ allowId: true, item: itemFirstVersion })
          })
        })

        it('Updates item and creates a diff', () => {
          return model
            .update({
              id: itemFirstVersion.id,
              item: itemSecondVersion,
            })
            .then(({ item: res }) => {
              expect(res.attributes).toEqual(itemSecondVersion.attributes)
              expect(res.diff).toEqual([
                {
                  kind: 'E',
                  lhs: 'Turing',
                  path: ['attributes', 'lastName'],
                  rhs: 'Lovelace',
                },
                {
                  kind: 'N',
                  path: ['attributes', 'changedLastnameTimes'],
                  rhs: 1,
                },
              ])
            })
        })
        it('Keeps previous diffs and appends new diff when updating again', () => {
          return model
            .update({ id: itemFirstVersion.id, item: itemThirdVersion })
            .then(({ item: res }) => {
              expect(res.diff).toEqual([
                {
                  kind: 'E',
                  lhs: 'Turing',
                  path: ['attributes', 'lastName'],
                  rhs: 'Lovelace',
                },
                {
                  kind: 'N',
                  path: ['attributes', 'changedLastnameTimes'],
                  rhs: 1,
                },
                {
                  kind: 'E',
                  lhs: 'Lovelace',
                  path: ['attributes', 'lastName'],
                  rhs: 'Musk',
                },
                {
                  kind: 'D',
                  lhs: 1,
                  path: ['attributes', 'changedLastnameTimes'],
                },
                { kind: 'N', path: ['attributes', 'changedLastname'], rhs: 2 },
              ])
            })
        })
      })
    }
  })
}
