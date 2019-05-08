module.exports = ({ idIsForeignKey, result, targetAs }) => {
  return idIsForeignKey ? result : result && result[targetAs]
}
