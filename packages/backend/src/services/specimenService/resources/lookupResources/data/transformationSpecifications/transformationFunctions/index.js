/* eslint-disable no-param-reassign */

exports.preparationType = ({ src, target }) => {
  const { id: srcId, attributes: { name } = {} } = src

  target.id = name
  target.attributes = { srcId, ...src.attributes }
}

exports.storageLocation = ({ src, target }) => {
  const { id: srcId, attributes: { name } = {} } = src

  target.id = name
  target.attributes = { srcId, ...src.attributes }
}

// could be moved to central place
const fetchParents = ({ parents = [], item, getItemByTypeId, resource }) => {
  const parentId =
    (item &&
      item.relationships &&
      item.relationships.parent &&
      item.relationships.parent.data &&
      item.relationships.parent.data.id) ||
    undefined
  if (parentId === undefined || parentId === '1') {
    return Promise.resolve(parents)
  }

  return getItemByTypeId({
    id: parentId,
    queryParams: { relationships: ['parent'] },
    type: resource,
  }).then(parent => {
    if (!parent) {
      throw new Error(
        `Non existing parent with type: ${resource} and id: ${parentId}`
      )
    }

    parents.unshift(parent)
    return fetchParents({ getItemByTypeId, item: parent, parents, resource })
  })
}

exports.place = ({ getItemByTypeId, src, target }) => {
  const { id: srcId, attributes, relationships } = src
  return fetchParents({
    getItemByTypeId,
    item: src,
    resource: 'place',
  }).then(parents => {
    const id = [
      ...parents.map(parent => {
        return parent.attributes.name
      }),
      attributes.name,
    ].join('->')
    target.relationships = relationships
    target.id = id
    target.attributes = { srcId, ...attributes }
  })
}

exports.featureType = ({ src, target }) => {
  const { id: srcId, attributes, relationships } = src
  const id = attributes.key
  target.relationships = relationships
  target.id = id
  target.attributes = { srcId, ...attributes }
}

exports.agent = ({ src, target }) => {
  const { id: srcId, attributes } = src
  const id = attributes.fullName
  if (id) {
    target.id = id
    target.attributes = { srcId, ...attributes }
  }
}
