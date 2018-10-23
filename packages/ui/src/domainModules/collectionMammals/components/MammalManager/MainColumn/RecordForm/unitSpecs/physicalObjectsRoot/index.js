const model = 'specimen'
const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h2',
      textKey: 'headers.physicalObjects',
    },
  },
  {
    componentName: 'Remarks',
    componentProps: {
      emptyStateTextKey: 'remarks.emptyState.collectionItems',
      model,
    },
    name: 'collectionItemsRemarks',
    wrapInField: true,
  },
]

export default {
  name: 'physicalObjectsRoot',
  parts,
}
