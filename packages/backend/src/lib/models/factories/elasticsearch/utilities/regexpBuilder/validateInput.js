module.exports = function validateInput(input) {
  if (!input.match(/^[a-zA-Z0-9'.\s*"=,;/\-ÅÄÖåäö]*$/g)) {
    throw new Error('input contains invalid characters')
  }
}
