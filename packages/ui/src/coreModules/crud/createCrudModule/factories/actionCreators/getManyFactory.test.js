import createActionCreatorFactoryTest from './utilities/test/createActionCreatorFactoryTest'
import createApiActionTypeFailTest from './utilities/test/createApiActionTypeFailTest'
import createApiActionTypeRequestTest from './utilities/test/createApiActionTypeRequestTest'
import createApiActionTypeSuccessTest from './utilities/test/createApiActionTypeSuccessTest'
import createApiClientTest from './utilities/test/createApiClientTest'
import getManyFactory, { dep } from './getManyFactory'

const actionCreatorFactoryInput = {
  operationId: 'physicalObjectGetMany',
  operationType: 'getMany',
  resource: 'physicalObject',
  resourceActionTypes: {
    getMany: {
      fail: 'GET_MANY_PHYSICAL_OBJECT_FAIL',
      request: 'GET_MANY_PHYSICAL_OBJECT_REQUEST',
      success: 'GET_MANY_PHYSICAL_OBJECT_SUCCESS',
    },
  },
}

describe('coreModules/crud/createCrudModule/factories/actionCreators/getManyFactory', () => {
  describe('factory', () => {
    const expectedGetActionActionTypesInput = {
      operationType: 'getMany',
      resource: 'physicalObject',
      resourceActionTypes: {
        getMany: {
          fail: 'GET_MANY_PHYSICAL_OBJECT_FAIL',
          request: 'GET_MANY_PHYSICAL_OBJECT_REQUEST',
          success: 'GET_MANY_PHYSICAL_OBJECT_SUCCESS',
        },
      },
    }

    const actionCreatorInput = {}

    createActionCreatorFactoryTest({
      actionCreatorFactory: getManyFactory,
      actionCreatorFactoryInput,
      actionCreatorInput,
      dep,
      expectedGetActionActionTypesInput,
    })
  })
})

