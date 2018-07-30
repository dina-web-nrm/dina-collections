/* eslint-disable no-param-reassign */

module.exports = function id({ src, target, globalIndex }) {
  const { id: idInput } = src
  target.id = idInput || `${globalIndex + 1}`
}
