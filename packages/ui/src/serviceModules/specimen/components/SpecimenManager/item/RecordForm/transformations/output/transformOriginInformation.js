import { isEmpty } from 'lodash'

export default function transformOriginInformation(
  establishmentMeansTypes,
  { originInformation } = {}
) {
  return originInformation
    .map(origin => {
      const {
        establishmentMeansType,
        isResultOfSelectiveBreeding,
        originLocality,
        remarks,
      } = origin

      const mappedOrigin = { ...origin }
      const defaultEstablishmentMeansType = establishmentMeansTypes.find(
        ({ attributes }) => {
          return attributes.key === 'unknown'
        }
      )

      if (
        !originLocality &&
        !remarks &&
        establishmentMeansType.id === defaultEstablishmentMeansType.id &&
        isResultOfSelectiveBreeding === 'unknown'
      ) {
        delete mappedOrigin.establishmentMeansType
        delete mappedOrigin.isResultOfSelectiveBreeding
        delete mappedOrigin.originLocality
        delete mappedOrigin.remarks
      }
      return mappedOrigin
    })
    .filter(origin => !isEmpty(origin))
}
