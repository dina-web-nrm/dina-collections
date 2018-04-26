export default function transformTypeStatus(typeStatus) {
  if (!(typeStatus && typeStatus.id)) {
    return typeStatus
  }

  return {
    id: typeStatus.id,
    type: 'typeSpecimenType',
  }
}
