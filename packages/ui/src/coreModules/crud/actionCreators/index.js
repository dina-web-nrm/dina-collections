import crudModule from '../crudModule'
import createNestedItem from './createNestedItem'
import clearNestedCache from './clearNestedCache'

export default {
  clearNestedCache,
  createNestedItem,
  ...crudModule.actionCreators,
}
