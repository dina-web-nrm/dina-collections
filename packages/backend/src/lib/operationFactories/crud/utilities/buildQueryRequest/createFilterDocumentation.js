module.exports = function createFilterDocumentation({ filterSpecification }) {
  const filtersObject = filterSpecification.filters || {}

  const filterKeys = Object.keys(filtersObject)

  const filters = filterKeys.map(filterKey => {
    return ` ***${filterKey}*** <br/> ${
      filtersObject[filterKey].description
    } <br/>`
  })

  const filterDescription = !filters.length
    ? ''
    : `
**Available filter functions:**
***
<br/>

${filters.join(' <br/> ')}

  `
  return filterDescription
}
