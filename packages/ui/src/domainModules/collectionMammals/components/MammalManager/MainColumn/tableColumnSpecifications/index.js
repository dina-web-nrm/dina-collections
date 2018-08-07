import { get } from 'object-path'

const IDENTIFIER_TYPE_CATALOG_NUMBER = '1'
const FEATURE_TYPE_SEX = '23'
const FEATURE_TYPE_AGE_STAGE = '1'
const FEATURE_TYPE_AGE = '2'
const FEATURE_TYPE_COMPLETE_BODY_WEIGHT = '24'
const FEATURE_TYPE_TOTAL_LENGTH = '17'
const FEATURE_TYPE_BODY_LENGTH = '18'
const FEATURE_TYPE_CONDITION = '3'
const RECORD_HISTORY_EVENT_REGISTERED = 'Registration of the specimen'
const SKELETON = 'skeleton'
const SKIN = 'skin'
const WET = 'wet'
const PREPARATION_TYPE_CATEGORY_IDS_MAP = {
  [SKELETON]: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
  [SKIN]: ['12', '13', '14', '15', '16', '17', '18'],
  [WET]: ['19', '20', '21'],
}

const createDateRangePartSelector = path => item => {
  const { year, month, day } = get(item, path) || {}
  if (year) {
    if (month) {
      if (day) {
        return `${year}-${month}-${day}`
      }

      return `${year}-${month}`
    }

    return year
  }

  return undefined
}

const createFeatureObservationSelector = featureTypeId => item => {
  const featureObservations = get(item, 'individual.featureObservations')
  const featureObservation = (featureObservations || []).find(
    ({ featureType }) => (featureType && featureType.id) === featureTypeId
  )

  return featureObservation && featureObservation.featureObservationText
}

const createGetCollectionItemsByCategory = category => item => {
  const collectionItems = get(item, 'individual.collectionItems')
  const categoryCollectionItems = (collectionItems || []).filter(
    collectionItem => {
      const preparationTypeId =
        collectionItem &&
        collectionItem.preparationType &&
        collectionItem.preparationType.id

      if (preparationTypeId) {
        return PREPARATION_TYPE_CATEGORY_IDS_MAP[category].includes(
          preparationTypeId
        )
      }

      return false
    }
  )

  return categoryCollectionItems
    .map(categoryCollectionItem => {
      const preparationTypeName = get(
        categoryCollectionItem,
        'preparationType.name'
      )
      const storageLocationParent = get(
        categoryCollectionItem,
        'physicalObject.storageLocation.parent.name'
      )
      const storageLocation = get(
        categoryCollectionItem,
        'physicalObject.storageLocation.name'
      )

      return `${preparationTypeName ? `${preparationTypeName} ` : ''}${
        storageLocationParent && storageLocation
          ? `(${storageLocationParent}/${storageLocation})`
          : `${storageLocation || ''}`
      }`
    })
    .join('; ')
}

const createRecordHistoryEventSelector = recordEventDescription => item => {
  const recordHistoryEvents = get(item, 'individual.recordHistoryEvents')
  const recordHistoryEvent = (recordHistoryEvents || []).find(
    ({ description }) => description === recordEventDescription
  )

  if (recordHistoryEvent) {
    const { date, agentText } = recordHistoryEvent
    return `${(date && date.dateText) || ''} by ${agentText}`
  }

  return undefined
}

