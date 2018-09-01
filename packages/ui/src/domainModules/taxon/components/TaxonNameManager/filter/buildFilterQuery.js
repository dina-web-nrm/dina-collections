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

  if (!and.length) {
    return {}
  }

  return {
    and,
  }
}
