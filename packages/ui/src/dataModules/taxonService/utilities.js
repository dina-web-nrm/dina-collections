export const mapTaxonToOption = taxon => {
  return {
    key: taxon.id,
    text: taxon.scientificName,
    value: taxon.id,
  }
}
