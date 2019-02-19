const os = require('os')
const objectPath = require('object-path')
const { Parser: Json2csvParser } = require('json2csv')
const { execute: batchExecute } = require('common/src/batch')
const createLog = require('../../../../../../../utilities/log')
const createFilePath = require('./createFilePath')

const log = createLog('services/exportService/postHooks/performExport')

module.exports = function performExport({
  item,
  serviceInteractor,
  fileInteractor,
}) {
  const { exportFields, exportIds, resource: exportResource } = item.attributes

  const exportSpecificIds = exportIds && !!exportIds.length
  const filePath = createFilePath({ exportResource })
  const includeFields = exportFields.reduce(
    (arr, { fieldPath, fieldPaths }) => {
      if (fieldPaths) {
        return [...arr, ...fieldPaths]
      }
      if (fieldPath) {
        return [...arr, fieldPath]
      }
      return arr
    },
    []
  )

  const createBatch = ({ numberOfBatchEntries, startCount }) => {
    let batchRequest
    if (exportSpecificIds) {
      const batchIds = exportIds.slice(
        startCount,
        startCount + numberOfBatchEntries
      )
      batchRequest = {
        body: {
          data: {
            attributes: {
              filter: {
                ids: batchIds,
              },
              includeFields,
              limit: 10000,
            },
          },
        },
      }
    } else {
      batchRequest = {
        body: {
          data: {
            attributes: {
              includeFields,
              limit: numberOfBatchEntries,
              offset: startCount,
            },
          },
        },
      }
    }

    return serviceInteractor
      .query({
        request: batchRequest,
        resource: exportResource,
      })
      .then(({ data }) => {
        return data
      })
  }

  const extractValue = value => {
    if (Array.isArray(value)) {
      return value.join(' | ')
    }

    if (value === null || value === undefined) {
      return ''
    }
    return value
  }
  const fields = exportFields.map(exportField => {
    if (exportField.fieldPaths) {
      return {
        default: exportField.default,
        label: exportField.label,
        value: row => {
          const value = exportField.fieldPaths.map(fieldPath => {
            return objectPath.get(row, fieldPath)
          })
          return extractValue(value)
        },
      }
    }
    return {
      default: exportField.default,
      label: exportField.label,
      value: row => {
        const value = objectPath.get(row, exportField.fieldPath)
        return extractValue(value)
      },
    }
  })

  let firstRun = true
  const execute = items => {
    const opts = { fields, header: firstRun }
    const parser = new Json2csvParser(opts)
    const csv = parser.parse(items)
    const content = firstRun ? csv : `${os.EOL}${csv}`

    firstRun = false
    return fileInteractor.append({
      content,
      filePath,
    })
  }

  const numberOfEntries = exportSpecificIds ? exportIds.length : undefined

  if (numberOfEntries) {
    log.info(
      `Performing export for resource ${exportResource} with ${
        exportIds.length
      } items`
    )
  } else {
    log.info(`Performing export for resource ${exportResource} with all items`)
  }

  return batchExecute({
    createBatch,
    execute,
    numberOfEntries,
    numberOfEntriesEachBatch: 1000,
  }).then(() => {
    return {
      filePath,
    }
  })
}
