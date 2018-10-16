import createFieldHocFactory from './createFieldHocFactory'
import createFormHocFactory from './createFormHocFactory'

export default function createHigherOrderComponents({
  formName,
  querySpecificationsMap,
  selectors,
}) {
  const createFieldHoc = createFieldHocFactory({
    querySpecificationsMap,
    selectors,
  })
  const createFormHoc = createFormHocFactory({
    formName,
    querySpecificationsMap,
    selectors,
  })

  return {
    createFieldHoc,
    createFormHoc,
  }
}
