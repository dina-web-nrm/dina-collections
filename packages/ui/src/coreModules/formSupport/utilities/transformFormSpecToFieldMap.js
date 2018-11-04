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
            const { name, relativeNames, ...rest } = part

            if (!name) {
              return unitMap
            }

            if (relativeNames) {
              return {
                ...unitMap,
                ...relativeNames.reduce((subFields, relativeName) => {
                  const fullName = `${name}.*.${relativeName}`
                  return {
                    ...subFields,
                    [fullName]: {
                      ...rest,
                      baseName: name,
                      name: fullName,
                      section: sectionName,
                      unit: unitName,
                    },
                  }
                }, {}),
              }
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
