import createSpecification from './index'

export const config = {
  resources: {
    physicalObject: {
      operations: [
        {
          operationId: 'physicalObjectGetOne',
          type: 'getOne',
        },
      ],
    },
  },
}

export default createSpecification(config)
