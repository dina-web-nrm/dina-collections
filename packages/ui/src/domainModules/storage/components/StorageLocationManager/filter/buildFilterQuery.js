export default function buildFilterQuery({ excludeRootNode, values }) {
  const and = []

  if (excludeRootNode) {
    and.push({
      filter: {
        filterFunction: 'excludeRootNode',
        input: {
          value: true,
        },
      },
    })
  }

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
