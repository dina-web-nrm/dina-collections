const {
  createTextSearch,
  createStringMatchFilter,
} = require('../../../../../../../lib/data/filters/factories')

const {
  createStringAggregation,
  createTextPreviewAggregation,
} = require('../../../../../../../lib/data/aggregations/factories')

const fieldPath = 'attributes.searchOnlyFields.remarksObject'
const key = 'searchRemarks'
const textSearchFilterName = 'searchRemarks'
const srcFieldAggregationName = 'aggregateRemarkSrcFields'
const matchRemarkTypeFilterName = 'matchRemarksSrcField'
const resource = 'remarkTags'
const textPreviewAggregationName = 'aggregateRemarksTextPreview'

const availableSrcFields = [
  'acquisitionRemarks',
  'collectingDateRemarks',
  'collectingInformationRemarks',
  'curatorialAssessmentRemarks',
  'deathRemarks',
  'determinationRemarks',
  'originRemarks',
  'physicalObjectsRemarks',
  'aSinglePhysicalObjectRemarks',
  'specimenRemarks',
  'taxonomyRemarks',
]

const srcFieldSpecifications = availableSrcFields.map(fieldKey => {
  return {
    key: fieldKey,
    path: `${fieldPath}.${fieldKey}`,
  }
})

const elasticsearchFieldProperties = availableSrcFields.reduce(
  (properties, fieldKey) => {
    return {
      ...properties,
      [fieldKey]: {
        type: 'text',
      },
    }
  },
  {}
)

const createMapping = () => {
  return {
    elasticsearch: () => {
      return {
        properties: {
          ...elasticsearchFieldProperties,
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
  const remarksMap = availableSrcFields.reduce((map, remarksKey) => {
    map[remarksKey] = [] // eslint-disable-line no-param-reassign
    return map
  }, {})

  const srcFields = []

  const registerRemarksIfNotEmpty = (remarksKey, value) => {
    if (!value) {
      return
    }

    remarksMap[remarksKey].push(value)
    srcFields.push(remarksKey)
  }

  const acquisitionRemarks = migrator.getValue({
    obj: src,
    path: 'individual.acquisition.remarks',
  })
  registerRemarksIfNotEmpty('acquisitionRemarks', acquisitionRemarks)

  const collectingInformation =
    migrator.getValue({
      obj: src,
      path: 'individual.collectingInformation',
    }) || []

  collectingInformation.forEach(
    ({ event, remarks: collectingInformationRemarks }) => {
      if (event) {
        const collectingDateRemarks = migrator.getValue({
          obj: event,
          path: 'dateRange.remarks',
        })

        registerRemarksIfNotEmpty(
          'collectingDateRemarks',
          collectingDateRemarks
        )
      }

      registerRemarksIfNotEmpty(
        'collectingInformationRemarks',
        collectingInformationRemarks
      )
    }
  )

  const deathInformation =
    migrator.getValue({
      obj: src,
      path: 'individual.deathInformation',
    }) || []

  deathInformation.forEach(({ remarks: deathRemarks }) => {
    registerRemarksIfNotEmpty('deathRemarks', deathRemarks)
  })

  const originInformation =
    migrator.getValue({
      obj: src,
      path: 'individual.originInformation',
    }) || []

  originInformation.forEach(({ remarks: originRemarks }) => {
    registerRemarksIfNotEmpty('originRemarks', originRemarks)
  })

  const physicalObjectsRemarks = migrator.getValue({
    obj: src,
    path: 'collectionItemsRemarks',
  })
  registerRemarksIfNotEmpty('physicalObjectsRemarks', physicalObjectsRemarks)

  const collectionItems =
    migrator.getValue({
      obj: src,
      path: 'individual.collectionItems',
    }) || []

  collectionItems.forEach(({ curatorialAssessments = [], physicalObject }) => {
    curatorialAssessments.forEach(
      ({ remarks: curatorialAssessmentRemarks }) => {
        registerRemarksIfNotEmpty(
          'curatorialAssessmentRemarks',
          curatorialAssessmentRemarks
        )
      }
    )

    const aSinglePhysicalObjectRemarks = migrator.getValue({
      obj: physicalObject,
      path: 'remarks',
    })

    registerRemarksIfNotEmpty(
      'aSinglePhysicalObjectRemarks',
      aSinglePhysicalObjectRemarks
    )
  })

  const taxonomyRemarks = migrator.getValue({
    obj: src,
    path: 'individual.taxonInformation.taxonRemarks',
  })
  registerRemarksIfNotEmpty('taxonomyRemarks', taxonomyRemarks)

  const determinations =
    migrator.getValue({
      obj: src,
      path: 'individual.determinations',
    }) || []

  determinations.forEach(({ remarks: determinationRemarks }) => {
    registerRemarksIfNotEmpty('determinationRemarks', determinationRemarks)
  })

  const specimenRemarks = migrator.getValue({
    obj: src,
    path: 'remarks',
  })
  registerRemarksIfNotEmpty('specimenRemarks', specimenRemarks)

  remarksMap.srcFields = srcFields

  migrator.setValue({
    obj: target,
    path: fieldPath,
    value: remarksMap,
  })

  return null
}
module.exports = {
  aggregations: {
    [srcFieldAggregationName]: createStringAggregation({
      defaultLimit: availableSrcFields.length,
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
