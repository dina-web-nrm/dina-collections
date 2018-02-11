module.exports = config => {
  if (!config.editor) {
    throw new Error('Config have to include editor')
  }
  if (!config.snippetOutputPath) {
    throw new Error('Config have to include snippetOutputPath')
  }
  if (!config.templatePath) {
    throw new Error('Config have to include templatePath')
  }
}
