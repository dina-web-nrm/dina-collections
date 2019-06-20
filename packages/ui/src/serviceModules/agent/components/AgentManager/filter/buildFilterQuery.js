export default function buildFilterQuery({ formValues = {} } = {}) {
  const and = []

  if (formValues.fullName) {
    and.push({
      filter: {
        filterFunction: 'fullName',
        input: {
          value: formValues.fullName,
        },
      },
    })
  }

  if (formValues.abbreviation) {
    and.push({
      filter: {
        filterFunction: 'abbreviation',
        input: {
          value: formValues.abbreviation,
        },
      },
    })
  }

  if (formValues.agentType) {
    and.push({
      filter: {
        filterFunction: 'agentType',
        input: {
          value: formValues.agentType,
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
