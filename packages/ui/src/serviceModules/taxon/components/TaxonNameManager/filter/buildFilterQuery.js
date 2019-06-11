export default function buildFilterQuery({ formValues = {} } = {}) {
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
        filterFunction: 'rank',
        input: {
          value: formValues.rank,
        },
      },
    })
  }

  if (formValues.rubinNumber) {
    and.push({
      filter: {
        filterFunction: 'rubinNumber',
        input: {
          value: formValues.rubinNumber,
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
