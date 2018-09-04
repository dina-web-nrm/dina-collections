module.exports = function extractFilters({
  format = 'object',
  fieldsSpecification,
}) {
  const { fields } = fieldsSpecification
  const extractedFilters = {}
  fields.forEach(field => {
    const { filters } = field
    if (filters) {
      Object.keys(filters).forEach(key => {
        const filter = filters[key]
        extractedFilters[key] = { ...filter, key }
      })
    }
  })

  if (format === 'object') {
    return extractedFilters
  }

  return Object.keys(extractedFilters).map(filter => {
    return filter
  })
}
