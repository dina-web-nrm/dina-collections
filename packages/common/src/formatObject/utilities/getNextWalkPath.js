module.exports = ({ path, segments }) => {
  const currentSegment = segments[0]
  return [path, currentSegment].filter(segment => !!segment).join('.')
}
