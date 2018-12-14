/* eslint-disable no-underscore-dangle, camelcase */

module.exports = function extractMetaFromResult({ result = [] }) {
  return {
    nResponseItems: result.length,
  }
}
