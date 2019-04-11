export default function buildFilterQuery({ values }) {
  const and = [
    {
      filter: {
        filterFunction: 'taxonNameType',
        input: {
          value: 'scientific',
        },
      },
    },
  ]

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
        filterFunction: 'rank',
        input: {
          value: values.rank,
        },
      },
    })
  }

  if (values.rubinNumber) {
    and.push({
      filter: {
        filterFunction: 'rubinNumber',
        input: {
          value: values.rubinNumber,
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
