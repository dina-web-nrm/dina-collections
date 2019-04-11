export default function transformCollectionItems(collectionItems = []) {
  return collectionItems.map(collectionItem => {
    const { preparationType } = collectionItem

    const mappedCollectionItem = { ...collectionItem }

    if (preparationType) {
      if (preparationType.id) {
        const mappedPreparationType = {
          id: preparationType.id,
        }
        mappedCollectionItem.preparationType = mappedPreparationType
      } else {
        delete mappedCollectionItem.preparationType
      }
    }

    return mappedCollectionItem
  })
}
