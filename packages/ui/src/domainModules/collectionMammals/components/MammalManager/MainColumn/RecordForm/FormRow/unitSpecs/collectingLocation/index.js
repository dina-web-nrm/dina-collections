const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h3',
      textKey: 'headers.collecintLocality',
    },
  },
  {
    componentName: 'TextArea',
    componentProps: {
      columnProps: { width: 11 },
      rows: 2,
      type: 'text',
    },
    name: 'locationInformation.localityV',
    wrapInField: true,
  },
  {
    componentName: 'IconButton',
    componentProps: {
      columnProps: { float: 'left', width: 5 },
      icon: 'marker',
      style: { float: 'left' },
      textKey: 'other.addPosition',
    },
    initiallyShown: true,
  },
  {
    componentName: 'TextArea',
    componentProps: {
      columnProps: { width: 13 },
      rows: 2,
      style: { width: '83.2%' },
      type: 'text',
    },
    name: 'locationInformation.localityI',
    wrapInField: true,
  },
  {
    componentName: 'Input',
    componentProps: {
      columnProps: { width: 4 },
      fluid: true,
      name: 'locationInformation.rt90',
      type: 'text',
    },
    wrapInField: true,
  },
]

export default {
  name: 'collectingLocation',
  parts,
}
