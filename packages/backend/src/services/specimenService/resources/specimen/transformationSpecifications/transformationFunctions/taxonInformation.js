const buildKey = require('../globalDecorators/decorateTaxonKeyIdMap/buildKey')

// const taxonInformation = {
//   curatorialTaxonName: 'Eptesicus nilssonii',
//   curatorialTaxonNameRank: 'species',
//   taxonRemarks: null,
//   typeStatus_key: null,
//   customTaxonNames: [
//     {
//       customTaxonNameType_key: 'old-scientific-name',
//       value: 'Vesperugo nilssoni',
//     },
//   ],
// }

module.exports = function migrateTaxonInformation({
  src,
  target,
  migrator,
  globals,
  reporter,
}) {
  const srcTaxonInformation = migrator.getValue({
    obj: src,
    path: 'migrationData.taxonInformation',
    strip: true,
  })

  if (!srcTaxonInformation) {
    return
  }

  const {
    curatorialTaxonName: srcCuratorialTaxonAcceptedName,
    curatorialTaxonNameRank: srcCuratorialTaxonAcceptedNameRank,
    customTaxonNames: srcCustomTaxonNames,
    taxonRemarks: srcTaxonRemarks,
    typeStatus_key: srcTypeStatus,
  } = srcTaxonInformation

  const taxonInformation = {}

  if (srcCuratorialTaxonAcceptedName || srcCuratorialTaxonAcceptedNameRank) {
    const taxonKey = buildKey({
      name: srcCuratorialTaxonAcceptedName,
      rank: srcCuratorialTaxonAcceptedNameRank,
    })

    const id = migrator.getFromGlobals({
      globals,
      key: taxonKey,
      mapKey: 'taxonKeyIdMap',
      reporter,
    })

    if (id !== undefined && id !== null) {
      taxonInformation.curatorialTaxon = {
        id,
      }
    }
  }

  if (srcTaxonRemarks) {
    taxonInformation.taxonRemarks = srcTaxonRemarks
  }

  if (srcCustomTaxonNames && srcCustomTaxonNames.length) {
    const customTaxonNames = []
    srcCustomTaxonNames.forEach(customTaxonName => {
      const id = migrator.getFromGlobals({
        globals,
        key: customTaxonName.customTaxonNameType_key,
        mapKey: 'customTaxonNameTypeKeyIdMap',
        reporter,
      })

      customTaxonNames.push({
        customTaxonNameType: {
          id,
        },
        value: customTaxonName.value,
      })
    })

    taxonInformation.customTaxonNames = customTaxonNames
  }

  if (srcTypeStatus) {
    const id = migrator.getFromGlobals({
      globals,
      key: srcTypeStatus,
      mapKey: 'typeSpecimenTypeKeyIdMap',
      reporter,
    })
    taxonInformation.typeStatus = {
      id,
    }
  }

  migrator.setValue({
    obj: target,
    path: 'attributes.individual.taxonInformation',
    value: taxonInformation,
  })
}
