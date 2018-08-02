module.exports = function postTransformationNoop({ items }) {
  return Promise.resolve({ items })
}
