const aggregateCollectingLocations = () => {
  return {
    terms: {
      field: 'collectingLocations.raw',
    },
  }
}

module.exports = {
  aggregateCollectingLocations,
}
