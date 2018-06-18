const normalizedRequestSuccess = require('./operations/create/examples/normalizedRequestSuccess.json')
const validateBody = require('./operations/create/validators/validateBody')
const updateRequestSuccess = require('./operations/update/examples/requestSuccess.json')
const getManyfilters = require('./operations/getMany/filters')

const postEditHook = ({ res, serviceInteractor }) => {
  return Promise.resolve().then(() => {
    const id = res && res.id
    const request = {
      body: {
        data: {
          attributes: {
            ids: [id],
          },
        },
      },
    }
    return serviceInteractor.requestUpdateView({
      request,
      resource: 'searchSpecimen',
    })
  })
}

module.exports = {
  basePath: '/api/specimen/v01',
  operations: [
    {
      errors: {
        '400': ['REQUEST_BODY_VALIDATION_ERROR'],
      },
      exampleRequests: { primary: normalizedRequestSuccess },
      postCreateHook: postEditHook,
      type: 'create',
      validateBody,
    },
    {
      includeRelations: true,
      type: 'getOne',
    },
    {
      filterSpecifications: getManyfilters,
      includeRelations: true,
      type: 'getMany',
    },
    {
      exampleRequests: { primary: updateRequestSuccess },
      postUpdateHook: postEditHook,
      type: 'update',
    },
    {
      postDeleteHook: postEditHook,
      type: 'del',
    },
    {
      relationKey: 'agents',
      type: 'getRelationship',
    },
    {
      relationKey: 'agents',
      type: 'updateRelationship',
    },
    {
      relationKey: 'causeOfDeathTypes',
      type: 'getRelationship',
    },
    {
      relationKey: 'causeOfDeathTypes',
      type: 'updateRelationship',
    },
    {
      relationKey: 'establishmentMeansTypes',
      type: 'getRelationship',
    },
    {
      relationKey: 'establishmentMeansTypes',
      type: 'updateRelationship',
    },
    {
      relationKey: 'featureTypes',
      type: 'getRelationship',
    },
    {
      relationKey: 'featureTypes',
      type: 'updateRelationship',
    },
    {
      relationKey: 'identifierTypes',
      type: 'getRelationship',
    },
    {
      relationKey: 'identifierTypes',
      type: 'updateRelationship',
    },
    {
      relationKey: 'physicalObjects',
      type: 'getRelationship',
    },
    {
      relationKey: 'physicalObjects',
      type: 'updateRelationship',
    },
    {
      relationKey: 'places',
      type: 'getRelationship',
    },
    {
      relationKey: 'places',
      type: 'updateRelationship',
    },
    {
      relationKey: 'preparationTypes',
      type: 'getRelationship',
    },
    {
      relationKey: 'preparationTypes',
      type: 'updateRelationship',
    },
    {
      relationKey: 'taxonNames',
      type: 'getRelationship',
    },
    {
      relationKey: 'taxonNames',
      type: 'updateRelationship',
    },
    {
      relationKey: 'typeSpecimenType',
      type: 'getRelationship',
    },
    {
      relationKey: 'typeSpecimenType',
      type: 'updateRelationship',
    },
  ],
  resource: 'specimen',
}
