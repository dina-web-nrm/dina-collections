const {
  createTextSearch,
  createStringMatchFilter,
} = require('../../../../../../../../lib/data/filters/factories')

const {
  createStringAggregation,
  createTextPreviewAggregation,
} = require('../../../../../../../../lib/data/aggregations/factories')

const fieldPath = 'attributes.searchOnlyFields.remarksObject'
const key = 'searchRemarks'
const textSearchFilterName = 'searchRemarks'
const srcFieldAggregationName = 'aggregateRemarkSrcFields'
const matchRemarkTypeFilterName = 'matchRemarksSrcField'
const resource = 'remarkTags'
const textPreviewAggregationName = 'aggregateRemarksTextPreview'

const availableSrcFields = [
  'deathRemarks',
  'locationRemarks',
  'specimenRemarks',
]

const srcFieldSpecifications = availableSrcFields.map(fieldKey => {
  return {
    key: fieldKey,
    path: `${fieldPath}.${fieldKey}`,
  }
})

const createMapping = () => {
  return {
    elasticsearch: () => {
      return {
        properties: {
          deathRemarks: {
            type: 'text',
          },
          locationRemarks: {
            type: 'text',
          },
          specimenRemarks: {
            type: 'text',
          },
          srcFields: {
            fields: {
              raw: {
                ignore_above: 256,
                type: 'keyword',
              },
            },
            type: 'text',
          },
        },
      }
    },
    fieldPath,
  }
}

const transformation = ({ migrator, src, target }) => {
  const remarksObjects = {}
  const srcFields = []

  const specimenRemarks = migrator.getValue({
    obj: src,
    path: 'remarks',
  })

  if (specimenRemarks) {
    remarksObjects.specimenRemarks = specimenRemarks
    srcFields.push('specimenRemarks')
  }

  const deathInformation =
    migrator.getValue({
      obj: src,
      path: 'individual.deathInformation',
    }) || []

  deathInformation.forEach(({ remarks }) => {
    if (remarks) {
      remarksObjects.deathRemarks = remarks
      srcFields.push('deathRemarks')
    }
  })

  const collectingInformation =
    migrator.getValue({
      obj: src,
      path: 'individual.collectingInformation',
    }) || []

  collectingInformation.forEach(({ event }) => {
    const remarks = migrator.getValue({
      obj: event,
      path: 'locationInformation.remarks',
    })
    if (remarks) {
      remarksObjects.locationRemarks = remarks
      srcFields.push('locationRemarks')
    }
  })

  remarksObjects.srcFields = srcFields

  migrator.setValue({
    obj: target,
    path: fieldPath,
    value: remarksObjects,
  })

  return null
}
module.exports = {
  aggregations: {
    [srcFieldAggregationName]: createStringAggregation({
      fieldPath: `${fieldPath}.srcFields`,
      resource,
    }),
    [textPreviewAggregationName]: createTextPreviewAggregation({
      resource,
      srcFieldSpecifications,
    }),
  },
  fieldPath,
  filters: {
    [matchRemarkTypeFilterName]: createStringMatchFilter({
      fieldPath: `${fieldPath}.srcFields`,
    }),
    [textSearchFilterName]: createTextSearch({
      srcFieldSpecifications,
    }),
  },
  key,
  mapping: createMapping({
    fieldPath,
  }),
  selectable: true,
  transformation,
}