describe('coreModules/crud/createCrudModule/factories/actionCreators/getManyFactory', () => {
  describe('actionCreator', () => {
    describe('request action', () => {
      const expectedActionType =
        actionCreatorFactoryInput.resourceActionTypes.getMany.request

      describe('without queryParams', () => {
        const actionCreatorInput = {}

        const expectedAction = {
          meta: {
            queryParams: {
              limit: 1000,
            },
          },
          type: expectedActionType,
        }

        createApiActionTypeRequestTest({
          actionCreatorFactory: getManyFactory,
          actionCreatorFactoryInput,
          actionCreatorInput,
          expectedAction,
          expectedActionType,
        })
      })
      describe('with queryParams', () => {
        const actionCreatorInput = {
          queryParams: { filter: { label: 'a-label' } },
        }

        const expectedAction = {
          meta: {
            isLookup: undefined,
            queryParams: { filter: { label: 'a-label' }, limit: 1000 },
          },
          type: expectedActionType,
        }

        createApiActionTypeRequestTest({
          actionCreatorFactory: getManyFactory,
          actionCreatorFactoryInput,
          actionCreatorInput,
          expectedAction,
          expectedActionType,
        })
      })
      describe('with queryParams and relationships', () => {
        const actionCreatorInput = {
          queryParams: { filter: { label: 'a-label' } },
          relationships: ['parent'],
        }

        const expectedAction = {
          meta: {
            queryParams: {
              filter: { label: 'a-label' },
              limit: 1000,
              relationships: ['parent'],
            },
          },
          type: expectedActionType,
        }

        createApiActionTypeRequestTest({
          actionCreatorFactory: getManyFactory,
          actionCreatorFactoryInput,
          actionCreatorInput,
          expectedAction,
          expectedActionType,
        })
      })
    })
    describe('success action', () => {
      const expectedActionType =
        actionCreatorFactoryInput.resourceActionTypes.getMany.success
      describe('without queryParams', () => {
        const actionCreatorInput = {}

        const mockResponse = {
          data: [
            {
              attributes: {
                name: 'Anton',
              },
              id: '123',
              type: 'physicalObject',
            },
          ],
        }

        const expectedAction = {
          meta: {
            batchNumber: 0,
            isLastBatch: true,
            isLookup: undefined,
            queryParams: {
              limit: 1000,
              offset: 0,
            },
            removeFromState: false,
          },
          payload: [
            {
              attributes: { name: 'Anton' },
              id: '123',
              type: 'physicalObject',
            },
          ],
          type: 'GET_MANY_PHYSICAL_OBJECT_SUCCESS',
        }

        createApiActionTypeSuccessTest({
          actionCreatorFactory: getManyFactory,
          actionCreatorFactoryInput,
          actionCreatorInput,
          expectedAction,
          expectedActionType,
          mockResponse,
        })
      })
      describe('with queryParams and relationships', () => {
        const actionCreatorInput = {
          queryParams: { filter: { label: 'a-label' } },
          relationships: ['parent'],
        }

        const mockResponse = {
          data: [
            {
              attributes: {
                name: 'Anton',
              },
              id: '123',
              type: 'physicalObject',
            },
          ],
        }

        const expectedAction = {
          meta: {
            batchNumber: 0,
            isLastBatch: true,
            isLookup: undefined,
            queryParams: {
              filter: { label: 'a-label' },
              limit: 1000,
              offset: 0,
              relationships: ['parent'],
            },
            removeFromState: false,
          },
          payload: [
            {
              attributes: { name: 'Anton' },
              id: '123',
              type: 'physicalObject',
            },
          ],
          type: 'GET_MANY_PHYSICAL_OBJECT_SUCCESS',
        }

        createApiActionTypeSuccessTest({
          actionCreatorFactory: getManyFactory,
          actionCreatorFactoryInput,
          actionCreatorInput,
          expectedAction,
          expectedActionType,
          mockResponse,
        })
      })
    })
    describe('fail action', () => {
      const expectedActionType =
        actionCreatorFactoryInput.resourceActionTypes.getMany.fail
      describe('without queryParams', () => {
        const actionCreatorInput = {}

        const mockError = { status: 500 }
        const expectedAction = {
          error: true,
          meta: {
            queryParams: { limit: 1000 },
          },
          payload: mockError,
          type: 'GET_MANY_PHYSICAL_OBJECT_FAIL',
        }

        createApiActionTypeFailTest({
          actionCreatorFactory: getManyFactory,
          actionCreatorFactoryInput,
          actionCreatorInput,
          expectedAction,
          expectedActionType,
          mockError,
        })
      })
      describe('with queryParams and relationships', () => {
        const actionCreatorInput = {
          queryParams: { filter: { label: 'a-label' } },
          relationships: ['parent'],
        }

        const mockError = { status: 500 }

        const expectedAction = {
          error: true,
          meta: {
            queryParams: {
              filter: { label: 'a-label' },
              limit: 1000,
              relationships: ['parent'],
            },
          },
          payload: mockError,
          type: 'GET_MANY_PHYSICAL_OBJECT_FAIL',
        }

        createApiActionTypeFailTest({
          actionCreatorFactory: getManyFactory,
          actionCreatorFactoryInput,
          actionCreatorInput,
          expectedAction,
          expectedActionType,
          mockError,
        })
      })
    })
  })
  describe('api client', () => {
    const actionCreatorInput = {
      queryParams: { filter: { label: 'a-label' } },
      relationships: ['parent'],
    }

    const expectedApiClientCallParams = {
      batchNumber: 0,
      isLookup: undefined,
      queryParams: {
        filter: { label: 'a-label' },
        limit: 1000,
        offset: 0,
        relationships: ['parent'],
      },
    }

    const mockResponse = {
      data: {},
    }
    createApiClientTest({
      actionCreatorFactory: getManyFactory,
      actionCreatorFactoryInput,
      actionCreatorInput,
      expectedApiClientCallParams,
      mockResponse,
    })
  })
})
