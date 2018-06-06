const createRelationshipsObjectResponse = require('../transformations/createRelationshipsObjectResponse')
const createRelationshipsArrayResponse = require('../transformations/createRelationshipsArrayResponse')

module.exports = ({ format, targetResource }) => {
  return output => {
    return format === 'object'
      ? createRelationshipsObjectResponse({
          data: output,
          id: output && output.id,
          type: targetResource,
        })
      : createRelationshipsArrayResponse({
          items: output,
          type: targetResource,
        })
  }
}
