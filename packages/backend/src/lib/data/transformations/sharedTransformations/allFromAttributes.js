/* eslint-disable no-param-reassign */

module.exports = ({ src, target }) => {
  const doc = src.attributes
  Object.keys(doc).forEach(key => {
    target[key] = doc[key]
  })
}
