module.exports = function createCollectingInformation({ lookup, migrator }) {
  // collectorsText
  migrator.migrateValue({
    fromPath: 'src.objects.Comments',
    toPath: 'target.individual.collectingInformation.0.collectorsText',
  })

  /* event */
  // collectingDate
  const date = [
    migrator.getValue({ path: 'src.objects.Coll_Year' }),
    migrator.getValue({ path: 'src.objects.Coll_Month' }),
    migrator.getValue({ path: 'src.objects.Coll_Day' }),
  ].join('-')

  migrator.setValue({
    path: 'target.individual.collectingInformation.0.event.startDate',
    value: date,
  })

  /* event.locationInformation */
  // localityRemarks
  migrator.migrateValue({
    fromPath: 'src.objects.FieldNo_related.LocationRemarks',
    toPath:
      'target.individual.collectingInformation.0.event.locationInformation.remarks',
  })

  // localityT
  migrator.migrateValue({
    fromPath: 'src.objects.StatedLocality',
    toPath:
      'target.individual.collectingInformation.0.event.locationInformation.localityT',
  })

  // localityN
  migrator.migrateValue({
    fromPath: 'src.objects.FieldNo_related.Locality',
    toPath:
      'target.individual.collectingInformation.0.event.locationInformation.localityN',
  })

  /* event.locationInformation.position */
  // lat long
  migrator.migrateValue({
    format: 'string',
    fromPath: 'src.objects.FieldNo_related.Lat_DD',
    toPath:
      'target.individual.collectingInformation.0.event.locationInformation.position.latitude',
  })

  migrator.migrateValue({
    format: 'string',
    fromPath: 'src.objects.FieldNo_related.Long_DD',
    toPath:
      'target.individual.collectingInformation.0.event.locationInformation.position.longitude',
  })

  /* event.locationInformation.place */
  migrator.setValue({
    path:
      'target.individual.collectingInformation.0.event.locationInformation.places.0.id',
    value: lookup.getPlace({
      srcParameter: 'FieldNo_related',
      value: migrator.getValue({
        path: 'src.objects.FieldNo_related',
        strip: true,
      }),
    }),
  })
}
