import createActionCreatorFactoryTest from './utilities/test/createActionCreatorFactoryTest'
import createApiActionTypeFailTest from './utilities/test/createApiActionTypeFailTest'
import createApiActionTypeRequestTest from './utilities/test/createApiActionTypeRequestTest'
import createApiActionTypeSuccessTest from './utilities/test/createApiActionTypeSuccessTest'
import createApiClientTest from './utilities/test/createApiClientTest'
import createFactory, { dep } from './createFactory'

const inputCreatePhysicalObject = {
  operationId: 'physicalObjectCreate',
  operationType: 'create',
  resource: 'physicalObject',
  resourceActionTypes: {
    create: {
      fail: 'CREATE_PHYSICAL_OBJECT_FAIL',
      request: 'CREATE_PHYSICAL_OBJECT_REQUEST',
      success: 'CREATE_PHYSICAL_OBJECT_SUCCESS',
    },
  },
}

describe('coreModules/crud/createCrudModule/factories/actionCreators/createFactory', () => {
  describe('factory', () => {
    const actionCreatorFactoryInput = {
      operationId: 'physicalObjectCreate',
      operationType: 'create',
      resource: 'physicalObject',
      resourceActionTypes: {
        create: {
          fail: 'CREATE_PHYSICAL_OBJECT_FAIL',
          request: 'CREATE_PHYSICAL_OBJECT_REQUEST',
          success: 'CREATE_PHYSICAL_OBJECT_SUCCESS',
        },
      },
    }

    const expectedGetActionActionTypesInput = {
      operationType: 'create',
      resource: 'physicalObject',
      resourceActionTypes: {
        create: {
          fail: 'CREATE_PHYSICAL_OBJECT_FAIL',
          request: 'CREATE_PHYSICAL_OBJECT_REQUEST',
          success: 'CREATE_PHYSICAL_OBJECT_SUCCESS',
        },
      },
    }
    createActionCreatorFactoryTest({
      actionCreatorFactory: createFactory,
      actionCreatorFactoryInput,
      actionCreatorInput: {},
      dep,
      expectedGetActionActionTypesInput,
    })
  })
})

describe('coreModules/crud/createCrudModule/factories/actionCreators/createFactory', () => {
  describe('actionCreator', () => {
    describe('request action', () => {
      const actionCreatorFactoryInput = {
        operationId: 'physicalObjectCreate',
        operationType: 'create',
        resource: 'physicalObject',
        resourceActionTypes: {
          create: {
            fail: 'CREATE_PHYSICAL_OBJECT_FAIL',
            request: 'CREATE_PHYSICAL_OBJECT_REQUEST',
            success: 'CREATE_PHYSICAL_OBJECT_SUCCESS',
          },
        },
      }

      const expectedAction = {
        meta: {
          body: {
            data: {
              attributes: {},
              type: 'physicalObject',
            },
          },
        },
        type: inputCreatePhysicalObject.resourceActionTypes.create.request,
      }

      const actionCreatorInput = { item: {} }

      createApiActionTypeRequestTest({
        actionCreatorFactory: createFactory,
        actionCreatorFactoryInput,
        actionCreatorInput,
        expectedAction,
        expectedActionType:
          inputCreatePhysicalObject.resourceActionTypes.create.request,
      })
    })

    describe('success action', () => {
      const actionCreatorInput = {
        item: {},
      }
      const expectedActionType =
        inputCreatePhysicalObject.resourceActionTypes.create.success
      const mockResponse = {
        data: {
          attributes: {
            name: 'Alan',
          },
          id: '123',
          type: 'type',
        },
      }
      const expectedAction = {
        meta: {
          body: { data: { attributes: {}, type: 'physicalObject' } },
        },
        payload: { id: '123', name: 'Alan', type: 'type' },
        type: 'CREATE_PHYSICAL_OBJECT_SUCCESS',
      }

      createApiActionTypeSuccessTest({
        actionCreatorFactory: createFactory,
        actionCreatorFactoryInput: inputCreatePhysicalObject,
        actionCreatorInput,
        expectedAction,
        expectedActionType,
        mockResponse,
      })
    })

    describe('fail action', () => {
      const actionCreatorInput = {
        item: {},
      }
      const expectedActionType =
        inputCreatePhysicalObject.resourceActionTypes.create.fail

      const mockError = { status: 500 }
      const expectedAction = {
        error: true,
        meta: { body: { data: { attributes: {}, type: 'physicalObject' } } },
        payload: mockError,
        type: inputCreatePhysicalObject.resourceActionTypes.create.fail,
      }
      createApiActionTypeFailTest({
        actionCreatorFactory: createFactory,
        actionCreatorFactoryInput: inputCreatePhysicalObject,
        actionCreatorInput,
        expectedAction,
        expectedActionType,
        mockError,
      })
    })

    describe('api client', () => {
      const actionCreatorInput = {
        item: {},
      }
      const expectedApiClientCallParams = {
        body: {
          data: {
            attributes: {},
            type: 'physicalObject',
          },
        },
      }

      const mockResponse = {
        data: {},
      }
      createApiClientTest({
        actionCreatorFactory: createFactory,
        actionCreatorFactoryInput: inputCreatePhysicalObject,
        actionCreatorInput,
        expectedApiClientCallParams,
        mockResponse,
      })
    })
  })
})
