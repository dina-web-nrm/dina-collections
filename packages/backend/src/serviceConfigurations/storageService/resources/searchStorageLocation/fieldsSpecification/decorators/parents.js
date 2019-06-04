const extractFetchParents = require('../../../../../../lib/data/transformations/utilities/extractFetchParents')
/* eslint-disable no-param-reassign */

const transformation = ({ locals, migrator, src }) => {
  const parents = extractFetchParents({
    item: src,
    order: 'desc',
  })

  migrator.setValue({
    obj: locals,
    path: 'parents',
    value: parents,
  })

  migrator.setValue({
    obj: locals,
    path: 'parentsIncludingCurrent',
    value: [src, ...parents],
  })

  return null
}

module.exports = {
  key: 'decorateParents',
  transformation,
}
