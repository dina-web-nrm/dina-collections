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

  if (formValues.group) {
    and.push({
      filter: {
        filterFunction: 'group',
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
    and,
  }
}
