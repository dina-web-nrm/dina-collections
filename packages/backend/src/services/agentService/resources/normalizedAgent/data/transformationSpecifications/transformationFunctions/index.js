const createDeleteProperties = require('common/src/createDeleteProperties')

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

  if (roleStartYear) {
    migrator.setValue({
      obj: role,
      path: 'dateRange.startDate.year',
      value: Number(roleStartYear),
    })
  }
  if (roleEndYear) {
    migrator.setValue({
      obj: role,
      path: 'dateRange.endDate.year',
      value: Number(roleEndYear),
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

  if (birthDateyear) {
    migrator.setValue({
      obj: attributes,
      path: 'birthDate.startDate.year',
      value: Number(birthDateyear),
    })
  }

  if (deathDateyear) {
    migrator.setValue({
      obj: attributes,
      path: 'deathDate.startDate.year',
      value: Number(deathDateyear),
    })
  }

  target.attributes = deleteNullProperties(attributes)
  target.id = `${globalIndex + 1}`
  target.meta = {
    sourceData,
  }
}
