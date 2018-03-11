import { PHYSICAL_UNIT } from 'domainModules/storageService/constants'

export default function({
  curatedLocalities,
  individualGroup,
  savedPhysicalUnits,
}) {
  const cleanedPhysicalUnits = savedPhysicalUnits.map(({ id }) => {
    return {
      id,
      type: PHYSICAL_UNIT,
    }
  })

  const individualGroupWithRelationships = {
    ...individualGroup,
    distinguishedUnits: individualGroup.distinguishedUnits.map(
      (distinguishedUnit, index) => {
        return {
          ...distinguishedUnit,
          physicalUnit: cleanedPhysicalUnits[index],
        }
      }
    ),
  }

  const body = {
    data: {
      attributes: {
        individualGroup: individualGroupWithRelationships,
      },
      relationships: {
        curatedLocalities: {
          data: curatedLocalities,
        },
        physicalUnits: {
          data: cleanedPhysicalUnits,
        },
      },
    },
  }

  return body
}
