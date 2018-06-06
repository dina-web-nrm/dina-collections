module.exports = ({ oneOrMany, format }) => {
  // if there is only one relationship or if all relationships are in one array
  if (oneOrMany === 'one' || format === 'array') {
    return 'getOneWhere'
  }

  // if there can be many items that have a json ref to another item
  return 'getWhere'
}
