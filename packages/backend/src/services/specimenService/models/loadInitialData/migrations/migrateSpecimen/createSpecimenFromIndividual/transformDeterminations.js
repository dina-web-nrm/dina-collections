module.exports = function transformDeterminations(determinations = []) {
  let taxa = []
  let mappedDeterminations = [{}]

  if (determinations && determinations.length) {
    mappedDeterminations = determinations.map(determination => {
      if (!determination.taxon) {
        return determination
      }

      const taxon = {
        id: determination.taxon.id,
        type: 'taxon',
      }

      taxa = [...taxa, taxon]

      return {
        ...determination,
        taxon,
      }
    })
  }

  return {
    determinations: mappedDeterminations,
    taxa,
  }
}
