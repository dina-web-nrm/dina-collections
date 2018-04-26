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
      preparationTypes: {
        '2': {
          category: 'skeleton',
          id: '2',
          name: 'complete, mounted skeleton',
          type: 'preparationType',
        },
      },
    },
  },
  crud: {
    keyObject: {
      place: {
        allItemsFetched: true,
      },
    },
    resources: {
      establishmentMeansType: {
        items: {
          '1': {
            name: { en: 'managed' },
            key: 'managed',
            id: '1',
            type: 'establishmentMeansType',
          },
        },
      },

      causeOfDeathType: {
        items: {
          '1': {
            name: { en: 'shot', sv: 'skjuten' },
            key: 'shot',
            id: '1',
            type: 'causeOfDeathType',
          },
        },
      },
      place: {
        items: {
          '1': {
            name: 'africa',
            group: 'continent',
            id: '1',
            type: 'place',
          },
          '12': {
            name: 'algeria',
            group: 'country',
            id: '12',
            type: 'place',
          },
        },
      },
      typeSpecimenType: {
        items: {
          '1': {
            id: '1',
            name: 'subtype',
            type: 'typeSpecimenType',
          },
        },
      },
    },
  },

  storageService: {
    resources: {
      physicalObjects: {
        '1': {
          id: '1',
          storageLocation: {
            id: '1',
            type: 'storageLocation',
          },
          type: 'physicalObject',
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
