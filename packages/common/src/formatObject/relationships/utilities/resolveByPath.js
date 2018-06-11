const objectPath = require('object-path')
const { Dependor } = require('../../../Dependor')
const walkObject = require('../../utilities/walkObject')

const dep = new Dependor(
  {
    walkObject,
  },
  'formatObject:relationships:utilities:resolveByPath:index'
)

const resolveByPath = ({
  formattedRelationshipItems,
  item: rootItem,
  path,
}) => {
  const arrayPath = Array.isArray(path) ? path : [path]

  arrayPath.forEach(pathItem => {
    const segments = pathItem.split('.*.').filter(segment => !!segment)

    dep.walkObject({
      func: pth => {
        const { id, lid } = objectPath.get(rootItem, pth) || {}

        if (id || lid) {
          const itemToInsert = formattedRelationshipItems.find(
            candidateItem => {
              return (
                (id !== undefined && id === candidateItem.id) ||
                (lid !== undefined && lid === candidateItem.lid)
              )
            }
          )

          if (itemToInsert) {
            objectPath.set(rootItem, pth, itemToInsert)
          }
        }
      },
      obj: rootItem,
      segments,
    })
  })

  return rootItem
}

module.exports = {
  dep,
  resolveByPath,
}
