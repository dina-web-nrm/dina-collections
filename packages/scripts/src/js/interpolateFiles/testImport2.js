/**
 * Given an array of indexes and options for whether to resolve shallow
 * or deep dependencies, resolve dependencies.
 *
 * @param {Array<string>|string} indexes files to process
 * @param {Object} config options
 * @returns {Promise<Array<string>>} promise with results
 */
module.exports = function expandInputs(indexes, config) {
  // Ensure that indexes is an array of strings
  indexes = [].concat(indexes)

  if (config.shallow || config.documentExported) {
    return shallow(indexes, config)
  }

  return dependency(indexes, config)
}
