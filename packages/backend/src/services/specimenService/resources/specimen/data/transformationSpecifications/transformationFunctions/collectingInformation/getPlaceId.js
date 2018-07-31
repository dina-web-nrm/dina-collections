const getPlaceInformation = ({ src, migrator }) => {
  const continent = migrator.getValue({
    obj: src,
    path: 'objects.FieldNo_related.Continent_Ocean',
  })

  const nation = migrator.getValue({
    obj: src,
    path: 'objects.FieldNo_related.Nation',
  })

  const province = migrator.getValue({
    obj: src,
    path: 'objects.FieldNo_related.Province',
  })

  return {
    continent,
    nation,
    province,
  }
}

module.exports = function getPlaceId({ getItemByTypeId, src, migrator }) {
  const { continent, nation, province } = getPlaceInformation({
    migrator,
    src,
  })

  const key = [continent, nation, province]
    .filter(group => {
      return !!group
    })
    .join('->')

  return getItemByTypeId({
    id: key,
    type: 'lookupPlace',
  }).then(place => {
    if (!place) {
      return undefined
    }

    return place.attributes.srcId
  })
}
