module.exports = {
  description: 'CatalogNumber mapping',
  elasticsearch: () => {
    return {
      type: 'keyword',
    }
  },
  fieldPath: 'attributes.result.catalogNumber',
}
