import React from 'react'

const findParentWithSpecificRank = (item, rank) => {
  if (!item) {
    return null
  }

  if (item && item.acceptedTaxonName && item.acceptedTaxonName.rank === rank) {
    return item
  }

  if (!(item && item.parent)) {
    return null
  }

  return findParentWithSpecificRank(item.parent, rank)
}

const tableColumnSpecifications = [
  {
    fieldPath: 'acceptedTaxonName.name',
    label: 'modules.taxon.fieldLabels.acceptedTaxonName.name',
    width: 350,
  },
  {
    fieldPath: 'acceptedTaxonName.rank',
    label: 'modules.taxon.fieldLabels.acceptedTaxonName.rank',
    width: 350,
  },

  {
    buildText: ({ value }) => {
      const parent = findParentWithSpecificRank(value, 'class')
      if (!parent) {
        return ''
      }

      const { acceptedTaxonName } = parent
      if (!acceptedTaxonName) {
        return ''
      }

      if (parent.deactivatedAt) {
        return (
          <span style={{ color: 'red' }}>{`${
            acceptedTaxonName.name
          } (removed)`}</span>
        )
      }

      return acceptedTaxonName.name
    },
    fieldPath: '',
    label: 'modules.taxon.fieldLabels.class',
    width: 250,
  },
  {
    buildText: ({ value }) => {
      const parent = findParentWithSpecificRank(value, 'order')
      if (!parent) {
        return ''
      }

      const { acceptedTaxonName } = parent
      if (!acceptedTaxonName) {
        return ''
      }

      if (parent.deactivatedAt) {
        return (
          <span style={{ color: 'red' }}>{`${
            acceptedTaxonName.name
          } (removed)`}</span>
        )
      }

      return acceptedTaxonName.name
    },
    fieldPath: '',
    label: 'modules.taxon.fieldLabels.order',
    width: 250,
  },
  {
    buildText: ({ value }) => {
      const parent = findParentWithSpecificRank(value, 'family')
      if (!parent) {
        return ''
      }

      const { acceptedTaxonName } = parent
      if (!acceptedTaxonName) {
        return ''
      }

      if (parent.deactivatedAt) {
        return (
          <span style={{ color: 'red' }}>{`${
            acceptedTaxonName.name
          } (removed)`}</span>
        )
      }

      return acceptedTaxonName.name
    },
    fieldPath: '',
    label: 'modules.taxon.fieldLabels.family',
    width: 250,
  },
  {
    buildText: ({ value }) => {
      const parent = findParentWithSpecificRank(value, 'genus')
      if (!parent) {
        return ''
      }

      const { acceptedTaxonName } = parent
      if (!acceptedTaxonName) {
        return ''
      }

      if (parent.deactivatedAt) {
        return (
          <span style={{ color: 'red' }}>{`${
            acceptedTaxonName.name
          } (removed)`}</span>
        )
      }

      return acceptedTaxonName.name
    },
    fieldPath: '',
    label: 'modules.taxon.fieldLabels.genus',
    width: 250,
  },
  {
    buildText: ({ value }) => {
      const parent = findParentWithSpecificRank(value, 'species')
      if (!parent) {
        return ''
      }

      const { acceptedTaxonName } = parent
      if (!acceptedTaxonName) {
        return ''
      }

      if (parent.deactivatedAt) {
        return (
          <span style={{ color: 'red' }}>{`${
            acceptedTaxonName.name
          } (removed)`}</span>
        )
      }

      return acceptedTaxonName.name
    },
    fieldPath: '',
    label: 'modules.taxon.fieldLabels.species',
    width: 250,
  },
  {
    buildText: ({ value }) => {
      const parent = findParentWithSpecificRank(value, 'subspecies')
      if (!parent) {
        return ''
      }

      const { acceptedTaxonName } = parent
      if (!acceptedTaxonName) {
        return ''
      }

      if (parent.deactivatedAt) {
        return (
          <span style={{ color: 'red' }}>{`${
            acceptedTaxonName.name
          } (removed)`}</span>
        )
      }

      return acceptedTaxonName.name
    },
    fieldPath: '',
    label: 'modules.taxon.fieldLabels.subspecies',
    width: 250,
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
    label: 'modules.taxon.fieldLabels.vernacularNames.name',
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
    label: 'modules.taxon.fieldLabels.synonyms.name',
    width: 350,
  },
]
export default tableColumnSpecifications
