/* eslint-disable no-param-reassign */

module.exports = ({ src, target }) => {
  const { id } = src
  target.idNumeric = Number(id)
}
