/* eslint-disable no-param-reassign */

module.exports = function identifiers({ src, target, migrator }) {
  const catalogNumber = migrator.getValue({
    obj: src,
    path: 'catalogNumber',
  })

  if (catalogNumber) {
    migrator.setValue({
      obj: target,
      path: 'attributes.individual.identifiers.0',
      value: {
        identifierType: {
          id: '1',
        },
        value: `${catalogNumber}`,
      },
    })
  }
}
