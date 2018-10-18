export default function buildFilterQuery({ values }) {
  const and = []

  if (values.name) {
    and.push({
      filter: {
        filterFunction: 'nameSearch',
        input: {
          value: values.name,
        },
      },
    })
  }

  if (values.rank) {
    and.push({
      filter: {
        filterFunction: 'nameRank',
        input: {
          value: values.rank,
        },
      },
    })
  }

  if (values.vernacularName) {
    and.push({
      filter: {
        filterFunction: 'vernacularNameSearch',
        input: {
          value: values.vernacularName,
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
