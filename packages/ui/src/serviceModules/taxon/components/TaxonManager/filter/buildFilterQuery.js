export default function buildFilterQuery({ formValues = {} } = {}) {
  const and = []

  if (formValues.name) {
    and.push({
      filter: {
        filterFunction: 'nameSearch',
        input: {
          value: formValues.name,
        },
      },
    })
  }

  if (formValues.rank) {
    and.push({
      filter: {
        filterFunction: 'nameRank',
        input: {
          value: formValues.rank,
        },
      },
    })
  }

  if (formValues.vernacularName) {
    and.push({
      filter: {
        filterFunction: 'vernacularNameSearch',
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
    and,
  }
}
