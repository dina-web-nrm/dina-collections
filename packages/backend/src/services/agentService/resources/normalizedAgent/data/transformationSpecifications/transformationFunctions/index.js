const createDeleteProperties = require('common/src/createDeleteProperties')

const deleteNullProperties = createDeleteProperties(null)

/* eslint-disable no-param-reassign */
exports.transformAgent = function transformTaxonName({ src, target }) {
  const {
    legacyData,
    migrationData: {
      abbreviation,
      agentType,
      birthDateyear,
      city,
      country,
      deathDateyear,
      email,
      familyName,
      fullName,
      givenName,
      postOfficeBoxNumber,
      postalCode,
      remarks,
      'role.affiliation.name': affiliationName,
      'role.dateRange.endDate.year': roleStartYear,
      'role.dateRange.startDate.year': roleEndYear,
      'role.name': roleName,
      stateProvince,
      streetAdress,
      telePhone,
      title,
    },
    sourceData,
  } = src

  const role = {
    affiliation: {
      name: affiliationName,
    },
    dataRange: {
      endDate: {
        year: roleEndYear,
      },
      startDate: {
        year: roleStartYear,
      },
    },
    name: roleName,
  }

  // remarks

  const attributes = {
    abbreviation,
    additionalName,
    agentType,
    alsoKnownAs,
    birthDate,
    city,
    country,
    deathDate,
    disambiguatingDescription,
    email,
    familyName,
    fullName,
    givenName,
    postalCode,
    postOfficeBoxNumber,
    roles: [role],
    stateProvince,
    streetAddress,
    telephone,
  }

  target.attributes = deleteNullProperties(attributes)
  target.id = id
  target.meta = {
    sourceData,
    legacyData,
  }
}
