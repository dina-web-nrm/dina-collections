const bulkCreate = require('../../crud/bulkCreate/configurationSchema')
const count = require('../../crud/count/configurationSchema')
const create = require('../../crud/create/configurationSchema')
const del = require('../../crud/del/configurationSchema')
const getMany = require('../../crud/getMany/configurationSchema')
const getOne = require('../../crud/getOne/configurationSchema')
const getRelationship = require('../../crud/getRelationship/configurationSchema')
const query = require('../../crud/query/configurationSchema')

const update = require('../../crud/update/configurationSchema')
const updateRelationship = require('../../crud/updateRelationship/configurationSchema')
const validate = require('../../crud/validate/configurationSchema')

const importDataFromFile = require('../../import/importDataFromFile/configurationSchema')

const setJobFailed = require('../../job/setJobFailed/configurationSchema')
const setJobSuccess = require('../../job/setJobSuccess/configurationSchema')
const startJob = require('../../job/startJob/configurationSchema')

const emptyView = require('../../view/emptyView/configurationSchema')
const getViewMeta = require('../../view/getViewMeta/configurationSchema')
const rebuildView = require('../../view/rebuildView/configurationSchema')
const updateView = require('../../view/updateView/configurationSchema')

const raw = require('./rawSchema')

module.exports = {
  bulkCreate,
  count,
  create,
  del,
  emptyView,
  getMany,
  getOne,
  getRelationship,
  getViewMeta,
  importDataFromFile,
  query,
  raw,
  rebuildView,
  setJobFailed,
  setJobSuccess,
  startJob,
  update,
  updateRelationship,
  updateView,
  validate,
}
