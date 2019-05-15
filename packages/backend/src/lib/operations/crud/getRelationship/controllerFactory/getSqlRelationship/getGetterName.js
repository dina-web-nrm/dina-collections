module.exports = ({ oneOrMany, targetAs }) => {
  if (targetAs === 'children' || targetAs === 'parent') {
    return 'getOneWhere'
  }

  return oneOrMany === 'one' ? 'getOneWhere' : 'getWhere'
}
