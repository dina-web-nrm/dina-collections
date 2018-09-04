export default function buildFilterQuery({ values = {} }) {
  const and = []

  if (values.fullName) {
    and.push({
      filter: {
        filterFunction: 'fullNameSearch',
        input: {
          value: values.fullName,
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
