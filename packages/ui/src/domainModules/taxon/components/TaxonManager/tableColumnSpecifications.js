const tableColumnSpecifications = [
  {
    fieldPath: 'acceptedTaxonName.name',
    label: 'modules.taxon.fieldLabels.taxon.acceptedTaxonName.name',
    width: 350,
  },
  {
    fieldPath: 'acceptedTaxonName.rank',
    label: 'modules.taxon.fieldLabels.taxon.acceptedTaxonName.rank',
    width: 350,
  },
  {
    buildText: ({ value: vernacularNames }) => {
      return vernacularNames
        .map(vernacularName => {
          return vernacularName.name
        })
        .join(', ')
    },
    fieldPath: 'vernacularNames',
    label: 'modules.taxon.fieldLabels.taxon.vernacularNames.name',
    width: 350,
  },
  {
    buildText: ({ value: synonyms }) => {
      return synonyms
        .map(synonym => {
          return synonym.name
        })
        .join(', ')
    },
    fieldPath: 'synonyms',
    label: 'modules.taxon.fieldLabels.taxon.synonyms.name',
    width: 350,
  },

  {
    fieldPath: 'parent.acceptedTaxonName.name',
    label: 'modules.taxon.fieldLabels.taxon.parent.acceptedTaxonName.name',
    width: 350,
  },
]
export default tableColumnSpecifications
