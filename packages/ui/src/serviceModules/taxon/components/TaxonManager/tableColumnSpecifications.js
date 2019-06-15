const tableColumnSpecifications = [
  {
    fieldPath: 'acceptedName',
    label: 'modules.taxon.fieldLabels.acceptedTaxonName.name',
    width: 350,
  },
  {
    fieldPath: 'acceptedNameRank',
    label: 'modules.taxon.fieldLabels.acceptedTaxonName.rank',
    width: 350,
  },

  {
    fieldPath: 'classAcceptedName',
    label: 'modules.taxon.fieldLabels.class',
    width: 250,
  },
  {
    fieldPath: 'orderAcceptedName',
    label: 'modules.taxon.fieldLabels.order',
    width: 250,
  },
  {
    fieldPath: 'familyAcceptedName',
    label: 'modules.taxon.fieldLabels.family',
    width: 250,
  },
  {
    fieldPath: 'genusAcceptedName',
    label: 'modules.taxon.fieldLabels.genus',
    width: 250,
  },
  {
    fieldPath: 'speciesAcceptedName',
    label: 'modules.taxon.fieldLabels.species',
    width: 250,
  },
  {
    fieldPath: 'subspeciesAcceptedName',
    label: 'modules.taxon.fieldLabels.subspecies',
    width: 250,
  },
  {
    buildText: ({ value: vernacularNames }) => {
      return vernacularNames.join(', ')
    },
    fieldPath: 'vernacularNames',
    label: 'modules.taxon.fieldLabels.vernacularNames.name',
    width: 350,
  },
  {
    buildText: ({ value: synonyms }) => {
      return synonyms.join(', ')
    },
    fieldPath: 'synonyms',
    label: 'modules.taxon.fieldLabels.synonyms.name',
    width: 350,
  },
]
export default tableColumnSpecifications
