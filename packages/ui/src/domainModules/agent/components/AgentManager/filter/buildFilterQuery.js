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

  if (values.agentType) {
    and.push({
      filter: {
        filterFunction: 'matchAgentType',
        input: {
          value: values.agentType,
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
