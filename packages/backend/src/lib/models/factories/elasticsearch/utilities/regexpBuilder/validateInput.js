const allowedSpecialCharacters = [
  'a-zA-Z0-9',
  'Å',
  'Ä',
  'Ö',
  'å',
  'ä',
  'ö',
  '<',
  '>',
  '#',
  '\\-',
  '?',
  `'`,
  '.',
  '\\s',
  '*',
  '"',
  '=',
  ',',
  ';',
  ':',
  '/',
  '(',
  ')',
]

module.exports = function validateInput(input) {
  const regexp = new RegExp(`^[${allowedSpecialCharacters.join('')}]*$`)
  if (!regexp.test(input)) {
    throw new Error('input contains invalid characters')
  }
}
