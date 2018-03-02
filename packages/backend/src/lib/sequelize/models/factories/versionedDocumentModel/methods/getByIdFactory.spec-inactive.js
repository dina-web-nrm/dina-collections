// const getByIdFactory = require('./getByIdFactory')

// describe('lib/modelFactories/versionedDocumentModel/methods/getByIdFactory', () => {
//   describe('Initialization', () => {
//     it('Returns getById function when initialized', () => {
//       const Model = {}
//       const getById = getByIdFactory({ Model })
//       expect(getById).toBeTruthy()
//       expect(typeof getById).toBe('function')
//     })
//     it('Throws an error if Model not provided', () => {
//       expect(() => {
//         getByIdFactory()
//       }).toThrow()
//     })
//   })
//   describe('Usage', () => {
//     let MockModel
//     beforeEach(() => {
//       MockModel = {
//         dataValues: {},
//         findOne: jest.fn(options => {
//           const { id, include, versionId, raw } = options

//           return Promise.resolve({})
//         }),
//       }
//     })
//     it('Successfully create a new document when validate function not provided', () => {
//       const create = createFactory({ Model: MockModel })
//       const sampleDoc = {
//         email: 'anton@example.com',
//       }
//       return create(sampleDoc).then(res => {
//         expect(res).toBeTruthy()
//         expect(res).toEqual({
//           document: {
//             email: 'anton@example.com',
//           },
//           id: 1,
//           isCurrentVersion: true,
//           schemaCompliant: undefined,
//           schemaVersion: undefined,
//           versionId: 1,
//         })

//         expect(MockModel.create.mock.calls.length).toBe(1)
//         expect(MockModel.create.mock.calls[0]).toEqual([
//           {
//             document: sampleDoc,
//             isCurrentVersion: true,
//             schemaCompliant: undefined,
//             schemaVersion: undefined,
//           },
//         ])

//         expect(MockModel.set.mock.calls.length).toBe(1)
//         expect(MockModel.get.mock.calls.length).toBe(1)
//         expect(MockModel.save.mock.calls.length).toBe(1)
//       })
//     })
//   })
// })
