const tableColumnSpecifications = [
  {
    fieldPath: 'name',
    label: 'modules.locality.fieldLabels.place.name',
    width: 250,
  },
  {
    fieldPath: 'group',
    label: 'modules.locality.fieldLabels.place.group',
    width: 150,
  },
  {
    fieldPath: 'parent.name',
    label: 'modules.locality.fieldLabels.place.parent',
    width: 150,
  },
  {
    fieldPath: 'verticalPosition.minimumElevationInMeters',
    label:
      'modules.locality.fieldLabels.verticalPosition.minimumElevationInMeters',
    width: 150,
  },
  {
    fieldPath: 'verticalPosition.maximumElevationInMeters',
    label:
      'modules.locality.fieldLabels.verticalPosition.maximumElevationInMeters',
    width: 150,
  },
  {
    fieldPath: 'verticalPosition.minimumDepthInMeters',
    label: 'modules.locality.fieldLabels.verticalPosition.minimumDepthInMeters',
    width: 150,
  },
  {
    fieldPath: 'verticalPosition.maximumDepthInMeters',
    label: 'modules.locality.fieldLabels.verticalPosition.maximumDepthInMeters',
    width: 150,
  },

  {
    fieldPath: 'centralPosition.latitude',
    label: 'modules.locality.fieldLabels.centralPosition.latitude',
    width: 150,
  },

  {
    fieldPath: 'centralPosition.longitude',
    label: 'modules.locality.fieldLabels.centralPosition.longitude',
    width: 150,
  },

  {
    fieldPath: 'centralPosition.uncertaintyInMeters',
    label: 'modules.locality.fieldLabels.centralPosition.uncertaintyInMeters',
    width: 150,
  },
]

export default tableColumnSpecifications
