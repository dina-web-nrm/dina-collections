export default function buildFilterQuery({ formValues = {} } = {}) {
  const and = []

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

  if (formValues.group) {
    and.push({
      filter: {
        filterFunction: 'searchLevel',
        input: {
          value: formValues.group,
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
