/* eslint-disable no-param-reassign */

const extractNotMigratedPaths = ({ basePath, obj }) => {
  let paths = []
  Object.keys(obj).forEach(key => {
    const subObject = obj[key]
    const path = basePath ? `${basePath}.${key}` : key
    if (typeof subObject === 'object') {
      const subObjectPaths = extractNotMigratedPaths({
        basePath: path,
        obj: subObject,
      })
      paths = [...paths, ...subObjectPaths]
    } else {
      paths.push(path)
    }
  })
  return paths
}

module.exports = function migrateReadOnly({ migrator, reporter, src, target }) {
  const ignorePaths = [
    'analysis.AccessionNo', // exist in multiple places
    'collection.AccessionNo',
    'objects.AccessionNo',
    'collection.SkeletonCollection',
    'collection.SkeletonCollection_related.ID',

    'collection.SkeletonStatus',
    'collection.SkeletonStatus_related.ID',

    'collection.SkinStatus',
    'collection.SkinStatus_related.ID',
    'collection.OtherMaterialCollection',

    'objects.LopId',
    'objects.FieldNo',
    'objects.FieldNo_related.FieldNo',

    'objects.WayOfDeath',
    'objects.WayOfDeath_related.ID',
    'objects.WayOfDeath_related.DödsorsakSW',
    'analysis.Condition_related.ID',
    'analysis.Condition_related.Kondition',
    'analysis.Condition',
    'analysis.TypeOfWeight',
    'analysis.TypeOfWeight_related.Viktslag',
    'analysis.TypeOfWeight_related.ID',
  ]

  const readOnlyPaths = [
    'analysis.Meas_Comments',
    'collection.SkeletonCollection_related.NRM_Location', // can this be ignored?
    'collection.SkeletonCollection_related.Type', // can this be ignored?
    'collection.SkeletonStatus_related.Skelett', // can this be ignored?
    'collection.SkinStatus_related.Skinn', // can this be ignored?
    'collection.Appearance_Comments',
    'collection.Old_Rubin_Bones',
    'objects.RubinID',
    'objects.FieldNo_related.Lat_NS',
    'objects.FieldNo_related.LatD',
    'objects.FieldNo_related.LatM',
    'objects.FieldNo_related.LatS',
    'objects.FieldNo_related.Long_EW',
    'objects.FieldNo_related.LongD',
    'objects.FieldNo_related.LongM',
    'objects.FieldNo_related.LongS',
    'objects.FieldNo_related.TillfID',
    'objects.FieldNo_related.RubinID',

    'objects.RubinNo', // This is already in storage?
    'objects.OldScientificName', // This is already in storage?
    'objects.CommonName',

    'objects.Field_Checks',
    'objects.RubinID',
    'objects.SwedishName',
    'objects.OldLocalName',
  ]

  /*
  Questions
  * OtherMaterialInCollection? How to map this?
  * Suitable_for_exhibition. Which Collection Item?
  * In general how to map stuff to curratorial assesment? Which collection item?
  * Mounting_wall ? 
  * Ethanol ?


  */

  const paths = extractNotMigratedPaths({
    obj: src,
  }).filter(path => {
    return !ignorePaths.includes(path)
  })

  const notHandledPaths = paths.filter(path => {
    return !readOnlyPaths.includes(path)
  })

  reporter.rebuildViewIncrementNotMigratedPaths({
    paths: notHandledPaths,
    src,
  })

  paths.forEach(path => {
    if (readOnlyPaths.includes(path)) {
      const value = migrator.getValue({
        obj: src,
        path,
      })
      migrator.setValue({
        obj: target,
        path: `attributes.readOnly.${path}`,
        value,
      })
    }
  })
}
