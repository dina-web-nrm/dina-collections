/* eslint-disable no-param-reassign */
exports.transformLoan = function transformLoan({ src, target }) {
  const {
    migrationData: { id, recipient, title },
    sourceData,
  } = src

  if (!recipient) {
    return
  }

  target.attributes = {
    recipient,
    title,
  }

  target.id = id

  target.meta = { sourceData }
}
