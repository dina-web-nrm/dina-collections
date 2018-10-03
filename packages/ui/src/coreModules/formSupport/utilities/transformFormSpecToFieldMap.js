export default function transformFormSpecToFieldMap(sectionSpecs) {
  return sectionSpecs.reduce((formMap, section) => {
    const { name: sectionName, units } = section
    return {
      ...formMap,
      ...units.reduce((sectionMap, unit) => {
        const { name: unitName, parts } = unit
        return {
          ...sectionMap,
          ...parts.reduce((unitMap, part) => {
            const { name, ...rest } = part
            if (!name) {
              return unitMap
            }

            return {
              ...unitMap,
              [name]: {
                ...rest,
                name,
                section: sectionName,
                unit: unitName,
              },
            }
          }, {}),
        }
      }, {}),
    }
  }, {})
}
