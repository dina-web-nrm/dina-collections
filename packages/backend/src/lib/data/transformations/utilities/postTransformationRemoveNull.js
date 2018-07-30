module.exports = function postTransformationRemoveNull({ items }) {
  return Promise.resolve({
    items: items.filter(item => !!(item && item.attributes)),
  })
}
