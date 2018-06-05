module.exports = ({ result, targetAs }) => {
  return (
    result &&
    result.relationships &&
    result.relationships[targetAs] &&
    result.relationships[targetAs].data
  )
}
