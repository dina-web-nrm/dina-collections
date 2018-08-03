/* eslint-disable no-param-reassign */

const causeOfDeathTypeValueMap = {
  'dead in captivity': 'dead-in-captivity',
  'found dead': 'found-dead',
  'hunt, shot': 'hunt-shot',
  'hunt, trap': 'hunt-trap',
  'put to death': 'put-to-death',
}

const getCauseOfDeathTypeIdByKey = ({ wayOfDeath, causeOfDeathTypes }) => {
  if (!wayOfDeath) {
    return null
  }
  const lowerCaseWayOfDeath = wayOfDeath.toLowerCase()
  const key =
    causeOfDeathTypeValueMap[lowerCaseWayOfDeath] || lowerCaseWayOfDeath
  const matchingCauseOfDeathTypes = causeOfDeathTypes.find(causeOfDeathType => {
    return causeOfDeathType.attributes.key === key
  })

  if (!matchingCauseOfDeathTypes) {
    return null
  }

  return matchingCauseOfDeathTypes.id
}

module.exports = function migrateDeathInformation({
  migrator,
  reporter,
  serviceInteractor,
  src,
  target,
}) {
  return serviceInteractor
    .getMany({
      request: {
        queryParams: { limit: 100 },
      },
      resource: 'causeOfDeathType',
    })
    .then(({ data: causeOfDeathTypes }) => {
      let deathInformation

      const wayOfDeath = migrator.getValue({
        obj: src,
        path: 'objects.WayOfDeath_related.DödsorsakEN',
        strip: true,
      })

      const deathRemark = migrator.getValue({
        obj: src,
        path: 'objects.DeathRemark',
        strip: true,
      })

      let causeOfDeathTypeId
      if (wayOfDeath) {
        causeOfDeathTypeId = getCauseOfDeathTypeIdByKey({
          causeOfDeathTypes,
          wayOfDeath,
        })
        if (causeOfDeathTypeId) {
          reporter.rebuildViewLookupHit({
            id: wayOfDeath,
            resource: 'causeOfDeathType',
          })
        } else {
          reporter.rebuildViewLookupMiss({
            id: wayOfDeath,
            resource: 'causeOfDeathType',
          })
        }
      }

      if (causeOfDeathTypeId || deathRemark) {
        deathInformation = {
          causeOfDeathType: !causeOfDeathTypeId
            ? undefined
            : {
                id: causeOfDeathTypeId,
              },
          remarks: deathRemark,
        }
      }

      if (deathInformation) {
        migrator.setValue({
          obj: target,
          path: 'attributes.individual.deathInformation.0',
          value: deathInformation,
        })
      }
    })
}
