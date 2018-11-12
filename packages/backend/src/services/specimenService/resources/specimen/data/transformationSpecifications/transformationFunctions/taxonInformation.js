const buildKey = require('../globalDecorators/decorateTaxonNameKeyIdMap/buildKey')

// const taxonInformation = {
//   curatorialTaxonName: 'Eptesicus nilssonii',
//   curatorialTaxonNameRank: 'species',
//   taxonRemarks: null,
//   typeStatus: null,
//   customTaxonNames: [
//     {
//       customTaxonNameType: 'old-scientific-name',
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
    curatorialTaxonName: srcCuratorialTaxonName,
    curatorialTaxonNameRank: srcCuratorialTaxonNameRank,
    customTaxonNames: srcCustomTaxonNames,
    taxonRemarks: srcTaxonRemarks,
    typeStatus: srcTypeStatus,
  } = srcTaxonInformation

  const taxonInformation = {}

  if (srcCuratorialTaxonName || srcCuratorialTaxonNameRank) {
    const taxonNameKey = buildKey({
      name: srcCuratorialTaxonName,
      rank: srcCuratorialTaxonNameRank,
    })

    const id = migrator.getFromGlobals({
      globals,
      key: taxonNameKey,
      mapKey: 'taxonNameKeyIdMap',
      reporter,
    })

    if (id !== undefined && id !== null) {
      taxonInformation.curatorialTaxonName = {
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
