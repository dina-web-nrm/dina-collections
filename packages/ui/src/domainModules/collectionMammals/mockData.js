import models from 'common/dist/models.json'
import immutable from 'object-path-immutable'

const { fullFormExample } = models.specimenCreateRequest['x-examples']

let mockId = 0

export const getSpecimen = ({ pathParams = {}, queryParams = {} } = {}) => {
  mockId += 1

  const withId = immutable.set(
    fullFormExample.data,
    'id',
    pathParams.id || `${mockId}`
  )

  return immutable.set(
    withId,
    'attributes.individual.identifiers.0.value',
    queryParams['filter[catalogNumber]'] ||
      String(Math.round(100000 + Math.random() * 99999))
  )
}

export const createLookupMammalsResponse = ({
  request: { pathParams = {}, queryParams = {} },
}) => {
  if (
    (queryParams && queryParams['filter[catalogNumber]']) ||
    queryParams['filter[taxonNameStandardized]']
  ) {
    return {
      data: [getSpecimen({ pathParams, queryParams })],
    }
  }

  return {
    data: [
      getSpecimen({
        pathParams,
        queryParams: {
          catalogNumber: '201705001',
          taxonName: 'Lorem ipsum',
        },
      }),
      getSpecimen({
        pathParams,
        queryParams: {
          catalogNumber: '201705002',
          taxonName: 'Dolor Sit Amet',
        },
      }),
      getSpecimen({
        pathParams,
        queryParams: {
          catalogNumber: '201705003',
          taxonName: 'Consectetur',
        },
      }),
      getSpecimen({
        pathParams,
        queryParams: {
          catalogNumber: '201705004',
          taxonName: 'Adipiscing',
        },
      }),
    ],
  }
}
