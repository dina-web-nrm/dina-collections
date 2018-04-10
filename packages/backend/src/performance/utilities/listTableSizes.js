const writeOutput = require('../utilities/writeOutput')
const createDb = require('../../lib/sequelize/db')
const config = require('../../apps/core/config')

module.exports = function listTableSizes({ tables = [] }) {
  return createDb({ config }).then(sequelize => {
    // https://wiki-bsse.ethz.ch/display/ITDOC/Check+size+of+tables+and+objects+in+PostgreSQL+database
    const query = `SELECT
      relname as "table",
      pg_size_pretty(pg_total_relation_size(relid)) As "size",
      pg_size_pretty(pg_total_relation_size(relid) - pg_relation_size(relid)) as "externalSize"
      FROM pg_catalog.pg_statio_user_tables ORDER BY pg_total_relation_size(relid) DESC;
    `
    return sequelize.query(query).spread(results => {
      const tablesOfInterestSizes = {}
      results.forEach(result => {
        const { table, size, externalSize } = result
        if (tables.includes(table)) {
          tablesOfInterestSizes[table] = {
            externalSize,
            size,
          }
        }
      })
      writeOutput('tableSizes', tablesOfInterestSizes)
      return tablesOfInterestSizes
    })
  })
}
