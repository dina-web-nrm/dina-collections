/* eslint-disable no-param-reassign */

module.exports = ({ src, target }) => {
  Object.keys(src).forEach(key => {
    target[key] = src[key]
  })
}
