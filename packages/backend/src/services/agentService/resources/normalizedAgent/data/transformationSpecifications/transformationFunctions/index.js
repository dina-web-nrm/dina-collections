const createDeleteProperties = require('common/src/createDeleteProperties')
const getInterpretedDateRangeFromTwoDates = require('common/src/date/getInterpretedDateRangeFromTwoDates')

const deleteNullProperties = createDeleteProperties(null)

/* eslint-disable no-param-reassign */
exports.transformAgent = function transformAgent({
  src,
  target,
  migrator,
  globalIndex,
}) {
  const {
    legacyData,
    migrationData: {
      abbreviation,
      agentType,
      birthDateYear,
      city,
      country,
      deathDateYear,
      email,
      familyName,
      fullName,
      givenName,
      postOfficeBoxNumber,
      postalCode,
      remarks,
      'role.affiliation.name': affiliationName,
      'role.dateRange.endDate.year': roleEndYear,
      'role.dateRange.startDate.year': roleStartYear,
      'role.name': roleName,
      stateProvince,
      streetAdress,
      telePhone,
      title,
    },
    sourceData,
  } = src

  const role = {}

  if (affiliationName) {
    migrator.setValue({
      obj: role,
      path: 'affiliation.name',
      value: affiliationName,
    })
  }

  if (roleName) {
    migrator.setValue({
      obj: role,
      path: 'name',
      value: roleName,
    })
  }

  if (roleEndYear || roleStartYear) {
    migrator.setValue({
      obj: role,
      path: 'dateRange',
      value: getInterpretedDateRangeFromTwoDates({
        dateType: 'openRange',
        endYear: roleEndYear ? Number(roleEndYear) : undefined,
        startYear: roleStartYear ? Number(roleStartYear) : undefined,
      }),
    })
  }

  const attributes = {
    abbreviation,
    agentType,
    city,
    country,
    email,
    familyName,
    fullName,
    givenName,
    legacyData,
    postalCode,
    postOfficeBoxNumber,
    remarks,
    roles: role && Object.keys(role).length ? [role] : [],
    stateProvince,
    streetAddress: streetAdress,
    telephone: telePhone,
    title,
  }

  if (birthDateYear || deathDateYear) {
    migrator.setValue({
      obj: attributes,
      path: 'lifespan',
      value: getInterpretedDateRangeFromTwoDates({
        dateType: 'openRange',
        endYear: deathDateYear ? Number(deathDateYear) : undefined,
        startYear: birthDateYear ? Number(birthDateYear) : undefined,
      }),
    })
  }

  target.attributes = deleteNullProperties(attributes)
  target.id = `${globalIndex + 1}`
  target.meta = {
    sourceData,
  }
}
