export default function createIdSpecification({
  sectionName,
  fieldName,
  idMatchFilterFunctionName,
}) {
  const idFilter = (input = {}) => {
    const { fieldValue } = input

    if (fieldValue === undefined) {
      return null
    }

    return {
      filter: {
        filterFunction: idMatchFilterFunctionName,
        input: {
          value: fieldValue,
        },
      },
    }
  }

  return [
    {
      fieldName,
      matchFilter: idFilter,
      sectionName,
    },
  ]
}
