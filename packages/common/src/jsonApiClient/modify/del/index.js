const createLog = require('../../../log')
const { Dependor } = require('../../../Dependor')
const buildOperationId = require('../../../buildOperationId')

const dep = new Dependor({
  buildOperationId,
})

const defaultLog = createLog('common:jsonApiClient:create')

function del({ log = defaultLog, openApiClient, resourceType, userOptions }) {
  return Promise.resolve().then(() => {
    if (!openApiClient) {
      throw new Error('provide openApiClient')
    }

    const operationId = dep.buildOperationId({
      operationType: 'del',
      resource: resourceType,
    })

    log.debug(
      `Delete resource ${resourceType} with operationId: ${operationId} input:`,
      userOptions
    )

    return openApiClient.call(operationId, userOptions)
  })
}

module.exports = {
  del,
  dep,
}
