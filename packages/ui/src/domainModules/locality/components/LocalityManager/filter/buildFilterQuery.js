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

  if (values.group) {
    and.push({
      filter: {
        filterFunction: 'group',
        input: {
          value: values.group,
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
