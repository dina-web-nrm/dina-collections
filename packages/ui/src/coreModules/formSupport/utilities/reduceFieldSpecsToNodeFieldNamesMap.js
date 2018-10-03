export default function reduceFieldSpecsToNodeFieldNamesMap(
  fieldSpecs,
  { bySection, byUnit = true } = {}
) {
  return fieldSpecs.reduce((map, fieldSpec) => {
    const { name, relativeNames, section, unit } = fieldSpec

    if (!bySection && !byUnit) {
      throw new Error('either bySection or byUnit must be true')
    }

    const nodeName = bySection ? section : unit

    if (relativeNames) {
      const fullNames = relativeNames.map(relativeName => {
        return `${name}.${relativeName}`
      })

      const newMap = {
        ...map,
        [nodeName]: map[nodeName] ? map[nodeName].concat(fullNames) : fullNames,
      }

      return newMap
    }

    const newMap = {
      ...map,
      [nodeName]: map[nodeName] ? map[nodeName].concat([name]) : [name],
    }

    return newMap
  }, {})
}
