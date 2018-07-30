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

exports.place = ({ src, target }) => {
  const { id: srcId, attributes: { name } = {}, relationships } = src

  target.relationships = relationships
  target.id = name
  target.attributes = { srcId, ...src.attributes }
}