const tableColumnSpecifications = [
  {
    name: 'catalogNumber',
    selector: item => {
      const identifiers = get(item, 'individual.identifiers')
      const catalogNumberIdentifier = (identifiers || []).find(
        ({ identifierType }) =>
          (identifierType && identifierType.id) ===
          IDENTIFIER_TYPE_CATALOG_NUMBER
      )

      return catalogNumberIdentifier && catalogNumberIdentifier.value
    },
    width: 150,
  },
  {
    name: 'curatorialName',
    selector: item => {
      return get(item, 'readOnly.objects.Scientific_Name')
    },
    width: 250,
  },
  {
    name: 'family',
    selector: item => {
      return get(item, 'readOnly.objects.Family')
    },
    width: 150,
  },
  {
    name: 'genus',
    selector: item => {
      return get(item, 'readOnly.objects.Genus')
    },
    width: 150,
  },
  {
    name: 'species',
    selector: item => {
      return get(item, 'readOnly.objects.Species')
    },
    width: 150,
  },
  {
    name: 'collectors',
    selector: item => {
      return get(
        item,
        'individual.collectingInformation.0.collectedByAgent.fullName'
      )
    },
    width: 250,
  },
  {
    name: 'startDateCollecting',
    selector: createDateRangePartSelector(
      'individual.collectingInformation.0.event.dateRange.startDate'
    ),
    width: 150,
  },
  {
    name: 'endDateCollecting',
    selector: createDateRangePartSelector(
      'individual.collectingInformation.0.event.dateRange.endDate'
    ),
    width: 150,
  },
  {
    name: 'localityCollecting',
    selector: item => {
      return get(
        item,
        'individual.collectingInformation.0.event.locationInformation.localityT'
      )
    },
    width: 300,
  },
  {
    name: 'death',
    selector: (item, language) => {
      const deathDate = createDateRangePartSelector(
        'individual.deathInformation.0.event.dateRange.startDate'
      )(item)
      const cause = get(
        item,
        `individual.deathInformation.0.causeOfDeathType.name.${language}`
      )

      return deathDate && cause && `Date: ${deathDate}, cause: ${cause}`
    },
    width: 200,
  },
  {
    name: SKELETON,
    selector: createGetCollectionItemsByCategory(SKELETON),
    width: 400,
  },
  {
    name: SKIN,
    selector: createGetCollectionItemsByCategory(SKIN),
    width: 400,
  },
  {
    name: WET,
    selector: createGetCollectionItemsByCategory(WET),
    width: 400,
  },
  {
    name: 'sex',
    selector: createFeatureObservationSelector(FEATURE_TYPE_SEX),
    width: 100,
  },
  {
    name: 'ageStage',
    selector: createFeatureObservationSelector(FEATURE_TYPE_AGE_STAGE),
    width: 100,
  },
  {
    name: 'age',
    selector: createFeatureObservationSelector(FEATURE_TYPE_AGE),
    width: 100,
  },
  {
    name: 'completeBodyWeight',
    selector: createFeatureObservationSelector(
      FEATURE_TYPE_COMPLETE_BODY_WEIGHT
    ),
    width: 150,
  },
  {
    name: 'totalLength',
    selector: createFeatureObservationSelector(FEATURE_TYPE_TOTAL_LENGTH),
    width: 150,
  },
  {
    name: 'bodyLength',
    selector: createFeatureObservationSelector(FEATURE_TYPE_BODY_LENGTH),
    width: 150,
  },
  {
    name: 'condition',
    selector: createFeatureObservationSelector(FEATURE_TYPE_CONDITION),
    width: 100,
  },
  {
    name: 'otherIdentifiers',
    selector: item => {
      const identifiers = get(item, 'individual.identifiers')
      const otherIdentifiers = (identifiers || [])
        .filter(
          ({ identifierType }) =>
            (identifierType && identifierType.id) !==
            IDENTIFIER_TYPE_CATALOG_NUMBER
        )
        .map(
          identifier =>
            identifier &&
            identifier.value &&
            `${identifier.identifierType.name}: ${identifier.value}`
        )
        .join(';')

      return otherIdentifiers
    },
    width: 300,
  },
  {
    name: 'registered',
    selector: createRecordHistoryEventSelector(RECORD_HISTORY_EVENT_REGISTERED),
    width: 200,
  },
]

export const tableColumnNames = tableColumnSpecifications.map(
  ({ name }) => name
)

export const getTableWidth = (includedTableColumns = tableColumnNames) => {
  return tableColumnSpecifications.reduce((totalWidth, { name, width }) => {
    if (includedTableColumns.includes(name)) {
      return totalWidth + width
    }

    return totalWidth
  }, 80) // "Row #"" is always visible with width 100
}

export default tableColumnSpecifications
