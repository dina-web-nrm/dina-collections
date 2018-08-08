module.exports = {
  description: 'CatalogNumber mapping',
  elasticsearch: () => {
    return {
      index: false,
      type: 'text',
    }
  },
  fieldPath: 'attributes.result.otherIdentifiers',
}
