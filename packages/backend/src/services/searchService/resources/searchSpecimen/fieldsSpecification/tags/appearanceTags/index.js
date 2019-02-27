const objectPath = require('object-path')
const createStringAggregation = require('../../../../../../../lib/data/aggregations/factories/createStringAggregation')
const {
  createTagMatchFilter,
  createStringSearchFilter,
} = require('../../../../../../../lib/data/filters/factories')

const {
  createKeywordAndRawMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.tags.appearanceTags'
const key = 'appearanceTags'
const resource = 'appearanceTag'
const aggregationName = 'aggregateAppearanceTags'
const searchFilterName = 'searchAppearanceTags'
const matchFilterName = 'matchAppearanceTags'

const extractAppearanceTags = ({
  information = [],
  serviceInteractor,
  tagSuffix,
}) => {
  const unknownTag = `unknown (${tagSuffix})`

  if (!information.length) {
    return Promise.resolve([unknownTag])
  }

  return Promise.all(
    information.map(({ establishmentMeansType }) => {
      if (establishmentMeansType) {
        const { id, name } = establishmentMeansType

        if (name && name.en) {
          return Promise.resolve(`${name.en} (${tagSuffix})`)
        }

        return serviceInteractor
          .getOne({
            request: {
              pathParams: { id },
            },
            resource: 'establishmentMeansType',
          })
          .then(({ data }) => {
            const translatedName = objectPath.get(data, 'attributes.name.en')
            return Promise.resolve(`${translatedName} (${tagSuffix})`)
          })
      }

      return Promise.resolve(unknownTag)
    })
  )
}

const transformation = ({ migrator, src, target, serviceInteractor }) => {
  const collectingInformation =
    migrator.getValue({
      obj: src,
      path: 'individual.collectingInformation',
    }) || []

  const originInformation =
    migrator.getValue({
      obj: src,
      path: 'individual.originInformation',
    }) || []

  return Promise.all([
    extractAppearanceTags({
      information: collectingInformation,
      serviceInteractor,
      tagSuffix: 'collecting',
    }),
    extractAppearanceTags({
      information: originInformation,
      serviceInteractor,
      tagSuffix: 'origin',
    }),
  ]).then(([collectingTags, originTags]) => {
    const tags = [...collectingTags, ...originTags]

    migrator.setValue({
      obj: target,
      path: fieldPath,
      value: tags,
    })

    return null
  })
}

module.exports = {
  aggregations: {
    [aggregationName]: createStringAggregation({
      fieldPath,
      resource,
    }),
  },
  fieldPath,
  filters: {
    [matchFilterName]: createTagMatchFilter({
      fieldPath,
      nested: false,
    }),
    [searchFilterName]: createStringSearchFilter({
      fieldPath,
    }),
  },
  key,
  mapping: createKeywordAndRawMapping({
    fieldPath,
  }),
  selectable: true,
  transformation,
}
