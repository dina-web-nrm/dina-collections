import {
  STORAGE_SERVICE_CREATE_PHYSICAL_UNIT_REQUEST,
  STORAGE_SERVICE_CREATE_PHYSICAL_UNIT_SUCCESS,
} from 'dataModules/storageService/actionTypes'

import setupMockStoreWithApiClient from 'utilities/test/setupMockStoreWithApiClient'

import createSpecimen from './index'
import * as actionTypes from '../../actionTypes'

describe('dataModules/specimenService/actionCreators/createSpecimen', () => {
  let store
  let apiClient

  beforeEach(() => {
    const mock = setupMockStoreWithApiClient()
    /* eslint-disable prefer-destructuring */
    store = mock.store
    apiClient = mock.apiClientDependencies
    /* eslint-enable prefer-destructuring */
  })
  afterAll(() => {
    apiClient.reset()
  })

  it(`dispatches ${STORAGE_SERVICE_CREATE_PHYSICAL_UNIT_REQUEST} followed by ${
    STORAGE_SERVICE_CREATE_PHYSICAL_UNIT_SUCCESS
  } and ${actionTypes.SPECIMEN_SERVICE_CREATE_SPECIMEN_REQUEST}`, () => {
    const physicalObjects = [
      {
        normalStorageLocation: 'Sorex minutus',
      },
    ]
    const specimen = {
      individual: { collectionItems: [], identifiers: [] },
    }
    const testAction = createSpecimen({ physicalObjects, specimen })

    expect.assertions(3)

    return store.dispatch(testAction).then(() => {
      const storeActions = store.getActions()
      expect(storeActions[0].type).toEqual(
        STORAGE_SERVICE_CREATE_PHYSICAL_UNIT_REQUEST
      )
      expect(storeActions[1].type).toEqual(
        STORAGE_SERVICE_CREATE_PHYSICAL_UNIT_SUCCESS
      )
      expect(storeActions[2].type).toEqual(
        actionTypes.SPECIMEN_SERVICE_CREATE_SPECIMEN_REQUEST
      )
    })
  })

  it(`calls createSpecimen with correct body`, () => {
    const operationId = 'specimenCreate'
    const taxon = { id: '2367', type: 'taxon' }
    const specimen = {
      individual: {
        collectionItems: [],
        determinations: [{ taxon }],
        identifiers: [{ identifierType: 'catalogNumber', value: '123' }],
        taxonInformation: {},
      },
    }
    const callSpy = jest.fn()

    apiClient.mock({
      responses: {
        [operationId]: { data: {} },
      },
      spies: {
        [operationId]: callSpy,
      },
    })

    const testAction = createSpecimen({ specimen, taxa: [taxon] })

    expect.assertions(7)

    return store.dispatch(testAction).then(() => {
      expect(callSpy.mock.calls.length).toEqual(1)
      expect(callSpy.mock.calls[0][0]).toMatchObject({ operationId })
      expect(callSpy.mock.calls[0][1].body).toBeTruthy()
      expect(callSpy.mock.calls[0][1].body.data).toBeTruthy()
      expect(callSpy.mock.calls[0][1].body.data.attributes).toBeTruthy()
      expect(callSpy.mock.calls[0][1].body.data.relationships).toBeTruthy()
      expect(callSpy.mock.calls[0][1].body.data.type).toBeTruthy()
    })
  })

  it(`dispatches ${
    actionTypes.SPECIMEN_SERVICE_CREATE_SPECIMEN_SUCCESS
  } and returns transformed response`, () => {
    const operationId = 'specimenCreate'
    const specimen = {
      individual: {
        collectionItems: [],
        identifiers: [{ identifierType: 'catalogNumber', value: '123' }],
      },
    }

    const mockResponse = {
      data: {
        attributes: {
          name: 'Alan',
        },
        id: '123',
        type: 'type',
      },
    }
    const transformedResponse = {
      attributes: {
        name: 'Alan',
      },
      id: '123',

      type: 'type',
    }

    apiClient.mock({
      responses: {
        [operationId]: mockResponse,
      },
    })

    const testAction = createSpecimen({ specimen })

    const expectedFirstActionType =
      actionTypes.SPECIMEN_SERVICE_CREATE_SPECIMEN_REQUEST
    const expectedSecondActionType =
      actionTypes.SPECIMEN_SERVICE_CREATE_SPECIMEN_SUCCESS

    expect.assertions(3)

    return store.dispatch(testAction).then(res => {
      expect(store.getActions()[0].type).toEqual(expectedFirstActionType)
      expect(store.getActions()[1].type).toEqual(expectedSecondActionType)
      expect(res).toEqual(transformedResponse)
    })
  })

  it(`dispatches ${
    actionTypes.SPECIMEN_SERVICE_CREATE_SPECIMEN_FAIL
  } without throwing error`, () => {
    const operationId = 'specimenCreate'
    const specimen = {
      individual: {
        collectionItems: [],
        identifiers: [{ identifierType: 'catalogNumber', value: '123' }],
      },
    }
    const mockError = { status: 500 }

    apiClient.mock({
      errors: {
        [operationId]: mockError,
      },
    })

    const testAction = createSpecimen({ specimen, throwError: false })

    expect.assertions(3)

    return store.dispatch(testAction).then(res => {
      const secondAction = store.getActions()[1]
      expect(secondAction.type).toEqual(
        actionTypes.SPECIMEN_SERVICE_CREATE_SPECIMEN_FAIL
      )
      expect(secondAction.payload).toEqual(mockError)
      expect(res).toEqual(undefined)
    })
  })

  it(`dispatches ${
    actionTypes.SPECIMEN_SERVICE_CREATE_SPECIMEN_FAIL
  } and throws error`, () => {
    const operationId = 'specimenCreate'
    const specimen = {
      individual: {
        collectionItems: [],
        identifiers: [{ identifierType: 'catalogNumber', value: '123' }],
      },
    }
    const mockError = { status: 500 }

    apiClient.mock({
      errors: {
        [operationId]: mockError,
      },
    })

    const testAction = createSpecimen({
      specimen,
      throwError: true,
    })

    expect.assertions(3)

    return store.dispatch(testAction).catch(err => {
      const secondAction = store.getActions()[1]
      expect(secondAction.type).toEqual(
        actionTypes.SPECIMEN_SERVICE_CREATE_SPECIMEN_FAIL
      )
      expect(secondAction.payload).toEqual(mockError)
      expect(err).toEqual(mockError)
    })
  })
})
