import createSelectors from './createSelectors'
import createHigherOrderComponents from './createHigherOrderComponents'

export default function createQueryBuilder({ formName, querySpecifications }) {
  const querySpecificationsMap = querySpecifications.reduce(
    (obj, querySpecification) => {
      return {
        ...obj,
        [querySpecification.fieldName]: querySpecification,
      }
    },
    {}
  )

  const selectors = createSelectors({
    formName,
    querySpecifications,
  })

  const higherOrderComponents = createHigherOrderComponents({
    formName,
    querySpecificationsMap,
    selectors,
  })

  return {
    higherOrderComponents,
    selectors,
  }
}
