module.exports = function sanitizeInput(input) {
  const withoutDoubleBlanks = input.replace(/\s\s+/g, ' ')
  return withoutDoubleBlanks
}
