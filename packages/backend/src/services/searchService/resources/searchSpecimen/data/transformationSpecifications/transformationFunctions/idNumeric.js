/* eslint-disable no-param-reassign */

module.exports = ({ src, target }) => {
  const { id } = src
  target.attributes.idNumeric = Number(id)
}
