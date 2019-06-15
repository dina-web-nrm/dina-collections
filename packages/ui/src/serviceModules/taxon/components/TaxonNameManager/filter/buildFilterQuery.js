export default function buildFilterQuery({ formValues = {} } = {}) {
  const and = [
    {
      filter: {
        filterFunction: 'searchTaxonNameType',
        input: {
          value: 'scientific',
        },
      },
    },
  ]

  if (formValues.name) {
    and.push({
      filter: {
        filterFunction: 'searchName',
        input: {
          value: formValues.name,
        },
      },
    })
  }

  if (formValues.rank) {
    and.push({
      filter: {
        filterFunction: 'searchRank',
        input: {
          value: formValues.rank,
        },
      },
    })
  }

  if (formValues.rubinNumber) {
    and.push({
      filter: {
        filterFunction: 'searchRubinNumber',
        input: {
          value: formValues.rubinNumber,
        },
      },
    })
  }

  if (!and.length) {
    return {}
  }

  return {
    query: { and },
  }
}
