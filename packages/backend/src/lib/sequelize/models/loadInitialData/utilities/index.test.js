const {
  extractLoadInitialDataFromServices,
  extractInitialServiceFactories,
  extractOtherServiceFactories,
  orderInitialDataFactories,
  filterByServiceName,
} = require('./index')

describe('lib/sequelize/models/loadInitialData/utilities', () => {
  let dummyA
  let dummyB
  let dummyC

  beforeEach(() => {
    dummyA = () => {}
    dummyB = () => {}
    dummyC = () => {}
  })

  describe('extractLoadInitialDataFromServices', () => {
    it('returns ', () => {
      const services = {
        agentService: {
          models: [
            { factory: dummyA, name: 'loadInitialData' },
            { factory: () => {}, name: 'setupRelations' },
          ],
        },
        statusService: {},
        storageService: {
          models: { loadInitialData: dummyB, storageLocation: () => {} },
        },
      }
      const testValue = extractLoadInitialDataFromServices(services)
      const expectedResult = [
        { loadInitialData: dummyA, serviceName: 'agentService' },
        { loadInitialData: dummyB, serviceName: 'storageService' },
      ]
      expect(testValue).toEqual(expectedResult)
    })
  })

  describe('filterByServiceName', () => {
    it('filters array by service name', () => {
      const testValue = filterByServiceName(
        [
          { id: 'a', serviceName: 'google' },
          { id: 'b', serviceName: 'bing' },
          { id: 'c', serviceName: 'google' },
        ],
        'google'
      )
      const expectedResult = [
        { id: 'a', serviceName: 'google' },
        { id: 'c', serviceName: 'google' },
      ]

      expect(testValue).toEqual(expectedResult)
    })
  })

  describe('extractInitialServiceFactories', () => {
    it('returns objects with service name matching provided array', () => {
      const config = {
        db: {
          loadInitialDataServiceOrder: ['agentService', 'storageService'],
        },
      }
      const factories = [
        { loadInitialData: dummyA, serviceName: 'agentService' },
        { loadInitialData: dummyB, serviceName: 'specimenService' },
        { loadInitialData: dummyC, serviceName: 'storageService' },
      ]
      const testValue = extractInitialServiceFactories({
        factories,
        loadInitialDataServiceOrder: config.db.loadInitialDataServiceOrder,
      })
      const expectedResult = [
        { loadInitialData: dummyA, serviceName: 'agentService' },
        { loadInitialData: dummyC, serviceName: 'storageService' },
      ]
      expect(testValue).toEqual(expectedResult)
    })
  })

  describe('extractOtherServiceFactories', () => {
    it('returns objects with service name not matching provided array', () => {
      const config = {
        db: {
          loadInitialDataServiceOrder: ['agentService', 'storageService'],
        },
      }
      const factories = [
        { loadInitialData: dummyA, serviceName: 'agentService' },
        { loadInitialData: dummyB, serviceName: 'specimenService' },
        { loadInitialData: dummyC, serviceName: 'storageService' },
      ]
      const testValue = extractOtherServiceFactories({
        factories,
        loadInitialDataServiceOrder: config.db.loadInitialDataServiceOrder,
      })
      const expectedResult = [
        { loadInitialData: dummyB, serviceName: 'specimenService' },
      ]
      expect(testValue).toEqual(expectedResult)
    })
  })

  describe('orderInitialDataFactories', () => {
    it('returns factories ordered by initial services first', () => {
      const config = {
        db: {
          loadInitialDataServiceOrder: ['agentService', 'storageService'],
        },
      }
      const factories = [
        { loadInitialData: dummyA, serviceName: 'agentService' },
        { loadInitialData: dummyB, serviceName: 'specimenService' },
        { loadInitialData: dummyC, serviceName: 'storageService' },
      ]
      const testValue = orderInitialDataFactories({
        config,
        factories,
      })
      const expectedResult = [
        { loadInitialData: dummyA, serviceName: 'agentService' },
        { loadInitialData: dummyC, serviceName: 'storageService' },
        { loadInitialData: dummyB, serviceName: 'specimenService' },
      ]
      expect(testValue).toEqual(expectedResult)
    })
  })
})
