/* eslint-disable sort-keys */
export default {
  collectionMammals: {
    activeFormSectionIndex: 0,
    showAllFormSections: true,
  },
  crud: {
    keyObject: {
      place: {
        allItemsFetched: true,
      },
    },
    resources: {
      featureType: {
        items: {
          '1': {
            attributes: {
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
            },
            id: '1',
            type: 'featureType',
          },
        },
      },
      preparationType: {
        items: {
          '2': {
            attributes: {
              category: 'skeleton',
              name: 'complete, mounted skeleton',
            },
            id: '2',
            type: 'preparationType',
          },
        },
      },
      establishmentMeansType: {
        items: {
          '1': {
            attributes: {
              name: { en: 'managed' },
              key: 'managed',
            },

            id: '1',
            type: 'establishmentMeansType',
          },
        },
      },

      causeOfDeathType: {
        items: {
          '1': {
            attributes: {
              name: { en: 'shot', sv: 'skjuten' },
              key: 'shot',
            },

            id: '1',
            type: 'causeOfDeathType',
          },
        },
      },
      normalizedAgent: {
        items: {
          '1': {
            attributes: { fullName: 'John Doe' },
            id: '1',
            type: 'normalizedAgent',
          },
        },
      },
      place: {
        items: {
          '1': {
            attributes: {
              name: 'africa',
              group: 'continent-ocean',
            },

            id: '1',
            type: 'place',
          },
          '12': {
            attributes: {
              name: 'algeria',
              group: 'country',
            },

            id: '12',
            type: 'place',
          },
        },
      },
      physicalObject: {
        items: {
          '1': {
            id: '1',
            relationships: {
              storageLocation: {
                data: {
                  id: '1',
                  type: 'storageLocation',
                },
              },
            },
            type: 'physicalObject',
          },
        },
      },
      storageLocation: {
        items: {
          '1': {
            id: '1',
            attributes: {
              name: 'Bone room',
            },
            relationships: {
              parent: {
                data: {
                  id: '',
                },
              },
            },

            type: 'storageLocation',
          },
        },
      },
      typeSpecimenType: {
        items: {
          '1': {
            attributes: {
              name: 'subtype',
            },
            id: '1',

            type: 'typeSpecimenType',
          },
        },
      },
      identifierType: {
        items: {
          '1': {
            attributes: {
              name: 'catalog number',
              key: 'catalogNumber',
            },
            id: '1',

            type: 'identifierType',
          },
          '2': {
            attributes: {
              name: 'SVA number',
              key: 'sva-number',
            },
            id: '2',

            type: 'identifierType',
          },
        },
      },
      taxa: {
        items: {
          '2367': {
            attributes: {
              scientificName: 'Sorex minutus',
            },
            id: '2367',
          },
        },
      },
    },
  },
}
