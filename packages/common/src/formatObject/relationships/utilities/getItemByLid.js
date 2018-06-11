const getItemByLid = ({ lid, relationshipItems = [] } = {}) => {
  if (!lid || !relationshipItems.length) {
    return undefined
  }

  return relationshipItems.find(item => {
    if (!item || !item.attributes) {
      return false
    }

    return item.attributes.lid === lid
  })
}

module.exports = { getItemByLid }
