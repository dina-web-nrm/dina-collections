export const mapTaxonNameToOption = ({ id, attributes }) => {
  return {
    key: id,
    text: attributes.name,
    value: id,
  }
}
