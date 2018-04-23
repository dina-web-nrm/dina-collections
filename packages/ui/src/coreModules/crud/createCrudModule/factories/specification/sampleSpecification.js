import createSpecification from './index'

export const config = {
  resources: {
    physicalObject: {
      operations: [
        {
          operationId: 'getPhysicalUnit',
          type: 'getOne',
        },
      ],
    },
  },
}

export default createSpecification(config)
