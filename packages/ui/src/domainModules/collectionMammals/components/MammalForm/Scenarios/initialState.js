/* eslint-disable sort-keys */
export default {
  curatedListService: {
    resources: {
      featureObservationTypes: {
        '1': {
          key: 'age-stage',
          group: 'age-stage',
          selectableValues: [
            {
              key: 'adult',
              name: {
                en: 'adult',
                sv: 'adult',
              },
            },
            {
              key: 'adult?',
              name: {
                en: 'adult? ',
                sv: 'adult?',
              },
            },
            {
              key: 'subadult',
              name: {
                en: 'subadult ',
                sv: 'subadult',
              },
            },
            {
              key: 'subadult?',
              name: {
                en: 'subadult?',
                sv: 'subadult?',
              },
            },
            {
              key: 'juvenile',
              name: {
                en: 'juvenile ',
                sv: 'juvenil',
              },
            },
            {
              key: 'juvenile?',
              name: {
                en: 'juvenile?',
                sv: 'juvenil?',
              },
            },
            {
              key: 'immature',
              name: {
                en: 'immature ',
                sv: 'immatur',
              },
            },
            {
              key: 'embryo',
              name: {
                en: 'embryo ',
                sv: 'embryo',
              },
            },
            {
              key: 'fetus',
              name: {
                en: 'fetus',
                sv: 'featus',
              },
            },
            {
              key: 'unknown',
              name: {
                en: 'unknown',
                sv: 'okänd',
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
          type: 'featureObservationType',
        },
        '2': {
          key: 'age',
          group: 'age-and-stage',
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
          id: '2',
          type: 'featureObservationType',
        },
        '3': {
          key: 'condition',
          group: 'condition',
          selectableValues: [
            {
              key: 'fresh',
              name: {
                en: 'fresh',
                sv: 'färsk',
              },
            },
            {
              key: 'hairless',
              name: {
                en: 'hairless',
                sv: 'hår släpper',
              },
            },
            {
              key: 'slightly-cadaverous',
              name: {
                en: 'Slightly cadaverous',
                sv: 'lätt kadaverös',
              },
            },
            {
              key: 'cadaverous',
              name: {
                en: 'cadaverous',
                sv: 'kadaverös',
              },
            },
            {
              key: 'dried',
              name: {
                en: 'dried',
                sv: 'intorkad',
              },
            },
            {
              key: 'skeletal',
              name: {
                en: 'skeletal',
                sv: 'skeletterad',
              },
            },
            {
              key: 'unknown',
              name: {
                en: 'unknown',
                sv: 'okänd',
              },
            },
          ],
          id: '3',
          type: 'featureObservationType',
        },
        '4': {
          key: 'cranium',
          group: 'bone-count',
          id: '4',
          type: 'featureObservationType',
        },
        '5': {
          key: 'mandibula',
          group: 'bone-count',
          id: '5',
          type: 'featureObservationType',
        },
        '6': {
          key: 'vertebrae',
          group: 'bone-count',
          id: '6',
          type: 'featureObservationType',
        },
        '7': {
          key: 'costae',
          group: 'bone-count',
          id: '7',
          type: 'featureObservationType',
        },
        '8': {
          key: 'scapula',
          group: 'bone-count',
          id: '8',
          type: 'featureObservationType',
        },
        '9': {
          key: 'humerus',
          group: 'bone-count',
          id: '9',
          type: 'featureObservationType',
        },
        '10': {
          key: 'ulna',
          group: 'bone-count',
          id: '10',
          type: 'featureObservationType',
        },
        '11': {
          key: 'radius',
          group: 'bone-count',
          id: '11',
          type: 'featureObservationType',
        },
        '12': {
          key: 'manus',
          group: 'bone-count',
          id: '12',
          type: 'featureObservationType',
        },
        '13': {
          key: 'pelvis',
          group: 'bone-count',
          id: '13',
          type: 'featureObservationType',
        },
        '14': {
          key: 'femur',
          group: 'bone-count',
          id: '14',
          type: 'featureObservationType',
        },
        '15': {
          key: 'tibia',
          group: 'bone-count',
          id: '15',
          type: 'featureObservationType',
        },
        '16': {
          key: 'pedis',
          group: 'bone-count',
          id: '16',
          type: 'featureObservationType',
        },
        '17': {
          key: 'total-length',
          group: 'length',
          selectableUnits: [
            {
              key: 'mm',
              name: {
                en: 'mm',
                sv: 'mm',
              },
            },
            {
              key: 'cm',
              name: {
                en: 'cm',
                sv: 'cm',
              },
            },
            {
              key: 'm',
              name: {
                en: 'm',
                sv: 'm',
              },
            },
          ],
          id: '17',
          type: 'featureObservationType',
        },
        '18': {
          key: 'body-length',
          group: 'length',
          selectableUnits: [
            {
              key: 'mm',
              name: {
                en: 'mm',
                sv: 'mm',
              },
            },
            {
              key: 'cm',
              name: {
                en: 'cm',
                sv: 'cm',
              },
            },
            {
              key: 'm',
              name: {
                en: 'm',
                sv: 'm',
              },
            },
          ],
          id: '18',
          type: 'featureObservationType',
        },
        '19': {
          key: 'tail-anus-length',
          group: 'length',
          selectableUnits: [
            {
              key: 'mm',
              name: {
                en: 'mm',
                sv: 'mm',
              },
            },
            {
              key: 'cm',
              name: {
                en: 'cm',
                sv: 'cm',
              },
            },
            {
              key: 'm',
              name: {
                en: 'm',
                sv: 'm',
              },
            },
          ],
          id: '19',
          type: 'featureObservationType',
        },
        '20': {
          key: 'tail-pelvis-length',
          group: 'length',
          selectableUnits: [
            {
              key: 'mm',
              name: {
                en: 'mm',
                sv: 'mm',
              },
            },
            {
              key: 'cm',
              name: {
                en: 'cm',
                sv: 'cm',
              },
            },
            {
              key: 'm',
              name: {
                en: 'm',
                sv: 'm',
              },
            },
          ],
          id: '20',
          type: 'featureObservationType',
        },
        '21': {
          key: 'ear-length',
          group: 'length',
          selectableUnits: [
            {
              key: 'mm',
              name: {
                en: 'mm',
                sv: 'mm',
              },
            },
            {
              key: 'cm',
              name: {
                en: 'cm',
                sv: 'cm',
              },
            },
            {
              key: 'm',
              name: {
                en: 'm',
                sv: 'm',
              },
            },
          ],
          id: '21',
          type: 'featureObservationType',
        },
        '22': {
          key: 'hind-foot-length',
          group: 'length',
          selectableUnits: [
            {
              key: 'mm',
              name: {
                en: 'mm',
                sv: 'mm',
              },
            },
            {
              key: 'cm',
              name: {
                en: 'cm',
                sv: 'cm',
              },
            },
            {
              key: 'm',
              name: {
                en: 'm',
                sv: 'm',
              },
            },
          ],
          id: '22',
          type: 'featureObservationType',
        },
        '23': {
          key: 'sex',
          group: 'sex',
          selectableValues: [
            {
              key: 'female',
              name: {
                en: 'female',
                sv: 'hona',
              },
            },
            {
              key: 'female?',
              name: {
                en: 'female?',
                sv: 'hona?',
              },
            },
            {
              key: 'male',
              name: {
                en: 'male',
                sv: 'hane',
              },
            },
            {
              key: 'male?',
              name: {
                en: 'male?',
                sv: 'hane?',
              },
            },
            {
              key: 'hermaphrodite',
              name: {
                en: 'hermaphrodite',
                sv: 'hermafrodit',
              },
            },
            {
              key: 'indeterminate',
              name: {
                en: 'indeterminate',
                sv: 'obestämd',
              },
            },
            {
              key: 'castrated',
              name: {
                en: 'castrated',
                sv: 'kastrerad',
              },
            },
            {
              key: 'transitional',
              name: {
                en: 'transitional',
                sv: 'transitional',
              },
            },
            {
              key: 'unknown',
              name: {
                en: 'unknown',
                sv: 'okänd',
              },
            },
          ],
          id: '23',
          type: 'featureObservationType',
        },
        '24': {
          key: 'complete-body-weight',
          group: 'weight',
          selectableUnits: [
            {
              key: 'kg',
              name: {
                en: 'kg',
                sv: 'kg',
              },
            },
            {
              key: 'g',
              name: {
                en: 'g',
                sv: 'g',
              },
            },
          ],
          id: '24',
          type: 'featureObservationType',
        },
        '25': {
          key: 'skinned-weight',
          group: 'weight',
          selectableUnits: [
            {
              key: 'kg',
              name: {
                en: 'kg',
                sv: 'kg',
              },
            },
            {
              key: 'g',
              name: {
                en: 'g',
                sv: 'g',
              },
            },
          ],
          id: '25',
          type: 'featureObservationType',
        },
        '26': {
          key: 'gutted-weight',
          group: 'weight',
          selectableUnits: [
            {
              key: 'kg',
              name: {
                en: 'kg',
                sv: 'kg',
              },
            },
            {
              key: 'g',
              name: {
                en: 'g',
                sv: 'g',
              },
            },
          ],
          id: '26',
          type: 'featureObservationType',
        },
        '27': {
          key: 'slaughtered-weight',
          group: 'weight',
          selectableUnits: [
            {
              key: 'kg',
              name: {
                en: 'kg',
                sv: 'kg',
              },
            },
            {
              key: 'g',
              name: {
                en: 'g',
                sv: 'g',
              },
            },
          ],
          id: '27',
          type: 'featureObservationType',
        },
        '28': {
          key: 'unknown-weight-type',
          group: 'weight',
          selectableUnits: [
            {
              key: 'kg',
              name: {
                en: 'kg',
                sv: 'kg',
              },
            },
            {
              key: 'g',
              name: {
                en: 'g',
                sv: 'g',
              },
            },
          ],
          id: '28',
          type: 'featureObservationType',
        },
      },
    },
  },
}
