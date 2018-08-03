/* eslint-disable no-param-reassign */

const getIdentifierTypeIdByKey = ({ key, identifierTypes }) => {
  const matchingIdentifierType = identifierTypes.find(identifierType => {
    return identifierType.attributes.key === key
  })

  if (!matchingIdentifierType) {
    return null
  }

  return matchingIdentifierType.id
}

module.exports = function migrateIdentifiers({
  migrator,
  reporter,
  serviceInteractor,
  src,
  target,
}) {
  return serviceInteractor
    .getMany({
      request: {
        queryParams: { limit: 100 },
      },
      resource: 'identifierType',
    })
    .then(({ data: identifierTypes }) => {
      const identifiers = []

      // catalog number
      const catalogNumber = migrator.getValue({
        obj: src,
        path: 'catalogNumber',
        strip: true,
      })

      if (catalogNumber) {
        const id = getIdentifierTypeIdByKey({
          identifierTypes,
          key: 'catalog-number',
        })

        if (!id) {
          reporter.increment({
            path: `dependencies.identifierTypes.catalogNumber.missing`,
          })
        } else {
          reporter.increment({
            path: `dependencies.identifierTypes.catalogNumber.nHits`,
          })

          identifiers.push({
            identifierType: {
              id,
            },
            value: `${catalogNumber}`,
          })
        }
      }

      // old skeleton number
      const oldSkeletonNumber = migrator.getValue({
        obj: src,
        path: 'collection.OldSkeletonNo',
        strip: true,
      })

      if (oldSkeletonNumber) {
        const id = getIdentifierTypeIdByKey({
          identifierTypes,
          key: 'old-skeleton-nr',
        })

        if (!id) {
          reporter.increment({
            path: `dependencies.identifierTypes.oldSkeletonNumber.missing`,
          })
        } else {
          reporter.increment({
            path: `dependencies.identifierTypes.oldSkeletonNumber.nHits`,
          })

          identifiers.push({
            identifierType: {
              id,
            },
            value: `${oldSkeletonNumber}`,
          })
        }
      }

      // old skeleton number
      const oldSkinNumber = migrator.getValue({
        obj: src,
        path: 'collection.OldSkinNo',
        strip: true,
      })

      if (oldSkinNumber) {
        const id = getIdentifierTypeIdByKey({
          identifierTypes,
          key: 'old-skin-nr',
        })

        if (!id) {
          reporter.increment({
            path: `dependencies.identifierTypes.oldSkinNumber.missing`,
          })
        } else {
          reporter.increment({
            path: `dependencies.identifierTypes.oldSkinNumber.nHits`,
          })

          identifiers.push({
            identifierType: {
              id,
            },
            value: `${oldSkinNumber}`,
          })
        }
      }

      migrator.setValue({
        obj: target,
        path: 'attributes.individual.identifiers',
        value: identifiers,
      })
    })
}
