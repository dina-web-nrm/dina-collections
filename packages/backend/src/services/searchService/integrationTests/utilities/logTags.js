/* eslint-disable import/no-extraneous-dependencies */
require('console.table')
/* eslint-enable import/no-extraneous-dependencies */

module.exports = function logTags(res) {
  const log = res.data.map(item => {
    return {
      id: item.id,
      tagType: item.attributes.tagType,
      tagValue: item.attributes.tagValue,
    }
  })

  /* eslint-disable no-console */
  console.table(log)
  /* eslint-enable no-console */
}
