const {
  abbreviation,
  additionalName,
  agentType,
  alsoKnownAs,
  disambiguatingDescription,
  familyName,
  fullName,
  givenName,
  remarks,
} = require('./fields/stringFields')

const id = require('./fields/id')

module.exports = {
  fields: [
    abbreviation,
    additionalName,
    agentType,
    alsoKnownAs,
    disambiguatingDescription,
    familyName,
    fullName,
    givenName,
    id,
    remarks,
  ],
}
