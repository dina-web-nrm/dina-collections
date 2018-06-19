import createActionCreatorFactoryTest from '../utilities/test/createActionCreatorFactoryTest'
import createApiActionTypeFailTest from '../utilities/test/createApiActionTypeFailTest'
import createApiActionTypeRequestTest from '../utilities/test/createApiActionTypeRequestTest'
import createApiActionTypeSuccessTest from '../utilities/test/createApiActionTypeSuccessTest'
import createApiClientTest from '../utilities/test/createApiClientTest'
import queryFactory, { dep } from './index'

const inputCreateSearchSpecimen = {
  operationId: 'searchSpecimenQuery',
  operationType: 'query',
  resource: 'searchSpecimen',
  resourceActionTypes: {
    query: {
      fail: 'QUERY_SEARCH_SPECIMEN_FAIL',
      request: 'QUERY_SEARCH_SPECIMEN_REQUEST',
      success: 'QUERY_SEARCH_SPECIMEN_SUCCESS',
    },
  },
}

const testBody = {
  data: {
    attributes: {
      aggregations: [
        {
          aggregationFunction: 'identifiers',
          key: 'collectingLocations',
          options: { contains: 'Stockholm', limit: 1 },
        },
      ],
      idsOnly: undefined,
      limit: 1000,
      offset: 0,
      query: {
        and: [
          {
            filter: {
              filterFunction: 'matchCollectingLocation',
              value: 'Stockholm',
            },
          },
        ],
      },
      scroll: false,
      scrollId: undefined,
    },
  },
}

describe('coreModules/crud/createCrudModule/factories/actionCreators/queryFactory', () => {
  describe('factory', () => {
    const actionCreatorFactoryInput = {
      operationId: 'searchSpecimenQuery',
      operationType: 'query',
      resource: 'searchSpecimen',
      resourceActionTypes: {
        query: {
          fail: 'QUERY_SEARCH_SPECIMEN_FAIL',
          request: 'QUERY_SEARCH_SPECIMEN_REQUEST',
          success: 'QUERY_SEARCH_SPECIMEN_SUCCESS',
        },
      },
    }

    const expectedGetActionActionTypesInput = {
      operationType: 'query',
      resource: 'searchSpecimen',
      resourceActionTypes: {
        query: {
          fail: 'QUERY_SEARCH_SPECIMEN_FAIL',
          request: 'QUERY_SEARCH_SPECIMEN_REQUEST',
          success: 'QUERY_SEARCH_SPECIMEN_SUCCESS',
        },
      },
    }
    createActionCreatorFactoryTest({
      actionCreatorFactory: queryFactory,
      actionCreatorFactoryInput,
      actionCreatorInput: {},
      dep,
      expectedGetActionActionTypesInput,
    })
  })
})

describe('coreModules/crud/createCrudModule/factories/actionCreators/queryFactory', () => {
  describe('actionCreator', () => {
    describe('request action', () => {
      const actionCreatorFactoryInput = {
        operationId: 'searchSpecimenQuery',
        operationType: 'query',
        resource: 'searchSpecimen',
        resourceActionTypes: {
          query: {
            fail: 'QUERY_SEARCH_SPECIMEN_FAIL',
            request: 'QUERY_SEARCH_SPECIMEN_REQUEST',
            success: 'QUERY_SEARCH_SPECIMEN_SUCCESS',
          },
        },
      }

      const expectedAction = {
        meta: {
          body: testBody,
        },
        type: inputCreateSearchSpecimen.resourceActionTypes.query.request,
      }

      const actionCreatorInput = { ...testBody.data.attributes }

      createApiActionTypeRequestTest({
        actionCreatorFactory: queryFactory,
        actionCreatorFactoryInput,
        actionCreatorInput,
        expectedAction,
        expectedActionType:
          inputCreateSearchSpecimen.resourceActionTypes.query.request,
      })
    })

    describe('success action', () => {
      const actionCreatorInput = { ...testBody.data.attributes }
      const expectedActionType =
        inputCreateSearchSpecimen.resourceActionTypes.query.success
      const mockResponse = {
        data: [
          {
            attributes: {},
            id: '123',
            type: 'type',
          },
        ],
      }
      const expectedAction = {
        meta: {
          body: testBody,
        },
        payload: mockResponse.data,
        type: 'QUERY_SEARCH_SPECIMEN_SUCCESS',
      }

      createApiActionTypeSuccessTest({
        actionCreatorFactory: queryFactory,
        actionCreatorFactoryInput: inputCreateSearchSpecimen,
        actionCreatorInput,
        expectedAction,
        expectedActionType,
        mockResponse,
        resource: 'searchSpecimen',
      })
    })

    describe('fail action', () => {
      const actionCreatorInput = { ...testBody.data.attributes }
      const expectedActionType =
        inputCreateSearchSpecimen.resourceActionTypes.query.fail

      const mockError = { status: 500 }
      const expectedAction = {
        error: true,
        meta: { body: testBody },
        payload: mockError,
        type: inputCreateSearchSpecimen.resourceActionTypes.query.fail,
      }
      createApiActionTypeFailTest({
        actionCreatorFactory: queryFactory,
        actionCreatorFactoryInput: inputCreateSearchSpecimen,
        actionCreatorInput,
        expectedAction,
        expectedActionType,
        mockError,
      })
    })

    describe('api client', () => {
      const actionCreatorInput = { ...testBody.data.attributes }
      const expectedApiClientCallParams = {
        body: testBody,
      }

      const mockResponse = {
        data: {},
      }
      createApiClientTest({
        actionCreatorFactory: queryFactory,
        actionCreatorFactoryInput: inputCreateSearchSpecimen,
        actionCreatorInput,
        expectedApiClientCallParams,
        mockResponse,
      })
    })
  })
})
