const getTaxonomyInformation = ({ src, migrator }) => {
  const order = migrator.getValue({
    obj: src,
    path: 'objects.Order',
    strip: true,
  })

  const family = migrator.getValue({
    obj: src,
    path: 'objects.Family',
    strip: true,
  })

  const genus = migrator.getValue({
    obj: src,
    path: 'objects.Genus',
    strip: true,
  })

  const species = migrator.getValue({
    obj: src,
    path: 'objects.Scientific_Name',
    strip: true,
  })

  return {
    family,
    genus,
    order,
    species,
  }
}

module.exports = function getTaxonNameId({ getItemByTypeId, src, migrator }) {
  const { family, genus, order, species } = getTaxonomyInformation({
    migrator,
    src,
  })

  const key = [order, family, genus, species]
    .filter(rank => {
      return !!rank
    })
    .join('->')

  return getItemByTypeId({
    id: key,
    type: 'lookupTaxon',
  }).then(lookupTaxon => {
    if (!lookupTaxon) {
      return undefined
    }

    return lookupTaxon.attributes.acceptedTaxonNameId
  })
}
