export default function createItemUpdatePath({ id } = {}) {
  if (id === undefined) {
    return null
  }
  return `items.${id}`
}
