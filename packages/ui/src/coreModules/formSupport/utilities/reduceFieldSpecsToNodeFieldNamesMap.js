export default function reduceFieldSpecsToNodeFieldNamesMap(
  fieldSpecs,
  { bySection, byUnit = true, useBaseName = false } = {}
) {
  return fieldSpecs.reduce((map, fieldSpec) => {
    const { baseName, name, section, unit } = fieldSpec

    if (!bySection && !byUnit) {
      throw new Error('either bySection or byUnit must be true')
    }

    const nodeName = bySection ? section : unit

    if (baseName && useBaseName) {
      return {
        ...map,
        [nodeName]: map[nodeName]
          ? map[nodeName].concat([baseName])
          : [baseName],
      }
    }

    return {
      ...map,
      [nodeName]: map[nodeName] ? map[nodeName].concat([name]) : [name],
    }
  }, {})
}
