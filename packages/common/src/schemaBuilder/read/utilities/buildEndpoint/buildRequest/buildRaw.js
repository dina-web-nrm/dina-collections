module.exports = function buildRawRequest({ name, raw }) {
  return {
    name,
    ...raw,
  }
}
