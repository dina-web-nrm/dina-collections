const createRankField = require('./createRankField')

exports.order = createRankField({
  fieldName: 'orderAcceptedName',
  rank: 'order',
  searchName: 'searchOrderAcceptedName',
})

exports.family = createRankField({
  fieldName: 'familyAcceptedName',
  rank: 'family',
  searchName: 'searchFamilyAcceptedName',
})

exports.genus = createRankField({
  fieldName: 'genusAcceptedName',
  rank: 'genus',
  searchName: 'searchGenumsAcceptedName',
})

exports.species = createRankField({
  fieldName: 'speciesAcceptedName',
  rank: 'species',
  searchName: 'searchSpeciesAcceptedName',
})

exports.subspecies = createRankField({
  fieldName: 'subspeciesAcceptedName',
  rank: 'subspecies',
  searchName: 'searchSubspeciesAcceptedName',
})
