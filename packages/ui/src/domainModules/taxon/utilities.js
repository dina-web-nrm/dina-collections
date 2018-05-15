import { ACCEPTED, SYNONYM, VERNACULAR } from './constants'

export const mapTaxonNameToOption = ({ id, attributes }) => {
  return {
    key: id,
    text: attributes.name,
    value: id,
  }
}

const createListItem = ({ taxonName, nameType, stateIndex, stateType }) => {
  if (!(taxonName && taxonName.id)) {
    return null
  }

  if (stateType === 'object') {
    return {
      ...taxonName,
      nameType,
      stateType,
    }
  }

  return {
    ...taxonName,
    nameType,
    stateIndex,
    stateType,
  }
}

const createListArray = ({ taxonNames = [], nameType, stateType }) => {
  return taxonNames.map((taxonName, index) => {
    return createListItem({
      nameType,
      stateIndex: index,
      stateType,
      taxonName,
    })
  })
}

export const createSortedNameList = ({
  acceptedTaxonName,
  synonyms,
  vernacularNames,
}) => {
  const nameList = [
    createListItem({
      nameType: ACCEPTED,
      stateType: 'object',
      taxonName: acceptedTaxonName,
    }),
    ...createListArray({
      nameType: SYNONYM,
      stateType: 'array',
      taxonNames: synonyms,
    }),
    ...createListArray({
      nameType: VERNACULAR,
      stateType: 'array',
      taxonNames: vernacularNames,
    }),
  ]
  return nameList.filter(taxonName => !!taxonName)
}
