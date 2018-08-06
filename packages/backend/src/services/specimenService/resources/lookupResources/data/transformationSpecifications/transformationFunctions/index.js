const fetchParents = require('../../../../../../../lib/data/transformations/utilities/fetchParents')
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

exports.place = ({ getItemByTypeId, src, target }) => {
  const { id: srcId, attributes, relationships } = src
  return fetchParents({
    getItemByTypeId,
    ignoreParentIds: ['1'],
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
