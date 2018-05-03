import createActionCreatorFactoryTest from './utilities/test/createActionCreatorFactoryTest'
import createApiActionTypeFailTest from './utilities/test/createApiActionTypeFailTest'
import createApiActionTypeRequestTest from './utilities/test/createApiActionTypeRequestTest'
import createApiActionTypeSuccessTest from './utilities/test/createApiActionTypeSuccessTest'
import createApiClientTest from './utilities/test/createApiClientTest'
import getOneFactory, { dep } from './getOneFactory'

describe('coreModules/crud/createCrudModule/factories/actionCreators/getOneFactory', () => {
  describe('factory', () => {
    const actionCreatorFactoryInput = {
      operationId: 'physicalObjectGetOne',
      operationType: 'getOne',
      resource: 'physicalObject',
      resourceActionTypes: {
        getOne: {
          fail: 'GET_ONE_PHYSICAL_OBJECT_FAIL',
          request: 'GET_ONE_PHYSICAL_OBJECT_REQUEST',
          success: 'GET_ONE_PHYSICAL_OBJECT_SUCCESS',
        },
      },
    }

    const expectedGetActionActionTypesInput = {
      operationType: 'getOne',
      resource: 'physicalObject',
      resourceActionTypes: {
        getOne: {
          fail: 'GET_ONE_PHYSICAL_OBJECT_FAIL',
          request: 'GET_ONE_PHYSICAL_OBJECT_REQUEST',
          success: 'GET_ONE_PHYSICAL_OBJECT_SUCCESS',
        },
      },
    }

    const actionCreatorInput = {}

    createActionCreatorFactoryTest({
      actionCreatorFactory: getOneFactory,
      actionCreatorFactoryInput,
      actionCreatorInput,
      dep,
      expectedGetActionActionTypesInput,
    })
  })
})

describe('coreModules/crud/createCrudModule/factories/actionCreators/getOneFactory', () => {
  describe('actionCreator', () => {
    describe('request action', () => {
      const actionCreatorFactoryInput = {
        operationId: 'physicalObjectGetOne',
        operationType: 'getOne',
        resource: 'physicalObject',
        resourceActionTypes: {
          getOne: {
            fail: 'GET_ONE_PHYSICAL_OBJECT_FAIL',
            request: 'GET_ONE_PHYSICAL_OBJECT_REQUEST',
            success: 'GET_ONE_PHYSICAL_OBJECT_SUCCESS',
          },
        },
      }

      const actionCreatorInput = { id: 123 }

      const expectedAction = {
        meta: {
          pathParams: {
            id: 123,
          },
          queryParams: {
            relationships: ['all'],
          },
        },
        type: actionCreatorFactoryInput.resourceActionTypes.getOne.request,
      }

      createApiActionTypeRequestTest({
        actionCreatorFactory: getOneFactory,
        actionCreatorFactoryInput,
        actionCreatorInput,
        expectedAction,
        expectedActionType:
          actionCreatorFactoryInput.resourceActionTypes.getOne.request,
      })
    })

    describe('success action', () => {
      const actionCreatorFactoryInput = {
        operationId: 'physicalObjectGetOne',
        operationType: 'getOne',
        resource: 'physicalObject',
        resourceActionTypes: {
          getOne: {
            fail: 'GET_ONE_PHYSICAL_OBJECT_FAIL',
            request: 'GET_ONE_PHYSICAL_OBJECT_REQUEST',
            success: 'GET_ONE_PHYSICAL_OBJECT_SUCCESS',
          },
        },
      }
      const actionCreatorInput = { id: '123' }
      const expectedActionType =
        actionCreatorFactoryInput.resourceActionTypes.getOne.success
      const mockResponse = {
        data: {
          attributes: {
            name: 'Anton',
          },
          id: '123',
          type: 'type',
        },
      }
      const expectedAction = {
        meta: {
          pathParams: {
            id: '123',
          },
          queryParams: {
            relationships: ['all'],
          },
        },
        payload: { id: '123', name: 'Anton', type: 'type' },
        type: 'GET_ONE_PHYSICAL_OBJECT_SUCCESS',
      }

      createApiActionTypeSuccessTest({
        actionCreatorFactory: getOneFactory,
        actionCreatorFactoryInput,
        actionCreatorInput,
        expectedAction,
        expectedActionType,
        mockResponse,
      })
    })
  })
  describe('fail action', () => {
    const actionCreatorFactoryInput = {
      operationId: 'physicalObjectGetOne',
      operationType: 'getOne',
      resource: 'physicalObject',
      resourceActionTypes: {
        getOne: {
          fail: 'GET_ONE_PHYSICAL_OBJECT_FAIL',
          request: 'GET_ONE_PHYSICAL_OBJECT_REQUEST',
          success: 'GET_ONE_PHYSICAL_OBJECT_SUCCESS',
        },
      },
    }
    const actionCreatorInput = { id: '123' }
    const expectedActionType =
      actionCreatorFactoryInput.resourceActionTypes.getOne.fail

    const mockError = { status: 500 }
    const expectedAction = {
      error: true,
      meta: {
        pathParams: {
          id: '123',
        },
        queryParams: {
          relationships: ['all'],
        },
      },
      payload: mockError,
      type: 'GET_ONE_PHYSICAL_OBJECT_FAIL',
    }
    createApiActionTypeFailTest({
      actionCreatorFactory: getOneFactory,
      actionCreatorFactoryInput,
      actionCreatorInput,
      expectedAction,
      expectedActionType,
      mockError,
    })
  })
  describe('api client', () => {
    const actionCreatorFactoryInput = {
      operationId: 'physicalObjectGetOne',
      operationType: 'getOne',
      resource: 'physicalObject',
      resourceActionTypes: {
        getOne: {
          fail: 'GET_ONE_PHYSICAL_OBJECT_FAIL',
          request: 'GET_ONE_PHYSICAL_OBJECT_REQUEST',
          success: 'GET_ONE_PHYSICAL_OBJECT_SUCCESS',
        },
      },
    }
    const actionCreatorInput = {
      id: 123,
    }
    const expectedApiClientCallParams = {
      pathParams: {
        id: 123,
      },
      queryParams: { relationships: ['all'] },
    }

    const mockResponse = {
      data: {},
    }
    createApiClientTest({
      actionCreatorFactory: getOneFactory,
      actionCreatorFactoryInput,
      actionCreatorInput,
      expectedApiClientCallParams,
      mockResponse,
    })
  })
})
