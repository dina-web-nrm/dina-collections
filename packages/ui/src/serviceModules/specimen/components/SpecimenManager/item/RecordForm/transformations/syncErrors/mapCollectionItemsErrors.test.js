import mapCollectionItemsErrors, {
  mapCollectionItemError,
} from './mapCollectionItemsErrors'

describe('coreModules/form/utilities/errorMappingFunctions/mapCollectionItemsErrors', () => {
  test('mapCollectionItemError', () => {
    const collectionItemError = {
      physicalObject: {
        errorCode: 'REQUIRED',
        fullPath: 'individual.collectionItems.0.physicalObject',
      },
    }

    const testValue = mapCollectionItemError(collectionItemError)

    const expectedResult = {
      physicalObject: {
        storageLocation: {
          id: {
            errorCode: 'REQUIRED',
            fullPath:
              'individual.collectionItems.0.physicalObject.storageLocation.id',
          },
        },
      },
    }

    expect(testValue).toEqual(expectedResult)
  })
  test('mapCollectionItemsErrors', () => {
    const syncErrors = {
      individual: {
        collectionItems: [
          undefined,
          {
            physicalObject: {
              errorCode: 'REQUIRED',
              fullPath: 'individual.collectionItems.1.physicalObject',
            },
          },
        ],
      },
    }

    const testValue = mapCollectionItemsErrors(syncErrors)

    const expectedResult = {
      individual: {
        collectionItems: [
          undefined,
          {
            physicalObject: {
              storageLocation: {
                id: {
                  errorCode: 'REQUIRED',
                  fullPath:
                    'individual.collectionItems.1.physicalObject.storageLocation.id',
                },
              },
            },
          },
        ],
      },
    }

    expect(testValue).toEqual(expectedResult)
  })
})
