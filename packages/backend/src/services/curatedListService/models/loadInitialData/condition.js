const selectableValues = [
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
]

module.exports = [
  {
    group: 'condition',
    key: 'condition',
    selectableValues,
  },
]
