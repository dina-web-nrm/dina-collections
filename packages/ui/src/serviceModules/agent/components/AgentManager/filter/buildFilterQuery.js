export default function buildFilterQuery({ formValues = {} } = {}) {
  const and = []

  if (formValues.fullName) {
    and.push({
      filter: {
        filterFunction: 'fullNameSearch',
        input: {
          value: formValues.fullName,
        },
      },
    })
  }

  if (formValues.agentType) {
    and.push({
      filter: {
        filterFunction: 'matchAgentType',
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
    and,
  }
}
