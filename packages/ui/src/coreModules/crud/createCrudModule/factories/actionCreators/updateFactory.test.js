import createActionCreatorFactoryTest from './utilities/test/createActionCreatorFactoryTest'
import createApiActionTypeFailTest from './utilities/test/createApiActionTypeFailTest'
import createApiActionTypeRequestTest from './utilities/test/createApiActionTypeRequestTest'
import createApiActionTypeSuccessTest from './utilities/test/createApiActionTypeSuccessTest'
import createApiClientTest from './utilities/test/createApiClientTest'
import updateFactory, { dep } from './updateFactory'

describe('coreModules/crud/createCrudModule/factories/actionCreators/updateFactory', () => {
  describe('factory', () => {
    const actionCreatorFactoryInput = {
      operationId: 'physicalObjectUpdate',
      operationType: 'update',
      resource: 'physicalObject',
      resourceActionTypes: {
        update: {
          fail: 'UPDATE_PHYSICAL_OBJECT_FAIL',
          request: 'UPDATE_PHYSICAL_OBJECT_REQUEST',
          success: 'UPDATE_PHYSICAL_OBJECT_SUCCESS',
        },
      },
    }

    const expectedGetActionActionTypesInput = {
      operationType: 'update',
      resource: 'physicalObject',
      resourceActionTypes: {
        update: {
          fail: 'UPDATE_PHYSICAL_OBJECT_FAIL',
          request: 'UPDATE_PHYSICAL_OBJECT_REQUEST',
          success: 'UPDATE_PHYSICAL_OBJECT_SUCCESS',
        },
      },
    }

    const actionCreatorInput = {}

    createActionCreatorFactoryTest({
      actionCreatorFactory: updateFactory,
      actionCreatorFactoryInput,
      actionCreatorInput,
      dep,
      expectedGetActionActionTypesInput,
    })
  })
})

describe('coreModules/crud/createCrudModule/factories/actionCreators/updateFactory', () => {
  describe('actionCreator', () => {
    describe('request action', () => {
      const actionCreatorFactoryInput = {
        operationId: 'physicalObjectUpdate',
        operationType: 'update',
        resource: 'physicalObject',
        resourceActionTypes: {
          update: {
            fail: 'UPDATE_PHYSICAL_OBJECT_FAIL',
            request: 'UPDATE_PHYSICAL_OBJECT_REQUEST',
            success: 'UPDATE_PHYSICAL_OBJECT_SUCCESS',
          },
        },
      }

      const actionCreatorInput = { item: { attributes: { name: 2 }, id: 123 } }
      const expectedActionType =
        actionCreatorFactoryInput.resourceActionTypes.update.request
      const expectedAction = {
        meta: {
          body: {
            data: {
              attributes: {
                name: 2,
              },
              id: 123,
              type: 'physicalObject',
            },
          },
          pathParams: {
            id: 123,
          },
        },
        type: expectedActionType,
      }

      createApiActionTypeRequestTest({
        actionCreatorFactory: updateFactory,
        actionCreatorFactoryInput,
        actionCreatorInput,
        expectedAction,
        expectedActionType,
      })
    })

    describe('success action', () => {
      const actionCreatorFactoryInput = {
        operationId: 'physicalObjectUpdate',
        operationType: 'update',
        resource: 'physicalObject',
        resourceActionTypes: {
          update: {
            fail: 'UPDATE_PHYSICAL_OBJECT_FAIL',
            request: 'UPDATE_PHYSICAL_OBJECT_REQUEST',
            success: 'UPDATE_PHYSICAL_OBJECT_SUCCESS',
          },
        },
      }
      const actionCreatorInput = {
        item: { attributes: { name: 'Anton' }, id: '123' },
      }
      const expectedActionType =
        actionCreatorFactoryInput.resourceActionTypes.update.success
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
          body: {
            data: {
              attributes: {
                name: 'Anton',
              },
              id: '123',
              type: 'physicalObject',
            },
          },
          pathParams: {
            id: '123',
          },
        },
        payload: { attributes: { name: 'Anton' }, id: '123', type: 'type' },
        type: 'UPDATE_PHYSICAL_OBJECT_SUCCESS',
      }

      createApiActionTypeSuccessTest({
        actionCreatorFactory: updateFactory,
        actionCreatorFactoryInput,
        actionCreatorInput,
        expectedAction,
        expectedActionType,
        mockResponse,
      })
    })

    describe('fail action', () => {
      const actionCreatorFactoryInput = {
        operationId: 'physicalObjectUpdate',
        operationType: 'update',
        resource: 'physicalObject',
        resourceActionTypes: {
          update: {
            fail: 'UPDATE_PHYSICAL_OBJECT_FAIL',
            request: 'UPDATE_PHYSICAL_OBJECT_REQUEST',
            success: 'UPDATE_PHYSICAL_OBJECT_SUCCESS',
          },
        },
      }
      const actionCreatorInput = {
        item: { attributes: { name: 'Anton' }, id: '123' },
      }
      const expectedActionType =
        actionCreatorFactoryInput.resourceActionTypes.update.fail

      const mockError = { status: 500 }
      const expectedAction = {
        error: true,
        meta: {
          body: {
            data: {
              attributes: {
                name: 'Anton',
              },
              id: '123',
              type: 'physicalObject',
            },
          },
          pathParams: {
            id: '123',
          },
        },
        payload: mockError,
        type: 'UPDATE_PHYSICAL_OBJECT_FAIL',
      }
      createApiActionTypeFailTest({
        actionCreatorFactory: updateFactory,
        actionCreatorFactoryInput,
        actionCreatorInput,
        expectedAction,
        expectedActionType,
        mockError,
      })
    })
    describe('api client', () => {
      const actionCreatorFactoryInput = {
        operationId: 'physicalObjectUpdate',
        operationType: 'update',
        resource: 'physicalObject',
        resourceActionTypes: {
          update: {
            fail: 'UPDATE_PHYSICAL_OBJECT_FAIL',
            request: 'UPDATE_PHYSICAL_OBJECT_REQUEST',
            success: 'UPDATE_PHYSICAL_OBJECT_SUCCESS',
          },
        },
      }
      const actionCreatorInput = {
        item: { attributes: { name: 'Anton' }, id: '123' },
      }
      const expectedApiClientCallParams = {
        body: {
          data: {
            attributes: {
              name: 'Anton',
            },
            id: '123',
            type: 'physicalObject',
          },
        },
        pathParams: {
          id: '123',
        },
      }

      const mockResponse = {
        data: {},
      }
      createApiClientTest({
        actionCreatorFactory: updateFactory,
        actionCreatorFactoryInput,
        actionCreatorInput,
        expectedApiClientCallParams,
        mockResponse,
      })
    })
  })
})
