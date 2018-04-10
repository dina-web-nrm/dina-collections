/* eslint-disable sort-keys */
export default {
  curatedListService: {
    resources: {
      featureTypes: {
        '1': {
          key: 'age-stage',
          group: 'age-stage',
          selectableValues: [
            {
              key: 'juvenile',
              name: {
                en: 'juvenile ',
                sv: 'juvenil',
              },
            },
          ],
          selectableMethods: [
            {
              key: 'known-age',
              name: {
                en: 'known age',
              },
            },
            {
              key: 'sectioned-teeth',
              name: {
                en: 'sectioned teeth',
              },
            },
            {
              key: 'other',
              name: {
                en: 'other',
              },
            },
          ],
          id: '1',
          type: 'featureType',
        },
      },
      distinguishedUnitTypes: {
        '2': {
          category: 'skeleton',
          id: '2',
          name: 'complete, mounted skeleton',
          type: 'distinguishedUnitType',
        },
      },
    },
  },
  localityService: {
    resources: {
      curatedLocalities: {
        '1': {
          name: 'africa',
          group: 'continent',
          id: '1',
          type: 'curatedLocality',
        },
        '12': {
          name: 'algeria',
          group: 'country',
          id: '12',
          type: 'curatedLocality',
        },
      },
    },
  },
  storageService: {
    resources: {
      physicalUnits: {
        '1': {
          id: '1',
          storageLocation: {
            id: '1',
            type: 'storageLocation',
          },
          type: 'physicalUnit',
        },
      },
      storageLocations: {
        '1': {
          id: '1',
          name: 'Bone room',
          parentId: '',
          type: 'storageLocation',
        },
      },
    },
  },
  taxonService: {
    resources: {
      taxa: {
        '2367': {
          id: '2367',
          scientificName: 'Sorex minutus',
        },
      },
    },
  },
}
