export default function buildFilterQuery({ formValues = {} } = {}) {
  const and = []

  if (formValues.name) {
    and.push({
      filter: {
        filterFunction: 'searchAcceptedName',
        input: {
          value: formValues.name,
        },
      },
    })
  }

  if (formValues.rank) {
    and.push({
      filter: {
        filterFunction: 'searchAcceptedNameRank',
        input: {
          value: formValues.rank,
        },
      },
    })
  }

  if (formValues.vernacularName) {
    and.push({
      filter: {
        filterFunction: 'searchVernacularNames',
        input: {
          value: formValues.vernacularName,
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
