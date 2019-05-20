const extractFetchParents = require('../../../../../../lib/data/transformations/utilities/extractFetchParents')
/* eslint-disable no-param-reassign */

const transformation = ({ locals, migrator, src }) => {
  const parents = extractFetchParents({
    item: { parent: src },
    order: 'desc',
  })

  migrator.setValue({
    obj: locals,
    path: 'parents',
    value: parents,
  })

  return null
}

module.exports = {
  key: 'decorateParents',
  transformation,
}
